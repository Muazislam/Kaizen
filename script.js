/* =========================================================
   COSMIC GALAXY SHOWCASE — SCRIPT.JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     0. STARFIELD BACKGROUND (CSS-free, canvas particles)
  --------------------------------------------------------- */
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }

  function createStars(){
    const count = Math.floor((window.innerWidth * window.innerHeight) / 4000);
    stars = Array.from({length: count}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.15 + 0.02,
      alpha: Math.random(),
      delta: (Math.random() * 0.02) + 0.005
    }));
  }

  function drawStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.delta;
      if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  createStars();
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  /* Cursor glow */
  const cursorGlow = document.getElementById('cursor-glow');
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ---------------------------------------------------------
     1. NAVBAR SCROLL STATE + SMOOTH NAV
  --------------------------------------------------------- */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* Collapse mobile nav on link click */
  document.querySelectorAll('#navContent .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getInstance(document.getElementById('navContent'));
      if (collapse) collapse.hide();
    });
  });

  /* ---------------------------------------------------------
     2. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  function observeReveal(scope = document){
    scope.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     DATA SOURCES
  --------------------------------------------------------- */
  const CATEGORY_DATA = [
    { name:'Galaxies', icon:'🌌', desc:'Spiral, elliptical & irregular giants', key:'galaxy' },
    { name:'Planets', icon:'🪐', desc:'Worlds within our solar system', key:'planet' },
    { name:'Stars', icon:'⭐', desc:'Stellar nurseries & dying giants', key:'star' },
    { name:'Nebulas', icon:'🌠', desc:'Cosmic clouds of gas & dust', key:'nebula' },
    { name:'Space Missions', icon:'🚀', desc:'Humanity\'s reach into the void', key:'mission' },
    { name:'Black Holes', icon:'🕳️', desc:'Where light itself cannot escape', key:'blackhole' },
  ];

  const GALLERY_DATA = [
    { title:'Andromeda Galaxy', category:'galaxy', date:'Jan 2026', img:'https://images-assets.nasa.gov/image/PIA20213/PIA20213~thumb.jpg' },
    { title:'Pillars of Creation', category:'nebula', date:'Dec 2025', img:'https://images-assets.nasa.gov/image/PIA17563/PIA17563~thumb.jpg' },
    { title:'Saturn\'s Rings', category:'planet', date:'Nov 2025', img:'https://images-assets.nasa.gov/image/PIA21046/PIA21046~thumb.jpg' },
    { title:'Sagittarius A*', category:'blackhole', date:'Oct 2025', img:'https://images-assets.nasa.gov/image/PIA26107/PIA26107~thumb.jpg' },
    { title:'Crab Nebula', category:'nebula', date:'Sep 2025', img:'https://images-assets.nasa.gov/image/PIA23122/PIA23122~thumb.jpg' },
    { title:'Perseverance on Mars', category:'mission', date:'Aug 2025', img:'https://images-assets.nasa.gov/image/PIA24542/PIA24542~thumb.jpg' },
    { title:'The Sombrero Galaxy', category:'galaxy', date:'Jul 2025', img:'https://images-assets.nasa.gov/image/PIA04921/PIA04921~thumb.jpg' },
    { title:'Betelgeuse', category:'star', date:'Jun 2025', img:'https://images-assets.nasa.gov/image/PIA23726/PIA23726~thumb.jpg' },
    { title:'Jupiter\'s Great Red Spot', category:'planet', date:'May 2025', img:'https://images-assets.nasa.gov/image/PIA21775/PIA21775~thumb.jpg' },
    { title:'JWST Deep Field', category:'galaxy', date:'Apr 2025', img:'https://images-assets.nasa.gov/image/PIA25368/PIA25368~thumb.jpg' },
    { title:'Orion Nebula', category:'nebula', date:'Mar 2025', img:'https://images-assets.nasa.gov/image/PIA24365/PIA24365~thumb.jpg' },
    { title:'Artemis I Launch', category:'mission', date:'Feb 2025', img:'https://images-assets.nasa.gov/image/KSC-20221116-PH-KLS01_0068/KSC-20221116-PH-KLS01_0068~thumb.jpg' },
  ];

  const TIMELINE_DATA = [
    { title:'Big Bang', date:'13.8B years ago', desc:'The universe begins expanding from a singular point.' },
    { title:'Milky Way Forms', date:'~13.2B years ago', desc:'Our home galaxy begins to take shape.' },
    { title:'Solar System', date:'4.6B years ago', desc:'The sun and planets condense from a nebular cloud.' },
    { title:'Moon Landing', date:'1969', desc:'Apollo 11 lands the first humans on the Moon.' },
    { title:'JWST Launch', date:'2021', desc:'The James Webb Space Telescope reaches deep space.' },
    { title:'Future Missions', date:'2030s+', desc:'Crewed Mars missions and beyond await.' },
  ];

  const FACT_COUNTERS = [
    { target: 2000000000000, label:'Galaxies Discovered', suffix:'+', short:true },
    { target: 93000000000, label:'Light-Years (Observable Universe)', suffix:'', short:true },
    { target: 5600, label:'Exoplanets Confirmed', suffix:'+' },
    { target: 300, label:'NASA Missions Launched', suffix:'+' },
  ];

  const UNIVERSE_STATS = [
    { value:'13.8B', label:'Years Old' },
    { value:'2T+', label:'Galaxies' },
    { value:'~200B', label:'Trillion Stars' },
    { value:'93B', label:'Light-Years Wide' },
  ];

  const MISSION_DATA = [
    { name:'Voyager 1', year:'1977', status:'active', img:'https://images-assets.nasa.gov/image/PIA03153/PIA03153~thumb.jpg' },
    { name:'Hubble Space Telescope', year:'1990', status:'active', img:'https://images-assets.nasa.gov/image/hubble_STS31-84-084/hubble_STS31-84-084~thumb.jpg' },
    { name:'Cassini-Huygens', year:'1997', status:'complete', img:'https://images-assets.nasa.gov/image/PIA17218/PIA17218~thumb.jpg' },
    { name:'Curiosity Rover', year:'2011', status:'active', img:'https://images-assets.nasa.gov/image/PIA16239/PIA16239~thumb.jpg' },
    { name:'James Webb Telescope', year:'2021', status:'active', img:'https://images-assets.nasa.gov/image/PIA24729/PIA24729~thumb.jpg' },
    { name:'Artemis II', year:'2026', status:'planned', img:'https://images-assets.nasa.gov/image/KSC-20221116-PH-KLS01_0068/KSC-20221116-PH-KLS01_0068~thumb.jpg' },
    { name:'Europa Clipper', year:'2024', status:'active', img:'https://images-assets.nasa.gov/image/PIA26058/PIA26058~thumb.jpg' },
  ];

  const PLANET_ORBITS = [
    { name:'Mercury', color:'#c9b28e', size:10, radius:70, duration:6, distance:'57.9M km', diameter:'4,879 km', moons:0 },
    { name:'Venus', color:'#e8c37a', size:16, radius:110, duration:10, distance:'108.2M km', diameter:'12,104 km', moons:0 },
    { name:'Earth', color:'#4cc9f0', size:18, radius:150, duration:14, distance:'149.6M km', diameter:'12,742 km', moons:1 },
    { name:'Mars', color:'#ff6b4a', size:14, radius:190, duration:18, distance:'227.9M km', diameter:'6,779 km', moons:2 },
    { name:'Jupiter', color:'#e0b088', size:34, radius:240, duration:26, distance:'778.5M km', diameter:'139,820 km', moons:95 },
    { name:'Saturn', color:'#e8d3a0', size:30, radius:290, duration:34, distance:'1.43B km', diameter:'116,460 km', moons:146 },
  ];

  const TELESCOPE_DATA = [
    { name:'James Webb', icon:'🔭', year:'2021', type:'Infrared', desc:'The largest and most powerful space telescope ever built, peering back to the universe\'s earliest galaxies.' },
    { name:'Hubble', icon:'🛰️', year:'1990', type:'Optical/UV', desc:'Three decades of iconic imagery, from Pillars of Creation to deep field galaxy surveys.' },
    { name:'Chandra', icon:'✨', year:'1999', type:'X-ray', desc:'Reveals the universe\'s most violent phenomena — black holes, supernovae, and neutron stars.' },
    { name:'Spitzer', icon:'🌡️', year:'2003', type:'Infrared', desc:'Retired in 2020, it uncovered hidden stellar nurseries and distant exoplanets.' },
  ];

  const VIDEO_DATA = [
    { title:'Launch of Artemis I', duration:'4:32', img:'https://images-assets.nasa.gov/image/KSC-20221116-PH-KLS01_0068/KSC-20221116-PH-KLS01_0068~thumb.jpg' },
    { title:'A Tour of the JWST Mirrors', duration:'6:10', img:'https://images-assets.nasa.gov/image/PIA24729/PIA24729~thumb.jpg' },
    { title:'Perseverance Descent to Mars', duration:'3:45', img:'https://images-assets.nasa.gov/image/PIA24542/PIA24542~thumb.jpg' },
    { title:'Inside the ISS', duration:'8:02', img:'https://images-assets.nasa.gov/image/iss068e030243/iss068e030243~thumb.jpg' },
  ];

  /* ---------------------------------------------------------
     3. GALAXY CATEGORIES RENDER
  --------------------------------------------------------- */
  const categoryGrid = document.getElementById('categoryGrid');
  categoryGrid.innerHTML = CATEGORY_DATA.map((cat, i) => `
    <div class="col-md-4 col-6">
      <div class="glass-card category-card reveal" data-reveal data-filter-jump="${cat.key}">
        <div class="category-icon">${cat.icon}</div>
        <h5>${cat.name}</h5>
        <p>${cat.desc}</p>
      </div>
    </div>
  `).join('');

  categoryGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-filter-jump');
      document.getElementById('showcase').scrollIntoView({ behavior:'smooth' });
      setTimeout(() => applyFilter(key), 500);
    });
  });

  /* ---------------------------------------------------------
     4. GALLERY (IMAGE SHOWCASE) RENDER + FILTER + SEARCH
  --------------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  const noResults = document.getElementById('noResults');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.getElementById('filterButtons');
  let currentFilter = 'all';
  let likedSet = new Set();
  let savedSet = new Set();

  function categoryLabel(key){
    const map = { galaxy:'Galaxy', planet:'Planet', star:'Star', nebula:'Nebula', mission:'Mission', blackhole:'Black Hole' };
    return map[key] || key;
  }

  function renderGallery(){
    const term = searchInput.value.trim().toLowerCase();
    const filtered = GALLERY_DATA.filter((item, idx) => {
      const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
      const matchesSearch = !term || item.title.toLowerCase().includes(term) || categoryLabel(item.category).toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });

    noResults.classList.toggle('d-none', filtered.length !== 0);

    galleryGrid.innerHTML = filtered.map((item, idx) => {
      const globalIdx = GALLERY_DATA.indexOf(item);
      const liked = likedSet.has(globalIdx);
      const saved = savedSet.has(globalIdx);
      return `
      <div class="col-lg-3 col-md-4 col-6">
        <div class="glass-card gallery-card reveal in-view" data-idx="${globalIdx}">
          <div class="gallery-img-wrap" data-lightbox="${globalIdx}">
            <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.src='https://images-assets.nasa.gov/image/PIA23122/PIA23122~thumb.jpg'">
            <div class="gallery-overlay"><span class="gallery-cat-pill">${categoryLabel(item.category)}</span></div>
          </div>
          <div class="gallery-body">
            <h5>${item.title}</h5>
            <span class="gallery-date">${item.date}</span>
            <div class="gallery-actions">
              <button class="gallery-action-btn like-btn ${liked ? 'active':''}" data-idx="${globalIdx}" aria-label="Like">♥</button>
              <button class="gallery-action-btn save-btn ${saved ? 'active':''}" data-idx="${globalIdx}" aria-label="Save">⚑</button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');

    /* bind actions */
    galleryGrid.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = btn.getAttribute('data-idx');
        likedSet.has(idx) || likedSet.has(Number(idx)) ? likedSet.delete(Number(idx)) : likedSet.add(Number(idx));
        btn.classList.toggle('active');
      });
    });
    galleryGrid.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-idx'));
        savedSet.has(idx) ? savedSet.delete(idx) : savedSet.add(idx);
        btn.classList.toggle('active');
      });
    });
    galleryGrid.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = Number(el.getAttribute('data-lightbox'));
        openLightbox(GALLERY_DATA[idx]);
      });
    });
  }

  function applyFilter(key){
    currentFilter = key;
    filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === key);
    });
    renderGallery();
  }

  filterButtons.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    applyFilter(btn.getAttribute('data-filter'));
  });

  searchInput.addEventListener('input', () => renderGallery());

  renderGallery();

  /* Lightbox */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  function openLightbox(item){
    lightboxImg.src = item.img;
    lightboxImg.alt = item.title;
    lightboxCaption.textContent = `${item.title} — ${categoryLabel(item.category)} · ${item.date}`;
    lightbox.classList.add('active');
  }
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

  /* ---------------------------------------------------------
     5. TIMELINE RENDER + SCROLL PROGRESS
  --------------------------------------------------------- */
  const timelineTrack = document.getElementById('timelineTrack');
  timelineTrack.innerHTML = TIMELINE_DATA.map(item => `
    <div class="timeline-item glass-card">
      <div class="timeline-dot"></div>
      <span>${item.date}</span>
      <h6>${item.title}</h6>
      <p>${item.desc}</p>
    </div>
  `).join('');

  const timelineProgress = document.getElementById('timelineProgress');
  const timelineSection = document.getElementById('timeline');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        timelineProgress.style.width = '100%';
      } else if (entry.boundingClientRect.top > 0) {
        timelineProgress.style.width = '0%';
      }
    });
  }, { threshold: 0.3 });
  timelineObserver.observe(timelineSection);

  /* ---------------------------------------------------------
     6. ASTRONOMY FACT COUNTERS
  --------------------------------------------------------- */
  const factCounters = document.getElementById('factCounters');
  factCounters.innerHTML = FACT_COUNTERS.map((f, i) => `
    <div class="col-6">
      <div class="glass-card fact-counter reveal" data-reveal>
        <div class="fact-number" data-target="${f.target}" data-suffix="${f.suffix}" data-short="${f.short ? '1':'0'}" id="fact-${i}">0</div>
        <div class="fact-label">${f.label}</div>
      </div>
    </div>
  `).join('');

  /* ---------------------------------------------------------
     9. UNIVERSE STATS RENDER
  --------------------------------------------------------- */
  const universeStats = document.getElementById('universeStats');
  universeStats.innerHTML = UNIVERSE_STATS.map(s => `
    <div class="col-md-3 col-6">
      <div class="glass-card stat-card reveal" data-reveal>
        <div class="stat-number">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    </div>
  `).join('');

  /* ---------------------------------------------------------
     COUNTER ANIMATION HELPER (used by facts)
  --------------------------------------------------------- */
  function formatShort(num){
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    return Math.floor(num).toLocaleString();
  }

  function animateCounter(el){
    const target = Number(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const short = el.getAttribute('data-short') === '1';
    const duration = 2000;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (short ? formatShort(current) : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.fact-number').forEach(el => counterObserver.observe(el));

  /* ---------------------------------------------------------
     7. NASA MISSION SLIDER RENDER
  --------------------------------------------------------- */
  const missionSlider = document.getElementById('missionSlider');
  const statusLabel = { active:'Active', complete:'Complete', planned:'Planned' };
  missionSlider.innerHTML = MISSION_DATA.map(m => `
    <div class="glass-card mission-card reveal" data-reveal>
      <div class="mission-img"><img src="${m.img}" alt="${m.name}" loading="lazy" onerror="this.src='https://images-assets.nasa.gov/image/PIA24729/PIA24729~thumb.jpg'"></div>
      <div class="mission-info">
        <span class="mission-status status-${m.status}">${statusLabel[m.status]}</span>
        <h5>${m.name}</h5>
        <p class="text-muted small mb-0">Launched ${m.year}</p>
      </div>
    </div>
  `).join('');

  /* ---------------------------------------------------------
     8. INTERACTIVE SOLAR SYSTEM RENDER
  --------------------------------------------------------- */
  const solarSystem = document.getElementById('solarSystem');
  PLANET_ORBITS.forEach((p, i) => {
    const orbitRing = document.createElement('div');
    orbitRing.className = 'orbit-ring';
    orbitRing.style.width = (p.radius * 2) + 'px';
    orbitRing.style.height = (p.radius * 2) + 'px';

    const spinWrap = document.createElement('div');
    spinWrap.className = 'orbit-spin';
    spinWrap.style.animationDuration = p.duration + 's';
    // stagger starting angle
    spinWrap.style.transform = `rotate(${i * 47}deg)`;

    const planetBody = document.createElement('div');
    planetBody.className = 'planet-body';
    planetBody.style.width = p.size + 'px';
    planetBody.style.height = p.size + 'px';
    planetBody.style.background = `radial-gradient(circle at 35% 30%, #fff, ${p.color} 60%)`;
    planetBody.style.boxShadow = `0 0 12px ${p.color}`;
    planetBody.style.color = p.color;
    planetBody.innerHTML = `
      <div class="planet-tooltip">
        <h6>${p.name}</h6>
        <p>Distance: ${p.distance}</p>
        <p>Diameter: ${p.diameter}</p>
        <p>Moons: ${p.moons}</p>
      </div>
    `;

    planetBody.addEventListener('mouseenter', () => spinWrap.classList.add('paused'));
    planetBody.addEventListener('mouseleave', () => spinWrap.classList.remove('paused'));

    spinWrap.appendChild(planetBody);
    orbitRing.appendChild(spinWrap);
    solarSystem.appendChild(orbitRing);
  });

  /* ---------------------------------------------------------
     13. TELESCOPE GRID RENDER
  --------------------------------------------------------- */
  const telescopeGrid = document.getElementById('telescopeGrid');
  telescopeGrid.innerHTML = TELESCOPE_DATA.map(t => `
    <div class="col-lg-3 col-md-6">
      <div class="glass-card telescope-card reveal" data-reveal>
        <div class="telescope-icon">${t.icon}</div>
        <h5>${t.name}</h5>
        <p class="text-muted small">${t.desc}</p>
        <div class="telescope-meta">
          <span>Launched ${t.year}</span>
          <span>${t.type}</span>
        </div>
      </div>
    </div>
  `).join('');

  /* ---------------------------------------------------------
     12. VIDEO SECTION RENDER
  --------------------------------------------------------- */
  const videoGrid = document.getElementById('videoGrid');
  videoGrid.innerHTML = VIDEO_DATA.map(v => `
    <div class="col-lg-3 col-md-6">
      <div class="glass-card video-card reveal" data-reveal>
        <div class="video-thumb">
          <img src="${v.img}" alt="${v.title}" loading="lazy" onerror="this.src='https://images-assets.nasa.gov/image/PIA24729/PIA24729~thumb.jpg'">
          <div class="play-btn">▶</div>
        </div>
        <div class="video-info">
          <h6>${v.title}</h6>
          <span>${v.duration}</span>
        </div>
      </div>
    </div>
  `).join('');

  /* ---------------------------------------------------------
     14. COSMIC QUOTE TYPING EFFECT
  --------------------------------------------------------- */
  const quoteEl = document.getElementById('quoteTyped');
  const quoteText = 'Somewhere, something incredible is waiting to be known.';
  let quoteStarted = false;

  function typeQuote(){
    let i = 0;
    quoteEl.textContent = '';
    const interval = setInterval(() => {
      quoteEl.textContent += quoteText.charAt(i);
      i++;
      if (i >= quoteText.length) clearInterval(interval);
    }, 45);
  }

  const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !quoteStarted){
        quoteStarted = true;
        typeQuote();
      }
    });
  }, { threshold: 0.5 });
  quoteObserver.observe(document.getElementById('quote'));

  /* ---------------------------------------------------------
     15. NEWSLETTER FORM
  --------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMsg = document.getElementById('newsletterMsg');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    newsletterMsg.textContent = `🚀 Thanks! A confirmation has been sent to ${email}.`;
    newsletterForm.reset();
    setTimeout(() => newsletterMsg.textContent = '', 6000);
  });

  /* ---------------------------------------------------------
     16. FOOTER YEAR + BACK TO TOP
  --------------------------------------------------------- */
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------------------------------------------------
     10. NASA APOD API INTEGRATION
  --------------------------------------------------------- */
  const apodContent = document.getElementById('apodContent');
  const apodDateInput = document.getElementById('apodDate');
  const apodFetchBtn = document.getElementById('apodFetchBtn');
  const apodTodayBtn = document.getElementById('apodTodayBtn');
  const featuredImg = document.getElementById('featuredImg');
  const featuredTitle = document.getElementById('featuredTitle');
  const featuredDate = document.getElementById('featuredDate');
  const featuredDesc = document.getElementById('featuredDesc');

  const todayStr = new Date().toISOString().split('T')[0];
  apodDateInput.value = todayStr;
  apodDateInput.max = todayStr;
  apodDateInput.min = '1995-06-16';

  async function fetchAPOD(dateStr){
    apodContent.innerHTML = `
      <div class="apod-loader" id="apodLoader">
        <div class="spinner"></div>
        <p>Contacting NASA servers...</p>
      </div>`;
    try {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateStr}`);
      if (!res.ok) throw new Error('NASA API request failed (rate limit or invalid date).');
      const data = await res.json();
      renderAPOD(data);
    } catch (err){
      apodContent.innerHTML = `
        <div class="apod-error">
          <p>⚠️ Unable to load APOD right now — ${err.message}</p>
          <p class="text-muted small">NASA's DEMO_KEY is rate-limited. Try again shortly or pick a different date.</p>
        </div>`;
    }
  }

  function renderAPOD(data){
    const isVideo = data.media_type === 'video';
    apodContent.innerHTML = `
      <div class="row g-4 apod-media">
        <div class="col-lg-7">
          ${isVideo
            ? `<iframe src="${data.url}" title="${data.title}" style="height:360px;" allowfullscreen></iframe>`
            : `<img src="${data.hdurl || data.url}" alt="${data.title}">`
          }
        </div>
        <div class="col-lg-5">
          <span class="badge-tag">${data.date}</span>
          <h3>${data.title}</h3>
          <p class="text-muted" style="max-height:280px; overflow-y:auto;">${data.explanation}</p>
          ${data.copyright ? `<p class="text-muted small">© ${data.copyright}</p>` : ''}
        </div>
      </div>
    `;

    /* Sync into Featured Space Image section on first load */
    if (!isVideo){
      featuredImg.src = data.hdurl || data.url;
      featuredTitle.textContent = data.title;
      featuredDate.textContent = new Date(data.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
      featuredDesc.textContent = data.explanation.length > 220 ? data.explanation.slice(0, 220) + '…' : data.explanation;
    }
  }

  apodFetchBtn.addEventListener('click', () => fetchAPOD(apodDateInput.value));
  apodTodayBtn.addEventListener('click', () => {
    apodDateInput.value = todayStr;
    fetchAPOD(todayStr);
  });

  /* initial load */
  fetchAPOD(todayStr);

  /* ---------------------------------------------------------
     FINAL: OBSERVE ALL DYNAMICALLY INSERTED REVEAL ELEMENTS
  --------------------------------------------------------- */
  observeReveal(document);

});
