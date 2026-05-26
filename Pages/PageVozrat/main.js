/* =============================================
   ИНЖИНИРИУМ — Возврат средств
   main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     1. ПАРАЛЛАКС при скролле
     Каждый .parallax-bg двигается с разной скоростью.
     heroParallax — отдельный слой для hero.
  ------------------------------------------------- */
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  const heroParallax     = document.getElementById('heroParallax');

  function updateParallax() {
    const scrollY = window.scrollY;

    // Hero parallax
    if (heroParallax) {
      heroParallax.style.transform = `translateY(${scrollY * 0.4}px)`;
    }

    // Секционные параллакс-фоны
    parallaxElements.forEach(el => {
      const speed  = parseFloat(el.dataset.speed || 0.2);
      const rect   = el.parentElement.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();


  /* -------------------------------------------------
     2. SCROLL OBSERVER — появление блоков
     slide-right: шаги приезжают справа
     scale: карточки и документы масштабируются
  ------------------------------------------------- */
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);

      setTimeout(() => {
        el.classList.add('is-visible');

        // Запускаем прогресс-бар если есть
        const bar = el.querySelector('.step__progress-bar');
        if (bar) {
          const width = bar.dataset.width || 100;
          setTimeout(() => { bar.style.width = width + '%'; }, 100);
        }

        // Пульсация иконок
        const icons = el.querySelectorAll('.pulse-icon');
        icons.forEach((icon, i) => {
          setTimeout(() => {
            icon.classList.add('is-pulsing');
            icon.addEventListener('animationend', () => {
              icon.classList.remove('is-pulsing');
            }, { once: true });
          }, i * 120);
        });

      }, delay);

      scrollObserver.unobserve(el);
    });
  }, { threshold: 0.15 });

  // Шаги — с задержкой по очереди
  document.querySelectorAll('.step').forEach((el, i) => {
    el.dataset.delay = i * 130;
    scrollObserver.observe(el);
  });

  // Карточки
  document.querySelectorAll('.card').forEach((el, i) => {
    el.dataset.delay = i * 90;
    scrollObserver.observe(el);
  });

  // Документы
  document.querySelectorAll('.doc-item').forEach((el, i) => {
    el.dataset.delay = i * 80;
    scrollObserver.observe(el);
  });

  // FAQ
  document.querySelectorAll('.faq__item').forEach((el, i) => {
    el.dataset.delay = i * 80;
    scrollObserver.observe(el);
  });

  // Одиночные блоки
  document.querySelectorAll('.highlight-box, .cta').forEach(el => {
    scrollObserver.observe(el);
  });


  /* -------------------------------------------------
     3. СЧЁТЧИКИ ЦИФР
  ------------------------------------------------- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let   current = 0;
      const step    = target / 40;

      const tick = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(tick);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 28);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
  });


  /* -------------------------------------------------
     4. FAQ ACCORDION
  ------------------------------------------------- */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq__answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
