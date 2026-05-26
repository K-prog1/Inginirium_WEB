document.addEventListener('DOMContentLoaded', () => {

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('is-visible'), delay);
      scrollObserver.unobserve(el);
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.step').forEach((el, i) => {
    el.dataset.delay = i * 110;
    scrollObserver.observe(el);
  });
  document.querySelectorAll('.card').forEach((el, i) => {
    el.dataset.delay = i * 90;
    scrollObserver.observe(el);
  });
  document.querySelectorAll('.doc-item').forEach((el, i) => {
    el.dataset.delay = i * 70;
    scrollObserver.observe(el);
  });
  document.querySelectorAll('.faq__item').forEach((el, i) => {
    el.dataset.delay = i * 70;
    scrollObserver.observe(el);
  });
  document.querySelectorAll('.highlight-box, .cta').forEach(el => {
    scrollObserver.observe(el);
  });

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
