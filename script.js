// ========================================
// SITE DATA CONFIGURATION (imutável)
// ========================================
const SITE_DATA = Object.freeze({
  contact: {
    phone: "+5511994194529", // formato E.164 para wa.me
    email: 'contato@limamenegasso.adv.br',
    address: 'Rua Augusta, 1230 - Conjunto 45, São Paulo - SP',
    hours: 'Segunda a Sexta: 8h às 18h | Sábados: 9h às 13h',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta jurídica.'
  },
  social: {
    whatsapp: 'https://wa.me/5511994194529?text=Ol%C3%A1%2C%20tudo%20bem%2C%20seja%20bem-vindo.%20Logo%20iremos%20te%20atender',
    instagram: 'https://www.instagram.com/lima.menegasso?igsh=dWZubTJ2MzVpbmpw',
    facebook: 'https://facebook.com/limamenegassoadvocacia',
    linkedin: 'https://linkedin.com/company/lima-menegasso'
  },
  services: [
    { title:'Direito Civil', icon:'bi-scale', description:'Soluções completas para questões cíveis', items:['Contratos e negociações','Responsabilidade civil','Direitos da personalidade'] },
    { title:'Direito de Família', icon:'bi-heart', description:'Orientação em questões familiares sensíveis', items:['Divórcio e Dissolução de União Estável','Guarda e pensão alimentícia','Inventário e partilha'] },
    { title:'Direito Trabalhista', icon:'bi-briefcase', description:'Defesa dos direitos trabalhistas', items:['Demissões irregulares','Assédio moral e sexual','Acordos trabalhistas'] },
    { title:'Direito Empresarial', icon:'bi-building', description:'Consultoria jurídica para empresas', items:['Constituição de empresas','Contratos comerciais','Recuperação judicial'] },
    { title:'Direito do Consumidor', icon:'bi-person-check', description:'Proteção dos direitos do consumidor', items:['Defeitos de produtos','Cobranças indevidas','Negativações irregulares'] },
    { title:'Direito Imobiliário', icon:'bi-house', description:'Assessoria em transações imobiliárias', items:['Compra e venda de imóveis','Contratos de locação','Regularização fundiária'] },
    { title:'LGPD & Compliance', icon:'bi-shield-check', description:'Adequação à legislação de proteção de dados', items:['Adequação à LGPD','Políticas de privacidade','Compliance corporativo'] },
    { title:'Consultoria Jurídica', icon:'bi-chat-square-text', description:'Orientação jurídica preventiva', items:['Pareceres técnicos','Consultoria preventiva','Due diligence'] }
  ],
  testimonials: [
    { name:'Maria Silva', text:'Profissionais excepcionais! Resolveram meu caso de divórcio com muita competência e sensibilidade. Recomendo fortemente.', stars:5, avatar:'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&auto=compress' },
    { name:'João Santos', text:'Excelente atendimento na questão trabalhista. Conseguiram todos os direitos que eu tinha. Muito profissionais e éticos.', stars:5, avatar:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&auto=compress' },
    { name:'Ana Costa', text:'Atendimento personalizado e resultado excelente no meu caso empresarial. Equipe muito preparada e atualizada.', stars:5, avatar:'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&auto=compress' },
    { name:'Carlos Oliveira', text:'Consultoria jurídica de alta qualidade. Muito satisfeito com o atendimento e os resultados obtidos em meu processo.', stars:5, avatar:'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&auto=compress' }
  ]
});

// ========================================
// DOM HOOKS
// ========================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const navbar = $('#mainNav');
const navLinks = $$('.navbar-nav .nav-link');
const sections = $$('section[id]');
const contactForm = $('#contactForm');
const phoneInput = $('#phone');
const lightboxModal = $('#lightboxModal');
const lightboxImage = $('#lightboxImage');

// ========================================
// UTILS
// ========================================
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false; // MDN/web.dev

function formatPhone(value) {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 10) return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

function isValidEmail(email) {
  // Deixe o <input type="email"> validar primeiro; isto é uma camada extra
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function smoothScrollTo(target, offset = 80) {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  const behavior = prefersReducedMotion ? 'instant' : 'smooth'; // respeita preferências
  window.scrollTo({ top, behavior }); // MDN scrollTo
}

function generateWhatsAppLink(message = SITE_DATA.contact.whatsappMessage) {
  // wa.me guiado pela doc oficial
  return `https://wa.me/${SITE_DATA.contact.phone}?text=${encodeURIComponent(message)}`;
}

// rAF scheduler para scroll handlers
const rafScheduler = (fn) => {
  let ticking = false;
  return function (...args) {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// ========================================
// NAVBAR / NAVEGAÇÃO
// ========================================
function handleNavbarShrink() {
  if (!navbar) return;
  navbar.classList.toggle('shrink', window.scrollY > 100);
}

function updateActiveNavLinkById(id) {
  navLinks.forEach(link => {
    const matches = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', matches);
    if (matches) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}

function initSmoothScroll() {
  // Delegação global (evita múltiplos listeners)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]:not([data-bs-toggle])');
    if (!anchor) return;
    const target = anchor.getAttribute('href');
    e.preventDefault();
    smoothScrollTo(target);

    const navbarCollapse = $('.navbar-collapse.show');
    navbarCollapse?.classList.remove('show');
  }, { passive: false });
}

// ========================================
// SERVICES / TESTIMONIALS
// ========================================
function renderServices() {
  const grid = $('#servicesGrid');
  if (!grid) return;
  const frag = document.createDocumentFragment();

  SITE_DATA.services.forEach(service => {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6 col-12 mb-4'; // Adicionado col-12
    col.innerHTML = `
      <div class="service-card">
        <div class="service-icon"><i class="${service.icon}" aria-hidden="true"></i></div>
        <h4>${service.title}</h4>
        <p class="text-light mb-3">${service.description}</p>
        <ul class="list-unstyled">
          ${service.items.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>`;
    frag.appendChild(col);
  });
  grid.replaceChildren(frag);
}

function renderTestimonials() {
  const grid = $('#testimonialsGrid');
  if (!grid) return;
  const frag = document.createDocumentFragment();

  SITE_DATA.testimonials.forEach(t => {
    const col = document.createElement('div');
    col.className = 'col-lg-6 mb-4';
    col.innerHTML = `
      <div class="testimonial-card">
        <div class="d-flex align-items-center mb-3">
          <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar me-3" width="64" height="64" loading="lazy">
          <div>
            <h5 class="testimonial-author mb-1">${t.name}</h5>
            <div class="testimonial-stars" aria-label="${t.stars} de 5 estrelas" role="img">${'★'.repeat(t.stars)}</div>
          </div>
        </div>
        <p class="testimonial-text">"${t.text}"</p>
      </div>`;
    frag.appendChild(col);
  });
  grid.replaceChildren(frag);
}

// ========================================
// FORM CONTATO
// ========================================
function initContactForm() {
  if (!contactForm) return;

  // Melhor teclado no mobile (garanta no HTML: inputmode="tel")
  phoneInput?.addEventListener('input', (e) => { e.target.value = formatPhone(e.target.value); });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    if (!name || !email || !message) return alert('Por favor, preencha todos os campos obrigatórios.');
    if (!isValidEmail(email)) return alert('Por favor, insira um e-mail válido.');

    const whatsappMessage = `
*Nova mensagem do site*

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}

*Mensagem:*
${message}`.trim();

    const numeroWhatsApp = '5511994194529';
    const texto = `Olá! Gostaria de uma consulta.

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}

*Mensagem:* ${message}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');

    contactForm.reset();
    alert('Mensagem enviada! Em breve entraremos em contato.');
  });
}

// ========================================
// LIGHTBOX (básico)
// ========================================
function initLightbox() {
  const items = $$('.gallery-item');
  if (!items.length || !lightboxImage) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-image');
      if (src) lightboxImage.src = src;
    }, { passive: true });
  });
}

// ========================================
// WHATSAPP + SOCIAL
// ========================================
function initWhatsAppLinks() {
  const ids = ['whatsappCTA', 'scheduleConsultation', 'whatsappFloat', 'whatsappFooterLink'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = generateWhatsAppLink();
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  const socialMap = {
    instagramFloat: SITE_DATA.social.instagram,
    instagramFooterLink: SITE_DATA.social.instagram,
    facebookLink: SITE_DATA.social.facebook,
    linkedinLink: SITE_DATA.social.linkedin
  };
  Object.entries(socialMap).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
  });
}

// ========================================
// INTERSECTION OBSERVER p/ navegação
// ========================================
function initSectionObserver() {
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) updateActiveNavLinkById(entry.target.id);
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60% 0px', // ativa link quando ~40% do sec. visível
    threshold: 0.25
  });

  sections.forEach(sec => io.observe(sec));
}

// ========================================
// LAZY-LOADING de Imagens (sua versão melhorada)
// ========================================
(function () {
  function revealImage(img, classes) {
    const picture = img.parentNode && img.parentNode.tagName === 'PICTURE' ? img.parentNode : null;
    if (picture) {
      picture.querySelectorAll('source[data-srcset]').forEach(s => {
        s.srcset = s.dataset.srcset;
        s.removeAttribute('data-srcset');
      });
    }
    // dica: quando usar width descriptors no srcset, defina sizes no <img> (MDN)
    if (img.dataset.srcset) { img.srcset = img.dataset.srcset; img.removeAttribute('data-srcset'); }
    if (img.dataset.src)    { img.src    = img.dataset.src;    img.removeAttribute('data-src'); }
    if ('decoding' in img) img.decoding = 'async';

    const onLoad = () => { img.classList.add(classes.loaded); img.classList.remove(classes.loading); cleanup(); };
    const onError = () => { img.classList.add(classes.error);  img.classList.remove(classes.loading); cleanup(); };
    const cleanup = () => { img.removeEventListener('load', onLoad); img.removeEventListener('error', onError); };

    img.classList.add(classes.loading);
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add(classes.loaded);
      img.classList.remove(classes.loading);
    } else {
      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', onError, { once: true });
    }
  }

  function revealBackground(el, classes) {
    const bg = el.dataset.bg;
    if (!bg) return;
    el.classList.add(classes.loading);

    const img = new Image();
    img.decoding = 'async';
    img.onload = () => { el.style.backgroundImage = `url("${bg}")`; el.classList.add(classes.loaded); el.classList.remove(classes.loading); el.removeAttribute('data-bg'); };
    img.onerror = () => { el.classList.add(classes.error); el.classList.remove(classes.loading); };
    img.src = bg;
  }

  function initImageLazyLoading({
    selectorImgs = 'img[loading="lazy"], img[data-src], img[data-srcset]',
    selectorBgs  = '[data-bg]',
    root = null,
    rootMargin = '200px 0px',
    threshold = 0.01,
    classes = { loading: 'is-loading', loaded: 'is-loaded', error: 'is-error' }
  } = {}) {
    const imgs = $$(selectorImgs);
    const bgs  = $$(selectorBgs);

    const onlyNative = 'loading' in HTMLImageElement.prototype &&
                       imgs.every(img => !img.dataset.src && !img.dataset.srcset);

    if (onlyNative && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          if (!img.classList.contains(classes.loaded)) {
            img.addEventListener('load', () => {
              img.classList.add(classes.loaded);
              img.classList.remove(classes.loading);
            }, { once: true });
            img.classList.add(classes.loading);
            if (img.complete && img.naturalWidth > 0) {
              img.classList.add(classes.loaded);
              img.classList.remove(classes.loading);
            }
          }
          obs.unobserve(img);
        });
      }, { root, rootMargin, threshold });

      imgs.forEach(img => obs.observe(img));
      // bgs seguem para observer abaixo
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.tagName === 'IMG') revealImage(el, classes);
          else revealBackground(el, classes);
          self.unobserve(el);
        });
      }, { root, rootMargin, threshold });

      imgs.filter(img => img.dataset.src || img.dataset.srcset).forEach(img => io.observe(img));
      bgs.forEach(bg => io.observe(bg));
    } else {
      imgs.forEach(img => (img.dataset.src || img.dataset.srcset) ? revealImage(img, classes) : img.classList.add(classes.loaded));
      bgs.forEach(el => revealBackground(el, classes));
    }
  }

  window.initImageLazyLoading = initImageLazyLoading;
})();

// ========================================
// HERO CTA (scroll suave)
// ========================================
function initHeroCarousel() {
  $$('.hero-buttons a[href^="#"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(btn.getAttribute('href'));
    }, { passive: false });
  });
}

// ========================================
// PERFORMANCE (listeners + rAF)
// ========================================
const onScroll = rafScheduler(() => {
  handleNavbarShrink();
  // fallback extra caso o IntersectionObserver não esteja disponível
  if (!('IntersectionObserver' in window)) {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const h = section.offsetHeight;
      if (window.pageYOffset >= top && window.pageYOffset < top + h) current = section.id;
    });
    if (current) updateActiveNavLinkById(current);
  }
});

// ========================================
// EVENTOS
// ========================================
function initEventListeners() {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', rafScheduler(() => updateActiveNavLinkById(document.elementFromPoint?.(0, 100)?.closest?.('section[id]')?.id || '')), { passive: true });
}

// ========================================
// BOOTSTRAP / INICIALIZAÇÃO
// ========================================
function init() {
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init, { once: true }); return; }

  try {
    initSmoothScroll();
    initContactForm();
    initLightbox();
    initWhatsAppLinks();
    initSectionObserver();
    window.initImageLazyLoading?.(); // lazy
    initHeroCarousel();
    initEventListeners();

    renderServices();
    renderTestimonials();

    handleNavbarShrink();

    console.log('🎯 Lima & Menegasso website initialized successfully');
  } catch (err) {
    console.error('❌ Error initializing website:', err);
  }
}
init();

// ========================================
// DEBUG / EXPOSIÇÃO CONTROLADA
// ========================================
window.LIMA_MENEGASSO = { SITE_DATA, smoothScrollTo, generateWhatsAppLink, formatPhone, isValidEmail };

// ========================================
// SERVICE WORKER (pronto para uso futuro)
// ========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Descomente quando tiver /sw.js
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('SW registered:', reg))
    //   .catch(err => console.warn('SW registration failed:', err));
  });
}

// ========================================
// LOGGING DE ERROS
// ========================================
window.addEventListener('error', (e) => console.error('Uncaught error:', e.error || e.message));
window.addEventListener('unhandledrejection', (e) => console.error('Unhandled promise rejection:', e.reason));

