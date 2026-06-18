/* Shared renderer for the Silver Oak audit. Each page sets window.PAGE; this file draws it. */
(function(){
  var NAV=[
    {id:"index",title:"Overview",href:"index.html"},
    {id:"homepage",title:"Homepage",href:"homepage.html"},
    {id:"offplan",title:"Off-plan",href:"offplan.html"},
    {id:"detail",title:"Property detail",href:"detail.html"},
    {id:"mortgage",title:"Mortgage",href:"mortgage.html"},
    {id:"mobile",title:"Mobile",href:"mobile.html"},
    {id:"sitewide",title:"Site-wide",href:"sitewide.html"}
  ];
  var SEVN={crit:"Critical",high:"High",med:"Medium",low:"Low"};

  /* static, design-controlled config per page */
  var CONFIG={
    homepage:{title:"Homepage",eyebrow:"Page review · the homepage",screenshot:"assets/soa-home.jpg",
      references:[{label:"Hero & search bar",site:"Property Finder",url:"https://www.propertyfinder.ae/",ours:"assets/ours-hero.jpg",ref:"assets/ref-pf-hero.jpg",
        caption:"On Property Finder the search bar is the first thing you see, with a clear Buy/Rent choice and one obvious button. The words are real text, so the page loads fast and stays sharp — no heavy video."}]},
    offplan:{title:"Off-plan listings",eyebrow:"Page review · off-plan listings",screenshot:"assets/soa-offplan.jpg",
      references:[
        {label:"Filters & sorting",site:"Property Finder",url:"https://www.propertyfinder.ae/en/buy/dubai/apartments-for-sale-dubai-marina.html",ours:"assets/ours-search.jpg",ref:"assets/ref-pf-filters.jpg",
          caption:"Property Finder keeps location, type, price and bedrooms in one bar you can mix freely, plus a sort menu — and the price box starts empty instead of pre-filled."},
        {label:"Listing cards",site:"Bayut",url:"https://www.bayut.com/for-sale/property/dubai/",ours:"assets/ours-cards.jpg",ref:"assets/ref-bayut-cards.jpg",
          caption:"Bayut shows a bold price next to a “verified on [date]” badge, photos that aren’t stretched, and keeps the call and email buttons for the property page instead of repeating them on every card."}
      ]},
    detail:{title:"Property detail page",eyebrow:"Page review · a single property page",screenshot:"assets/soa-detail.jpg",
      references:[{label:"Property detail page",site:"Bayut",url:"https://www.bayut.com/for-sale/property/dubai/",ours:"assets/ours-detail.jpg",ref:"assets/ref-bayut-detail.jpg",
        caption:"Bayut’s property page has a large, undistorted photo gallery, one clear price in a single font, easy-to-scan beds, baths and size, and a clean payment plan — with nothing repeated."}]},
    mortgage:{title:"Mortgage calculator",eyebrow:"Page review · mortgage & affordability tools",screenshot:"assets/soa-mortgage.jpg",
      references:[{label:"Mortgage calculator",site:"Mortgage Finder",url:"https://www.mortgagefinder.ae/en/calculator",ours:"assets/ours-calc.jpg",ref:"assets/ref-mortgage-calc.jpg",
        caption:"On Mortgage Finder you can type into every box or drag a slider, the limits make sense (1–25 years, 1–10%), and the monthly figure updates as you change things — with no dead arrows."}]},
    mobile:{title:"Mobile (phone view)",eyebrow:"Page review · on a phone",screenshot:"assets/soa-mobile.jpg",mobileshot:true,
      references:[{linkonly:true,caption:"A good phone home screen is a single column with one big, easy-to-read search box, buttons at least 44px so they’re easy to tap, and text no smaller than 14px.",links:[["bayut.com","https://www.bayut.com/"],["zillow.com","https://www.zillow.com/"]]}]},
    sitewide:{title:"Site-wide",eyebrow:"Across the whole site",screenshot:null,references:[]}
  };

  /* marker positions, in % of the screenshot [left, top] */
  var POS={
    homepage:{A9:[8,1.2],A5:[50,1.2],A6:[66,1.2],A10:[95,1.2],A2:[48,4.5],A7:[60,4.5],A8:[49,5.8],A1:[50,9],A4:[70,9],A11:[18,10.5],A12:[82,10.5],A3:[50,13.5],J1:[90,13.7],J4:[85,14.5],B2:[13,18.5],B1:[33,18.5],B7:[52,19],B5:[70,18.7],B6:[95,18.7],E3:[45,23],E5:[60,23],I6:[50,37],J6:[62,37],E2:[45,51.5],E6:[62,51.5],E7:[80,51.5],H8:[50,54],H2:[25,60],H7:[58,58.5],H9:[50,64],H3:[45,72],I7:[68,79],G3:[55,79.6],G1:[74,79.6],L1:[58,80.5],J2:[80,81],H10:[50,84],K1:[55,95],K2:[64,95],J10:[65,96]},
    offplan:{E4:[33,9],D6:[66,9],B4:[50,10],B3:[80,10],C1:[19,16],C2:[40,16],C3:[60,16],C4:[17,23],D1:[40,38],D4:[60,38],E1:[44,44.5],B8:[70,44.5],D2:[34,46.5],D3:[50,46.5],D5:[64,46.5],G3:[55,54],G1:[73,54]},
    detail:{I1:[14,4.9],D7:[28,4.9],H5:[13,8.3],H6:[13,11],H1:[28,16.5],G2:[35,16.5],G1:[73,96.8],G3:[57,96.8],E8:[88,2.5]},
    mortgage:{F4:[50,8],F7:[50,15],F1:[75,14],F5:[67,18.5],F3:[25,21],F2:[49,21],F6:[56,21],E8:[88,6]},
    mobile:{M6:[42,1.5],M1:[84,1.5],M3:[50,4.5],M7:[50,12],M2:[27,20],M5:[93,50],M8:[42,85],M9:[50,91],J3:[60,94],M4:[57,96]}
  };

  /* grouping for the location-less site-wide page */
  var SITEWIDE_GROUPS=[
    {title:"Security",ids:["L1","L2","L3","L4","L5","L6","L7","L8"]},
    {title:"Leads, chat & forms",ids:["J1","J2","G1","G3","J3","J4","J5"]},
    {title:"Branding & contact",ids:["K1","K2","K3","J10"]},
    {title:"Navigation & layout",ids:["I5","I4","I3","I2","J8","J9"]},
    {title:"Trust & reliability",ids:["E8","H4","J7"]}
  ];

  var P=window.PAGE||{};
  if(P.id&&CONFIG[P.id])P=Object.assign({},CONFIG[P.id],P);
  // every finding by id, across all pages — lets any page pin a cross-cutting issue
  var GLOBAL={};
  if(window.AUDIT)Object.keys(window.AUDIT).forEach(function(k){(window.AUDIT[k].findings||[]).forEach(function(f){GLOBAL[f.id]=f;});});
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function header(){
    var links=NAV.map(function(n){return '<a href="'+n.href+'"'+(n.id===P.id?' class="on"':'')+'>'+n.title+'</a>';}).join("");
    return '<header class="topbar"><div class="wrap">'+
      '<a class="brand" href="index.html">Silver Oak<small>Website Audit</small></a>'+
      '<nav class="nav">'+links+'</nav></div></header>';
  }
  function footer(){
    return '<footer class="foot"><div class="wrap">Silver Oak — website audit of silveroakglobal.com · June 2026<br>'+
      'Tap any numbered marker to read the issue and the fix. <a href="index.html">Back to overview</a></div></footer>';
  }

  /* ----- overview (landing) ----- */
  function overview(){
    var s=P.stats||{};
    var tiles='<div class="stat total"><div class="n">'+(s.total||0)+'</div><div class="l">Total findings</div></div>'+
      ["crit","high","med","low"].map(function(k){
        return '<div class="stat" data-s="'+k+'"><div class="n">'+(s[k]||0)+'</div><div class="l"><span class="dot"></span>'+SEVN[k]+'</div></div>';
      }).join("");
    var cards=(P.sections||[]).map(function(c){
      var thumb=c.screenshot
        ? '<span class="thumb"><img src="'+c.screenshot+'" alt="'+esc(c.title)+'" loading="lazy"></span>'
        : '<span class="thumb noimg">Across the site</span>';
      return '<a class="scard" href="'+c.href+'">'+thumb+
        '<span class="body"><h3>'+esc(c.title)+'</h3><p>'+esc(c.blurb)+'</p>'+
        '<span class="count">'+c.count+' finding'+(c.count===1?"":"s")+' <span class="arrow">→</span></span></span></a>';
    }).join("");
    return '<section class="phead"><div class="wrap">'+
      '<div class="eyebrow">'+esc(P.eyebrow||"Website audit")+'</div>'+
      '<h1>'+esc(P.title)+'</h1>'+
      '<p class="lede">'+esc(P.lede)+'</p>'+
      '<div class="stats">'+tiles+'</div></div></section>'+
      '<section><div class="wrap"><div class="cards">'+cards+'</div></div></section>';
  }

  /* ----- references ----- */
  function refHTML(r){
    if(r.linkonly){
      var ls=(r.links||[]).map(function(l){return '<a href="'+l[1]+'" target="_blank" rel="noopener">'+esc(l[0])+' →</a>';}).join("");
      return '<div class="ref note"><div class="tag"><span class="mk"></span>What good looks like</div>'+
        '<p class="ccap">'+esc(r.caption)+'</p>'+ls+'</div>';
    }
    return '<div class="ref"><div class="rhead">'+esc(r.label)+'</div><div class="cols">'+
      '<div class="col ours"><div class="tag"><span class="mk"></span>Silver Oak — now</div>'+
        '<img src="'+r.ours+'" alt="Silver Oak '+esc(r.label)+'" loading="lazy"></div>'+
      '<div class="col good"><div class="tag"><span class="mk"></span>Best-in-class — '+esc(r.site)+'</div>'+
        '<img src="'+r.ref+'" alt="'+esc(r.site)+' '+esc(r.label)+'" loading="lazy">'+
        '<p class="ccap">'+esc(r.caption)+' <a href="'+r.url+'" target="_blank" rel="noopener">see it live →</a></p></div>'+
      '</div></div>';
  }

  /* ----- build the numbered marks for this page ----- */
  var MARKS=[];        // [{f, num}]
  var BYID={};         // id -> {f, num}
  function buildMarks(){
    var fs=P.findings||[];
    var pos=POS[P.id];
    if(pos){
      MARKS=Object.keys(pos).filter(function(id){return GLOBAL[id];})
        .map(function(id){return {f:GLOBAL[id],xy:pos[id]};})
        .sort(function(a,b){return a.xy[1]-b.xy[1]||a.xy[0]-b.xy[0];});
    }else{
      // site-wide: order by groups
      var order={};SITEWIDE_GROUPS.forEach(function(g,gi){g.ids.forEach(function(id,ii){order[id]=gi*100+ii;});});
      MARKS=fs.slice().sort(function(a,b){return (order[a.id]==null?999:order[a.id])-(order[b.id]==null?999:order[b.id]);})
        .map(function(f){return {f:f};});
    }
    MARKS.forEach(function(m,i){m.num=i+1;BYID[m.f.id]={f:m.f,num:m.num};});
  }

  /* ----- findings page ----- */
  function findingsPage(){
    buildMarks();
    var html='<section class="phead"><div class="wrap">'+
      '<div class="eyebrow">'+esc(P.eyebrow||"Page review")+'</div>'+
      '<h1>'+esc(P.title)+'</h1>'+
      (P.lede?'<p class="lede">'+esc(P.lede)+'</p>':'')+'</div></section><div class="wrap">';

    var chips='<div class="chips">'+["crit","high","med","low"].map(function(k){
      var has=MARKS.some(function(m){return m.f.sev===k;});
      return has?'<button class="chip on" data-s="'+k+'"><span class="sw"></span>'+SEVN[k]+'</button>':"";
    }).join("")+'</div>';

    if(P.screenshot){
      var pins=MARKS.map(function(m){
        return '<button class="pin" data-s="'+m.f.sev+'" data-id="'+m.f.id+'" style="left:'+POS[P.id][m.f.id][0]+'%;top:'+POS[P.id][m.f.id][1]+'%" title="'+esc(m.f.title)+'">'+
          '<span class="ring"></span><span class="tag">'+m.num+'</span></button>';
      }).join("");
      var fc=P.mobileshot?"figure mobileshot":"figure";
      html+='<p class="hint"><b>'+MARKS.length+'</b> issue'+(MARKS.length===1?"":"s")+' marked on this screen — tap a numbered marker to read it and the fix.</p>'+chips+
        '<div class="'+fc+'"><div class="frame"><div class="canvas"><img src="'+P.screenshot+'" alt="'+esc(P.title)+' screenshot">'+pins+'</div></div>'+
        (P.shotcap?'<div class="cap">'+esc(P.shotcap)+'</div>':'')+'</div>';
    }else{
      // site-wide: numbered clickable tiles, grouped
      html+='<p class="hint">These affect the whole site, so they aren’t tied to one spot. <b>'+MARKS.length+'</b> issues — tap any to read it and the fix.</p>'+chips;
      SITEWIDE_GROUPS.forEach(function(g){
        var rows=g.ids.map(function(id){var b=BYID[id];if(!b)return "";var f=b.f;
          return '<button class="tile" data-s="'+f.sev+'" data-id="'+f.id+'"><span class="tn">'+b.num+'</span><span class="tt">'+esc(f.title)+'</span></button>';
        }).join("");
        html+='<div class="tilegroup"><h3>'+esc(g.title)+'</h3><div class="tiles">'+rows+'</div></div>';
      });
    }

    if(P.references&&P.references.length){
      html+='<div class="refblock"><h2>How the best sites do it</h2>'+
        '<p class="sub">The same job, done well elsewhere — side by side with Silver Oak today.</p>'+
        P.references.map(refHTML).join("")+'</div>';
    }

    html+='</div>';
    return html;
  }

  function drawerHTML(){
    return '<div class="scrim" id="scrim"></div>'+
      '<aside class="drawer" id="drawer">'+
      '<button class="x" id="closeD" aria-label="Close">✕</button>'+
      '<div class="did" id="dId"></div><h2 id="dTitle"></h2>'+
      '<div class="meta" id="dMeta"></div>'+
      '<div class="blk"><div class="h">The problem</div><p id="dProblem"></p></div>'+
      '<div class="blk"><div class="h">The fix</div><div class="fix" id="dFix"></div></div>'+
      '</aside>';
  }

  /* ----- mount ----- */
  var root=document.getElementById("app");
  var body=(P.kind==="overview")?overview():findingsPage();
  root.innerHTML=header()+body+(P.kind==="overview"?"":drawerHTML())+footer();

  if(P.kind!=="overview"){
    var scrim=document.getElementById("scrim"),drawer=document.getElementById("drawer");
    function openD(id){
      var b=BYID[id];if(!b)return;var f=b.f;
      document.getElementById("dId").textContent="#"+b.num+" · "+P.title;
      document.getElementById("dTitle").textContent=f.title;
      document.getElementById("dMeta").innerHTML='<span class="badge '+f.sev+'">'+SEVN[f.sev]+'</span>';
      document.getElementById("dProblem").textContent=f.problem;
      document.getElementById("dFix").innerHTML='<b>Fix:</b> '+esc(f.fix);
      scrim.classList.add("open");drawer.classList.add("open");
    }
    function closeD(){scrim.classList.remove("open");drawer.classList.remove("open");}
    scrim.onclick=closeD;document.getElementById("closeD").onclick=closeD;
    document.addEventListener("keydown",function(e){if(e.key==="Escape")closeD();});
    document.querySelectorAll(".pin,.tile").forEach(function(el){el.onclick=function(){openD(el.dataset.id);};});

    /* severity filter */
    var active={crit:true,high:true,med:true,low:true};
    document.querySelectorAll(".chip").forEach(function(c){
      c.onclick=function(){
        var s=c.dataset.s;active[s]=!active[s];
        c.classList.toggle("on",active[s]);c.classList.toggle("off",!active[s]);
        document.querySelectorAll(".pin,.tile").forEach(function(el){el.classList.toggle("hide",!active[el.dataset.s]);});
        document.querySelectorAll(".tilegroup").forEach(function(g){
          var any=[].slice.call(g.querySelectorAll(".tile")).some(function(t){return !t.classList.contains("hide");});
          g.style.display=any?"":"none";
        });
      };
    });
  }
})();
