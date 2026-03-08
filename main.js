/* VK&S — Premium Interactions v5 | 2026 */
(function(){
  'use strict';

  /* ── IMAGE PROTECTION ── */
  document.addEventListener('contextmenu', e=>{
    if(e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', e=>{
    if(e.target.tagName === 'IMG') e.preventDefault();
  });

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  const stt = document.querySelector('.stt');
  const heroScroll = document.getElementById('heroScroll');
  let heroHidden = false;

  window.addEventListener('scroll', ()=>{
    const s = window.scrollY;
    nav?.classList.toggle('scrolled', s > 40);
    stt?.classList.toggle('show', s > 500);
    updateSvcNav();

    /* Hide hero scroll hand once user scrolls */
    if(heroScroll && !heroHidden && s > 60){
      heroScroll.classList.add('hidden');
      heroHidden = true;
    }
  }, {passive:true});

  /* ── PARALLAX HERO ── */
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    window.addEventListener('scroll', ()=>{
      heroBg.style.transform = `translateY(${window.scrollY * 0.38}px)`;
    }, {passive:true});
  }

  /* ── HAMBURGER ── */
  const ham = document.querySelector('.ham');
  const drawer = document.querySelector('.drawer');
  ham?.addEventListener('click', ()=>{
    const open = ham.classList.toggle('open');
    drawer?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    ham?.classList.remove('open');
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── ACTIVE NAV ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .drawer a, .mob-nav-item').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ── SCROLL-TO-TOP ── */
  stt?.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  /* ── REVEAL OBSERVER ── */
  const revObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('vis'); revObs.unobserve(e.target); }
    });
  },{threshold:0.08,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.rv, .rv-scale').forEach(el=> revObs.observe(el));

  /* ── COUNTER ANIMATION ── */
  const countObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ animCount(e.target); countObs.unobserve(e.target); }
    });
  },{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el=> countObs.observe(el));

  function animCount(el){
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 2200, step = 14;
    let cur = 0;
    const inc = target / (dur / step);
    const t = setInterval(()=>{
      cur += inc;
      if(cur >= target){
        cur = target; clearInterval(t);
        el.style.transition = 'color .3s';
        el.style.color = '#e8bf50';
        setTimeout(()=>{ el.style.color = ''; }, 600);
      }
      el.textContent = Math.floor(cur) + suffix;
    }, step);
  }

  /* ── TYPEWRITER HERO ── */
  const tw = document.querySelector('.hero-typewriter');
  if(tw){
    const cursor = tw.querySelector('.tw-cursor');
    const phrases = ['Audit & Assurance','Direct Taxation','Indirect Tax & GST','Legal Services','Debt Syndication','Insolvency & IBC','Business Advisory','State Incentives'];
    let pi = 0, ci = 0, deleting = false;
    const textNode = document.createElement('span');
    tw.insertBefore(textNode, cursor);
    function typeStep(){
      const phrase = phrases[pi];
      if(!deleting){
        textNode.textContent = phrase.slice(0, ++ci);
        if(ci === phrase.length){ deleting = true; setTimeout(typeStep, 2000); return; }
        setTimeout(typeStep, 68);
      } else {
        textNode.textContent = phrase.slice(0, --ci);
        if(ci === 0){ deleting = false; pi = (pi+1) % phrases.length; setTimeout(typeStep, 400); return; }
        setTimeout(typeStep, 38);
      }
    }
    setTimeout(typeStep, 1200);
  }

  /* ── TICKER DUPLICATE ── */
  const tickerInner = document.querySelector('.ticker-inner');
  if(tickerInner){
    const clone = tickerInner.cloneNode(true);
    tickerInner.parentNode.appendChild(clone);
  }

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
        window.scrollTo({top: target.offsetTop - navH - 20, behavior:'smooth'});
      }
    });
  });

  /* ── SERVICES PAGE — Sidebar Active ── */
  function updateSvcNav(){
    const navLinks = document.querySelectorAll('.svc-nav a');
    if(!navLinks.length) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
    const sections = document.querySelectorAll('.svc-section');
    let current = '';
    sections.forEach(s=>{ if(window.scrollY >= s.offsetTop - navH - 60) current = '#' + s.id; });
    navLinks.forEach(a=>{ a.classList.toggle('active', a.getAttribute('href') === current); });
  }

  /* ── FORM SUBMIT ── */
  const form = document.querySelector('.c-form form');
  form?.addEventListener('submit', e=>{
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending…'; btn.disabled = true;
    setTimeout(()=>{
      btn.innerHTML = '✓ Message Sent — We\'ll be in touch!';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(()=>{ btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 4000);
    }, 1200);
  });

  /* ── STAGGER DRAWER ITEMS ── */
  document.querySelectorAll('.drawer a').forEach((a, i)=>{
    a.style.animationDelay = `${i * 0.06 + 0.1}s`;
  });

  /* ── PUBLICATIONS FILTER (if present) ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card[data-cat]');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      pubCards.forEach(card=>{
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

})();

/* ── EVENTS SLIDER ── */
(function(){
  const slider = document.getElementById('eventsSlider');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dots = document.querySelectorAll('.slider-dot');
  if(!slider) return;

  let current = 0;
  const cards = slider.querySelectorAll('.event-card');
  const total = cards.length;
  const cardW = () => cards[0].offsetWidth + 24; // gap:1.5rem = 24px

  function goTo(n){
    current = Math.max(0, Math.min(n, total - 1));
    slider.style.transform = `translateX(-${current * cardW()}px)`;
    dots.forEach((d,i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d,i) => d.addEventListener('click', () => goTo(i)));

  // Auto-advance every 4s
  setInterval(() => goTo(current < total - 1 ? current + 1 : 0), 4000);

  // Touch swipe
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if(Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();
