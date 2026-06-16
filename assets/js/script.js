/* ============================================================ RENDER PRODUCTS ============================================================ */
const CAROUSEL_COPIES = 4; // product set is duplicated for a seamless infinite loop
function renderProducts(){
  const track = document.getElementById('prodTrack');
  const card = (p)=>`
    <article class="pcard" tabindex="-1">
      <div class="pcard__frame"><span class="pcard__imgwrap"><img src="${p.img}" alt="" draggable="false"></span></div>
      <h3 class="pcard__name" data-i18n="prod.${p.key}.name"></h3>
    </article>`;
  let html = '';
  for(let i=0;i<CAROUSEL_COPIES;i++) html += PRODUCTS.map(card).join('');
  track.innerHTML = html;
}

/* ============================================================ APPLY i18n ============================================================ */
let currentLang = 'en';
function applyLang(lang){
  currentLang = lang;
  const dict = I18N[lang];
  const html = document.documentElement;
  html.lang = lang;
  html.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.getElementById('langLabel').textContent = (lang==='ar') ? 'العربية' : 'English';

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if(dict[k]!==undefined) el.textContent = dict[k];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const k = el.getAttribute('data-i18n-ph');
    if(dict[k]!==undefined) el.setAttribute('placeholder', dict[k]);
  });
  document.querySelectorAll('.lang-menu button').forEach(o=>o.classList.toggle('active', o.dataset.lang===lang));
  document.title = lang==='ar'
    ? 'شريفي للرخام والغرانيت — المصدر الأول لأحجار الأصداف'
    : 'SHRAYFY Marble & Granite — The Main Source of Shell Stones';

  // reset carousel position on dir change
  if(typeof resetCarousel === 'function') resetCarousel();
  // refresh an open project gallery in the new language
  if(typeof refreshGalleryLang === 'function') refreshGalleryLang();
}

/* ============================================================ HEADER SCROLL ============================================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

/* ============================================================ LANGUAGE DROPDOWN ============================================================ */
const lang = document.getElementById('lang');
const langBtn = document.getElementById('langBtn');
langBtn.addEventListener('click', e=>{
  e.stopPropagation();
  lang.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', lang.classList.contains('open'));
});
document.querySelectorAll('.lang-menu button').forEach(opt=>{
  opt.addEventListener('click', ()=>{
    applyLang(opt.dataset.lang);
    lang.classList.remove('open');
    langBtn.setAttribute('aria-expanded','false');
  });
});
document.addEventListener('click', ()=>{ lang.classList.remove('open'); langBtn.setAttribute('aria-expanded','false'); });

/* ============================================================ MOBILE DRAWER ============================================================ */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
function openDrawer(){ drawer.classList.add('open'); burger.setAttribute('aria-expanded','true'); }
function closeDrawer(){ drawer.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
burger.addEventListener('click', openDrawer);
drawer.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click', closeDrawer));
drawer.querySelectorAll('a.navlink').forEach(l=>l.addEventListener('click', closeDrawer));

/* ============================================================ PRODUCTS CAROUSEL (autoplay + pointer drag, infinite loop) ============================================================ */
const AUTOPLAY_MS = 4000;
const trackEl = ()=>document.getElementById('prodTrack');
const wrapEl  = ()=>trackEl().parentElement;
let setLen = 0;        // number of unique products
let cIndex = 0;        // logical index into the looped track
let autoTimer = null;
let drag = null;

function cardStep(){
  const t = trackEl();
  const card = t && t.querySelector('.pcard');
  if(!card) return 0;
  const gap = parseFloat(getComputedStyle(t).gap) || 24;
  return card.offsetWidth + gap;
}
function setTransform(px, animate){
  const t = trackEl();
  const rtl = document.documentElement.dir === 'rtl';
  t.style.transition = animate ? '' : 'none';
  t.style.transform = `translateX(${rtl ? px : -px}px)`;
}
function render(animate){ setTransform(cIndex * cardStep(), animate); }

// keep cIndex inside the middle copies; snap instantly when crossing (clones are identical → invisible)
function normalize(){
  if(setLen<=0) return;
  let snap = false;
  while(cIndex >= 2*setLen){ cIndex -= setLen; snap = true; }
  while(cIndex <  setLen){ cIndex += setLen; snap = true; }
  if(snap) render(false);
}
function afterSettle(){
  const t = trackEl();
  const onEnd = (e)=>{ if(e.target!==t || e.propertyName!=='transform') return; t.removeEventListener('transitionend', onEnd); normalize(); };
  t.addEventListener('transitionend', onEnd);
  // fallback if no transition fires (e.g. zero-distance move)
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ if(!drag) normalize(); }));
}
function step(dir){ cIndex += dir; render(true); afterSettle(); }
function resetCarousel(){ cIndex = setLen; render(false); }

function startAuto(){ stopAuto(); if(setLen>0) autoTimer = setInterval(()=>step(1), AUTOPLAY_MS); }
function stopAuto(){ if(autoTimer){ clearInterval(autoTimer); autoTimer = null; } }

function initCarousel(){
  setLen = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.length : 0;
  cIndex = setLen;
  render(false);
  const wrap = wrapEl();

  wrap.addEventListener('pointerdown', e=>{
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    drag = { x:e.clientX, base:cIndex*cardStep(), moved:false };
    stopAuto();
    try{ wrap.setPointerCapture(e.pointerId); }catch(_){}
    wrap.classList.add('dragging');
  });
  wrap.addEventListener('pointermove', e=>{
    if(!drag) return;
    const rtl = document.documentElement.dir === 'rtl';
    const dx = e.clientX - drag.x;
    if(Math.abs(dx) > 3) drag.moved = true;
    setTransform(drag.base + (rtl ? dx : -dx), false);
  });
  const endDrag = e=>{
    if(!drag) return;
    const rtl = document.documentElement.dir === 'rtl';
    const dx = (typeof e.clientX === 'number' ? e.clientX : drag.x) - drag.x;
    const step1 = cardStep() || 1;
    cIndex = Math.round((drag.base + (rtl ? dx : -dx)) / step1);
    drag = null;
    wrap.classList.remove('dragging');
    render(true);
    afterSettle();
    startAuto();
  };
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', endDrag);
  wrap.addEventListener('dragstart', e=>e.preventDefault());

  // pause autoplay while the pointer rests on the carousel
  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', ()=>{ if(!drag) startAuto(); });

  // optional (hidden) arrow buttons still work if present
  const pv = document.getElementById('prodPrev');
  const nx = document.getElementById('prodNext');
  if(pv) pv.addEventListener('click', ()=>{ step(-1); startAuto(); });
  if(nx) nx.addEventListener('click', ()=>{ step(1);  startAuto(); });

  window.addEventListener('resize', ()=> render(false));
  startAuto();
}

/* ============================================================ REVEAL ON SCROLL ============================================================ */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
  });
},{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
function observeReveals(){ document.querySelectorAll('.reveal:not(.visible)').forEach(el=>io.observe(el)); }

/* ============================================================ COUNTERS ============================================================ */
function animateCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = +el.dataset.count;
    const dur = 1400; const start = performance.now();
    function tick(now){
      const p = Math.min((now-start)/dur, 1);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(eased*target);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
const statsIO = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ animateCounters(); statsIO.disconnect(); } });
},{threshold:0.4});

/* ============================================================ HERO INTRO ============================================================ */
window.addEventListener('load', ()=>{
  document.querySelector('.hero').classList.add('in');
});

/* ============================================================ FORM (demo) ============================================================ */
document.getElementById('formBtn').addEventListener('click', ()=>{
  const btn = document.getElementById('formBtn');
  const span = btn.querySelector('span');
  const original = span.textContent;
  span.textContent = currentLang==='ar' ? 'تم الإرسال ✓' : 'Sent ✓';
  btn.style.background = 'var(--success)';
  setTimeout(()=>{ span.textContent = original; btn.style.background=''; }, 2200);
});

/* ============================================================ PROJECT GALLERY (lightbox) ============================================================ */
let galProject = null;   // current PROJECT_GALLERIES entry
let galIndex = 0;        // index of the visible image
let galTrigger = null;   // the card that opened the gallery (for focus restore)

const galEl = ()=>document.getElementById('gallery');
function galText(node, val){ if(node) node.textContent = val || ''; }

function renderGalleryImage(){
  if(!galProject) return;
  const imgs = galProject.images;
  galIndex = (galIndex + imgs.length) % imgs.length;   // wrap around
  const item = imgs[galIndex];
  const lang = currentLang;
  const img = document.getElementById('galleryImg');
  img.src = item.src;
  img.alt = item.title[lang] || item.title.en;
  img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';  // restart fade
  galText(document.getElementById('galleryTitle'), item.title[lang] || item.title.en);
  galText(document.getElementById('galleryDesc'),  item.desc[lang]  || item.desc.en);
  galText(document.getElementById('galleryCounter'), (galIndex+1) + ' / ' + imgs.length);
  document.querySelectorAll('#galleryThumbs .gthumb').forEach((t,i)=>{
    const on = i===galIndex;
    t.classList.toggle('active', on);
    if(on) t.scrollIntoView({block:'nearest', inline:'nearest'});
  });
}

function renderGalleryHead(){
  if(!galProject) return;
  const dict = I18N[currentLang] || {};
  galText(document.getElementById('galleryCat'), dict[galProject.catKey]);
  galText(document.getElementById('galleryProject'), dict[galProject.titleKey]);
}

function buildGalleryThumbs(){
  const wrap = document.getElementById('galleryThumbs');
  wrap.innerHTML = galProject.images.map((im,i)=>
    `<button class="gthumb" data-idx="${i}" aria-label="Image ${i+1}"><img src="${im.src}" alt="" loading="lazy"></button>`
  ).join('');
  wrap.querySelectorAll('.gthumb').forEach(b=>
    b.addEventListener('click', ()=>{ galIndex = +b.dataset.idx; renderGalleryImage(); }));
}

function openGallery(id, trigger){
  galProject = (typeof PROJECT_GALLERIES !== 'undefined') ? PROJECT_GALLERIES[id] : null;
  if(!galProject) return;
  galIndex = 0;
  galTrigger = trigger || null;
  renderGalleryHead();
  buildGalleryThumbs();
  renderGalleryImage();
  const g = galEl();
  g.classList.add('open');
  g.setAttribute('aria-hidden','false');
  document.body.classList.add('gallery-open');
  const closeBtn = g.querySelector('.gallery__close');
  if(closeBtn) closeBtn.focus();
}

function closeGallery(){
  const g = galEl();
  g.classList.remove('open');
  g.setAttribute('aria-hidden','true');
  document.body.classList.remove('gallery-open');
  galProject = null;
  if(galTrigger){ try{ galTrigger.focus(); }catch(_){} galTrigger = null; }
}

function galleryStep(dir){ if(galProject){ galIndex += dir; renderGalleryImage(); } }

// re-render the open gallery's text when the language toggles
function refreshGalleryLang(){ if(galProject){ renderGalleryHead(); renderGalleryImage(); } }

function initGallery(){
  const g = galEl();
  if(!g) return;
  document.querySelectorAll('.proj[data-project]').forEach(card=>{
    card.addEventListener('click', e=>{
      e.preventDefault();
      openGallery(card.dataset.project, card);
    });
  });
  g.querySelectorAll('[data-gclose]').forEach(el=>el.addEventListener('click', closeGallery));
  document.getElementById('galleryPrev').addEventListener('click', ()=>galleryStep(-1));
  document.getElementById('galleryNext').addEventListener('click', ()=>galleryStep(1));
  document.addEventListener('keydown', e=>{
    if(!galProject) return;
    if(e.key === 'Escape'){ closeGallery(); return; }
    const rtl = document.documentElement.dir === 'rtl';
    if(e.key === 'ArrowRight') galleryStep(rtl ? -1 : 1);
    else if(e.key === 'ArrowLeft') galleryStep(rtl ? 1 : -1);
  });
}

/* ============================================================ INIT ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
applyLang('en');
observeReveals();
initCarousel();
initGallery();
const statsEl = document.querySelector('.stats');
if(statsEl) statsIO.observe(statsEl);
