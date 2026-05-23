/* =============================================
   ИНЖИНИРИУМ — Страница материнского капитала
   main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     1. SCROLL ANIMATIONS (IntersectionObserver)
     Элементы появляются при попадании в область экрана.
     Задержка задаётся через data-delay="мс" на элементе.
  ------------------------------------------------- */
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);

      setTimeout(() => el.classList.add('is-visible'), delay);
      scrollObserver.unobserve(el);
    });
  }, { threshold: 0.14 });

  // Шаги — появляются по очереди
  document.querySelectorAll('.step').forEach((el, i) => {
    el.dataset.delay = i * 110;
    scrollObserver.observe(el);
  });

  // Карточки — по очереди
  document.querySelectorAll('.card').forEach((el, i) => {
    el.dataset.delay = i * 90;
    scrollObserver.observe(el);
  });

  // Документы — по очереди
  document.querySelectorAll('.doc-item').forEach((el, i) => {
    el.dataset.delay = i * 70;
    scrollObserver.observe(el);
  });

  // FAQ-пункты — по очереди
  document.querySelectorAll('.faq__item').forEach((el, i) => {
    el.dataset.delay = i * 70;
    scrollObserver.observe(el);
  });

  // Одиночные блоки
  document.querySelectorAll('.highlight-box, .cta').forEach(el => {
    scrollObserver.observe(el);
  });


  /* -------------------------------------------------
     2. COUNTER ANIMATION
     Числа в .hero__stats считаются от 0 до target-значения.
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
     3. FAQ ACCORDION
     Клик по вопросу открывает/закрывает ответ.
     Остальные вопросы закрываются.
  ------------------------------------------------- */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('is-open');

      // Закрыть все
      document.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq__answer').style.maxHeight = '0';
      });

      // Открыть текущий, если был закрыт
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
