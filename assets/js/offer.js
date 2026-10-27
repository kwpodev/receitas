(function () {
  // CTAs: rolar até os planos
  document.querySelectorAll('[data-go]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById('offer');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Slideshow com pontos
  var slides = document.querySelectorAll('#slideshow .slide');
  var dots = document.querySelectorAll('#dots .dot');
  var current = 0;
  var timer = null;
  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle('active', idx === current); });
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === current); });
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(function () { show(current + 1); }, 3500);
  }
  dots.forEach(function (d, idx) {
    d.addEventListener('click', function () { show(idx); start(); });
  });
  if (slides.length) start();

  // Carrossel de depoimentos
  var track = document.getElementById('carTrack');
  var prev = document.getElementById('carPrev');
  var next = document.getElementById('carNext');
  function scrollCar(dir) {
    if (!track) return;
    var item = track.querySelector('.car-item');
    var step = item ? item.getBoundingClientRect().width + 16 : track.clientWidth;
    var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && atEnd) { track.scrollTo({ left: 0, behavior: 'smooth' }); return; }
    if (dir < 0 && track.scrollLeft <= 4) { track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' }); return; }
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  if (prev) prev.addEventListener('click', function () { scrollCar(-1); });
  if (next) next.addEventListener('click', function () { scrollCar(1); });

  // FAQ (acordeão)
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Curtir avaliações
  document.querySelectorAll('.like-btn').forEach(function (btn) {
    var base = parseInt(btn.getAttribute('data-count'), 10) || 0;
    var cnt = btn.querySelector('.cnt');
    var heart = btn.querySelector('.heart');
    btn.addEventListener('click', function () {
      var liked = btn.classList.toggle('liked');
      cnt.textContent = String(base + (liked ? 1 : 0));
      heart.textContent = liked ? '❤️' : '🤍';
    });
  });
})();
