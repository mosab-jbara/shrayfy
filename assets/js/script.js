/* ============================================================ RENDER PRODUCTS ============================================================ */
function renderProducts(){
  const track = document.getElementById('prodTrack');
  track.innerHTML = PRODUCTS.map((p,i)=>`
    <article class="pcard" tabindex="0">
      <div class="pcard__img">
        <img src="${p.img}" alt="">
        <span class="pcard__num">${String(i+1).padStart(2,'0')}</span>
        <span class="pcard__view"><span data-i18n="prod.view">View stone</span> →</span>
      </div>
      <div class="pcard__body">
        <span class="pcard__cat" data-i18n="prod.${p.key}.cat"></span>
        <h3 class="pcard__name" data-i18n="prod.${p.key}.name"></h3>
        <p class="pcard__desc" data-i18n="prod.${p.key}.desc"></p>
        <div class="pcard__finish">
          ${p.finishes.map(f=>`<span class="finish-tag" data-i18n="${f}"></span>`).join('')}
        </div>
      </div>
    </article>`).join('');
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

/* ============================================================ PRODUCTS CAROUSEL ============================================================ */
let cIndex = 0;
const track = ()=>document.getElementById('prodTrack');
const prevBtn = document.getElementById('prodPrev');
const nextBtn = document.getElementById('prodNext');
function cardStep(){
  const t = track();
  const card = t.querySelector('.pcard');
  if(!card) return 0;
  const gap = parseFloat(getComputedStyle(t).gap) || 24;
  return card.offsetWidth + gap;
}
function maxIndex(){
  const t = track();
  const wrap = t.parentElement;
  const totalW = t.scrollWidth;
  const visW = wrap.clientWidth;
  const step = cardStep();
  if(step===0) return 0;
  return Math.max(0, Math.ceil((totalW - visW)/step));
}
function updateCarousel(){
  const t = track();
  const rtl = document.documentElement.dir === 'rtl';
  const offset = cIndex * cardStep();
  t.style.transform = `translateX(${rtl ? offset : -offset}px)`;
  prevBtn.disabled = cIndex <= 0;
  nextBtn.disabled = cIndex >= maxIndex();
}
function resetCarousel(){ cIndex = 0; updateCarousel(); }
prevBtn.addEventListener('click', ()=>{ cIndex=Math.max(0,cIndex-1); updateCarousel(); });
nextBtn.addEventListener('click', ()=>{ cIndex=Math.min(maxIndex(),cIndex+1); updateCarousel(); });
window.addEventListener('resize', ()=>{ cIndex=Math.min(cIndex,maxIndex()); updateCarousel(); });

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

/* ============================================================ INIT ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
applyLang('en');
observeReveals();
updateCarousel();
const statsEl = document.querySelector('.stats');
if(statsEl) statsIO.observe(statsEl);
