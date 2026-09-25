const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-billing]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-billing]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const yearly = button.dataset.billing === 'yearly';
    document.querySelectorAll('.price-month').forEach((price) => {
      const monthly = price.textContent;
      if (!price.dataset.monthly) price.dataset.monthly = monthly;
      const amount = Number.parseFloat(price.dataset.monthly.replace('$', ''));
      if (Number.isNaN(amount)) return;
      price.textContent = yearly ? `$${(amount * 0.8).toFixed(amount % 1 ? 2 : 0)}` : price.dataset.monthly;
    });
    document.querySelectorAll('.price-card h3 small').forEach((suffix) => {
      suffix.textContent = yearly ? '/ mes · facturado anual' : '/ mes';
    });
  });
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});