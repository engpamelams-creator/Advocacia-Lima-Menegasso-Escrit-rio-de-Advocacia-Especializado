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
    col.className = 'col-lg-3 col-md-6 col-12 mb-4';
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
// LIGHTBOX (uso prático + proteção contra elementos ausentes)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxModal = document.getElementById('lightboxModal');
  let zoomed = false;

  // Protege caso Bootstrap ou elementos não existam
  let bsModal = null;
  if (typeof bootstrap !== 'undefined' && lightboxModal) {
    try { bsModal = new bootstrap.Modal(lightboxModal); }
    catch (err) { console.warn('Bootstrap Modal não pôde ser inicializado:', err); }
  }

  if (!galleryItems.length || !lightboxImage || !lightboxModal) {
    // não temos elementos suficientes para inicializar o lightbox — silêncio no console
    return;
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', function (evt) {
      const imgSrc = item.getAttribute('data-image') || item.querySelector('img')?.src;
      if (!imgSrc) return;
      lightboxImage.src = imgSrc;
      lightboxImage.style.transform = 'scale(1)';
      lightboxImage.style.cursor = 'zoom-in';
      zoomed = false;
      if (bsModal && typeof bsModal.show === 'function') bsModal.show();
      else {
        // fallback simples: adicionar classe 'show' no modal se não houver bootstrap
        lightboxModal.classList.add('show');
        lightboxModal.style.display = 'block';
      }
    }, { passive: true });
  });

  // Zoom ao clicar na imagem ampliada (proteção)
  if (lightboxImage) {
    lightboxImage.addEventListener('click', function (e) {
      e.preventDefault();
      zoomed = !zoomed;
      lightboxImage.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
      lightboxImage.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });
  }

  // Reset zoom ao fechar modal (compatível com Bootstrap e fallback)
  if (lightboxModal) {
    lightboxModal.addEventListener && lightboxModal.addEventListener('hidden.bs.modal', function () {
      if (lightboxImage) {
        lightboxImage.src = '';
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.cursor = 'zoom-in';
      }
      zoomed = false;
    });

    // fallback: se usamos show/display manualmente, escuta clique no botão de fechar ou clique fora
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal && bsModal == null) {
        lightboxModal.classList.remove('show');
        lightboxModal.style.display = 'none';
        if (lightboxImage) {
          lightboxImage.src = '';
          lightboxImage.style.transform = 'scale(1)';
          lightboxImage.style.cursor = 'zoom-in';
        }
        zoomed = false;
      }
    });
  }
});

// ========================================
// WHATSAPP FLOATING MENU (removido <script> tags e adicionado robustez)
// ========================================
(function initWhatsAppMenu() {
  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('whatsappToggle');
    const menuOptions = document.getElementById('whatsappOptions');

    if (!toggleButton || !menuOptions) {
      console.debug("Elemento 'whatsappToggle' ou 'whatsappOptions' não encontrado — botão flutuante desativado.");
      return;
    }

    function setAria(expanded) {
      toggleButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      menuOptions.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    }

    function toggleMenu(e) {
      e.stopPropagation();
      const active = menuOptions.classList.toggle('active');
      setAria(active);
    }

    toggleButton.addEventListener('click', toggleMenu, { passive: true });

    // Fecha ao clicar fora
    document.addEventListener('click', function (event) {
      const isClickInside = toggleButton.contains(event.target) || menuOptions.contains(event.target);
      if (!isClickInside && menuOptions.classList.contains('active')) {
        menuOptions.classList.remove('active');
        setAria(false);
      }
    }, { passive: true });

    // Fecha com ESC e mantém acessibilidade
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOptions.classList.contains('active')) {
        menuOptions.classList.remove('active');
        setAria(false);
        toggleButton.focus();
      }
    });
  });
})();

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

// ========================================
// SERVICE DATA RENDER (exposição controlada)
// ========================================
(function () {
  window.SITE_DATA = window.SITE_DATA || {};
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    const services = window.SITE_DATA.services || [];
    if (!Array.isArray(services) || services.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-light-50">Sem serviços cadastrados.</div>';
      return;
    }
    grid.classList.add('grid');
    grid.innerHTML = services.map(s => `
      <article class="card">
        <div class="icon"><i class="bi ${s.icon}" aria-hidden="true" style="font-size:18px"></i></div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <ul class="bullets">${s.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </article>
    `).join('');
  }
  document.addEventListener('DOMContentLoaded', renderServices);
})();

// ========================================
// SERVICE CARDS RENDERIZAÇÃO (FIM DO ARQUIVO)
// ========================================
(function(){
  // Garante que SITE_DATA exista
  window.SITE_DATA = window.SITE_DATA || {};

  // Se quiser, definir serviços aqui como fallback
  if (!Array.isArray(window.SITE_DATA.services)) {
    window.SITE_DATA.services = [
      { title:'Direito Civil', icon:'bi-scale', description:'Soluções completas para questões cíveis', items:['Contratos e negociações','Responsabilidade civil','Direitos da personalidade'] },
      { title:'Direito de Família', icon:'bi-heart', description:'Orientação em questões familiares sensíveis', items:['Divórcio e Dissolução de União Estável','Guarda e pensão alimentícia','Inventário e partilha'] },
      { title:'Direito Trabalhista', icon:'bi-briefcase', description:'Defesa dos direitos trabalhistas', items:['Demissões irregulares','Assédio moral e sexual','Acordos trabalhistas'] },
      { title:'Direito Empresarial', icon:'bi-building', description:'Consultoria jurídica para empresas', items:['Constituição de empresas','Contratos comerciais','Recuperação judicial'] },
      { title:'Direito do Consumidor', icon:'bi-person-check', description:'Proteção dos direitos do consumidor', items:['Defeitos de produtos','Cobranças indevidas','Negativações irregulares'] },
      { title:'Direito Imobiliário', icon:'bi-house', description:'Assessoria em transações imobiliárias', items:['Compra e venda de imóveis','Contratos de locação','Regularização fundiária'] },
      { title:'LGPD & Compliance', icon:'bi-shield-check', description:'Adequação à legislação de proteção de dados', items:['Adequação à LGPD','Políticas de privacidade','Compliance corporativo'] },
      { title:'Consultoria Jurídica', icon:'bi-chat-square-text', description:'Orientação jurídica preventiva', items:['Pareceres técnicos','Consultoria preventiva','Due diligence'] }
    ];
  }

  // Função de render
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) {
      console.warn('servicesGrid não encontrado');
      return;
    }
    const services = window.SITE_DATA.services;
    if (!services || services.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-light-50">Sem serviços cadastrados.</div>';
      return;
    }

    // Limpar o conteúdo antigo
    grid.innerHTML = '';

    services.forEach(s => {
      // monta o item do card
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-3';

      // monta o card
      const card = document.createElement('div');
      card.className = 'card h-100 bg-dark text-white border-0 shadow-sm';
      card.style.background = 'linear-gradient(180deg, #171717 0%, #1d1d1d 100%)'; 
      card.style.border = '1px solid #2a2a2a';
      card.style.borderRadius = '12px';
      card.style.padding = '18px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.transition = 'transform .18s, box-shadow .18s, border-color .18s';

      card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 10px 24px rgba(0,0,0,.45)';
        card.style.borderColor = '#353535';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '#2a2a2a';
      });

      // Ícone
      const iconDiv = document.createElement('div');
      iconDiv.className = 'icon mb-3';
      iconDiv.style.width = '50px';
      iconDiv.style.height = '50px';
      iconDiv.style.borderRadius = '50%';
      iconDiv.style.background = 'radial-gradient(circle at 30% 30%, #ffcf33, #d6a800 70%, #8a6b00 100%)';
      iconDiv.style.display = 'flex';
      iconDiv.style.alignItems = 'center';
      iconDiv.style.justifyContent = 'center';
      iconDiv.style.flex = '0 0 auto';
      iconDiv.style.marginBottom = '10px';
      iconDiv.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,.25), 0 3px 10px rgba(0,0,0,.25)';
      
      const iconEl = document.createElement('i');
      iconEl.className = `bi ${s.icon}`; 
      iconEl.setAttribute('aria-hidden','true');
      iconEl.style.fontSize = '24px';
      iconEl.style.color = '#ffcf33';
      iconDiv.appendChild(iconEl);

      // Título
      const h3 = document.createElement('h3');
      h3.innerText = s.title;
      h3.style.margin = '0 0 6px';
      h3.style.fontSize = '16px';
      h3.style.fontWeight = '700';
      h3.style.color = '#ffcf33';

      // Descrição
      const p = document.createElement('p');
      p.innerText = s.description;
      p.style.margin = '0 0 8px';
      p.style.color = '#d7d7d7';
      p.style.fontSize = '13px';

      // Lista de itens
      const ul = document.createElement('ul');
      ul.className = 'bullets';
      ul.style.listStyle = 'none';
      ul.style.padding = '0';
      ul.style.margin = '4px 0 0';
      s.items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        li.style.position = 'relative';
        li.style.paddingLeft = '14px';
        li.style.margin = '7px 0';
        li.style.color = '#d9d9d9';
        li.style.fontSize = '12.5px';
        // marcador personalizado
        const before = document.createElement('span');
        before.style.position = 'absolute';
        before.style.left = '0';
        before.style.top = '0.5em';
        before.style.width = '6px';
        before.style.height = '6px';
        before.style.background = '#d6a800';
        before.style.borderRadius = '1px';
        before.style.display = 'inline-block';
        li.appendChild(before);
        li.appendChild(document.createTextNode(item));
        ul.appendChild(li);
      });

      card.appendChild(iconDiv);
      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(ul);

      col.appendChild(card);
      grid.appendChild(col);
    });
  }

  document.addEventListener('DOMContentLoaded', renderServices);
})();
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxModal = document.getElementById('lightboxModal');
  let zoomed = false;

  // Protege caso Bootstrap ou elementos não existam
  let bsModal = null;
  if (typeof bootstrap !== 'undefined' && lightboxModal) {
    try { bsModal = new bootstrap.Modal(lightboxModal); }
    catch (err) { console.warn('Bootstrap Modal não pôde ser inicializado:', err); }
  }

  if (!galleryItems.length || !lightboxImage || !lightboxModal) {
    // não temos elementos suficientes para inicializar o lightbox — silêncio no console
    return;
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', function (evt) {
      const imgSrc = item.getAttribute('data-image') || item.querySelector('img')?.src;
      if (!imgSrc) return;
      lightboxImage.src = imgSrc;
      lightboxImage.style.transform = 'scale(1)';
      lightboxImage.style.cursor = 'zoom-in';
      zoomed = false;
      if (bsModal && typeof bsModal.show === 'function') bsModal.show();
      else {
        // fallback simples: adicionar classe 'show' no modal se não houver bootstrap
        lightboxModal.classList.add('show');
        lightboxModal.style.display = 'block';
      }
    }, { passive: true });
  });

  // Zoom ao clicar na imagem ampliada (proteção)
  if (lightboxImage) {
    lightboxImage.addEventListener('click', function (e) {
      e.preventDefault();
      zoomed = !zoomed;
      lightboxImage.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
      lightboxImage.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });
  }

  // Reset zoom ao fechar modal (compatível com Bootstrap e fallback)
  if (lightboxModal) {
    lightboxModal.addEventListener && lightboxModal.addEventListener('hidden.bs.modal', function () {
      if (lightboxImage) {
        lightboxImage.src = '';
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.cursor = 'zoom-in';
      }
      zoomed = false;
    });

    // fallback: se usamos show/display manualmente, escuta clique no botão de fechar ou clique fora
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal && bsModal == null) {
        lightboxModal.classList.remove('show');
        lightboxModal.style.display = 'none';
        if (lightboxImage) {
          lightboxImage.src = '';
          lightboxImage.style.transform = 'scale(1)';
          lightboxImage.style.cursor = 'zoom-in';
        }
        zoomed = false;
      }
    });
  }
});

// ========================================
// WHATSAPP FLOATING MENU (removido <script> tags e adicionado robustez)
// ========================================
(function initWhatsAppMenu() {
  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('whatsappToggle');
    const menuOptions = document.getElementById('whatsappOptions');

    if (!toggleButton || !menuOptions) {
      console.debug("Elemento 'whatsappToggle' ou 'whatsappOptions' não encontrado — botão flutuante desativado.");
      return;
    }

    function setAria(expanded) {
      toggleButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      menuOptions.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    }

    function toggleMenu(e) {
      e.stopPropagation();
      const active = menuOptions.classList.toggle('active');
      setAria(active);
    }

    toggleButton.addEventListener('click', toggleMenu, { passive: true });

    // Fecha ao clicar fora
    document.addEventListener('click', function (event) {
      const isClickInside = toggleButton.contains(event.target) || menuOptions.contains(event.target);
      if (!isClickInside && menuOptions.classList.contains('active')) {
        menuOptions.classList.remove('active');
        setAria(false);
      }
    }, { passive: true });

    // Fecha com ESC e mantém acessibilidade
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOptions.classList.contains('active')) {
        menuOptions.classList.remove('active');
        setAria(false);
        toggleButton.focus();
      }
    });
  });
})();

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

// ========================================
// SERVICE DATA RENDER (exposição controlada)
// ========================================
(function () {
  window.SITE_DATA = window.SITE_DATA || {};
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    const services = window.SITE_DATA.services || [];
    if (!Array.isArray(services) || services.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-light-50">Sem serviços cadastrados.</div>';
      return;
    }
    grid.classList.add('grid');
    grid.innerHTML = services.map(s => `
      <article class="card">
        <div class="icon"><i class="bi ${s.icon}" aria-hidden="true" style="font-size:18px"></i></div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <ul class="bullets">${s.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </article>
    `).join('');
  }
  document.addEventListener('DOMContentLoaded', renderServices);
})();

// ========================================
// SERVICE CARDS RENDERIZAÇÃO (FIM DO ARQUIVO)
// ========================================
(function(){
  // Garante que SITE_DATA exista
  window.SITE_DATA = window.SITE_DATA || {};

  // Se quiser, definir serviços aqui como fallback
  if (!Array.isArray(window.SITE_DATA.services)) {
    window.SITE_DATA.services = [
      { title:'Direito Civil', icon:'bi-scale', description:'Soluções completas para questões cíveis', items:['Contratos e negociações','Responsabilidade civil','Direitos da personalidade'] },
      { title:'Direito de Família', icon:'bi-heart', description:'Orientação em questões familiares sensíveis', items:['Divórcio e Dissolução de União Estável','Guarda e pensão alimentícia','Inventário e partilha'] },
      { title:'Direito Trabalhista', icon:'bi-briefcase', description:'Defesa dos direitos trabalhistas', items:['Demissões irregulares','Assédio moral e sexual','Acordos trabalhistas'] },
      { title:'Direito Empresarial', icon:'bi-building', description:'Consultoria jurídica para empresas', items:['Constituição de empresas','Contratos comerciais','Recuperação judicial'] },
      { title:'Direito do Consumidor', icon:'bi-person-check', description:'Proteção dos direitos do consumidor', items:['Defeitos de produtos','Cobranças indevidas','Negativações irregulares'] },
      { title:'Direito Imobiliário', icon:'bi-house', description:'Assessoria em transações imobiliárias', items:['Compra e venda de imóveis','Contratos de locação','Regularização fundiária'] },
      { title:'LGPD & Compliance', icon:'bi-shield-check', description:'Adequação à legislação de proteção de dados', items:['Adequação à LGPD','Políticas de privacidade','Compliance corporativo'] },
      { title:'Consultoria Jurídica', icon:'bi-chat-square-text', description:'Orientação jurídica preventiva', items:['Pareceres técnicos','Consultoria preventiva','Due diligence'] }
    ];
  }

  // Função de render
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) {
      console.warn('servicesGrid não encontrado');
      return;
    }
    const services = window.SITE_DATA.services;
    if (!services || services.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-light-50">Sem serviços cadastrados.</div>';
      return;
    }

    // Limpar o conteúdo antigo
    grid.innerHTML = '';

    services.forEach(s => {
      // monta o item do card
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-3';

      // monta o card
      const card = document.createElement('div');
      card.className = 'card h-100 bg-dark text-white border-0 shadow-sm';
      card.style.background = 'linear-gradient(180deg, #171717 0%, #1d1d1d 100%)'; 
      card.style.border = '1px solid #2a2a2a';
      card.style.borderRadius = '12px';
      card.style.padding = '18px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.transition = 'transform .18s, box-shadow .18s, border-color .18s';

      card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 10px 24px rgba(0,0,0,.45)';
        card.style.borderColor = '#353535';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '#2a2a2a';
      });

      // Ícone
      const iconDiv = document.createElement('div');
      iconDiv.className = 'icon mb-3';
      iconDiv.style.width = '50px';
      iconDiv.style.height = '50px';
      iconDiv.style.borderRadius = '50%';
      iconDiv.style.background = 'radial-gradient(circle at 30% 30%, #ffcf33, #d6a800 70%, #8a6b00 100%)';
      iconDiv.style.display = 'flex';
      iconDiv.style.alignItems = 'center';
      iconDiv.style.justifyContent = 'center';
      iconDiv.style.flex = '0 0 auto';
      iconDiv.style.marginBottom = '10px';
      iconDiv.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,.25), 0 3px 10px rgba(0,0,0,.25)';
      
      const iconEl = document.createElement('i');
      iconEl.className = `bi ${s.icon}`; 
      iconEl.setAttribute('aria-hidden','true');
      iconEl.style.fontSize = '24px';
      iconEl.style.color = '#ffcf33';
      iconDiv.appendChild(iconEl);

      // Título
      const h3 = document.createElement('h3');
      h3.innerText = s.title;
      h3.style.margin = '0 0 6px';
      h3.style.fontSize = '16px';
      h3.style.fontWeight = '700';
      h3.style.color = '#ffcf33';

      // Descrição
      const p = document.createElement('p');
      p.innerText = s.description;
      p.style.margin = '0 0 8px';
      p.style.color = '#d7d7d7';
      p.style.fontSize = '13px';

      // Lista de itens
      const ul = document.createElement('ul');
      ul.className = 'bullets';
      ul.style.listStyle = 'none';
      ul.style.padding = '0';
      ul.style.margin = '4px 0 0';
      s.items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        li.style.position = 'relative';
        li.style.paddingLeft = '14px';
        li.style.margin = '7px 0';
        li.style.color = '#d9d9d9';
        li.style.fontSize = '12.5px';
        // marcador personalizado
        const before = document.createElement('span');
        before.style.position = 'absolute';
        before.style.left = '0';
        before.style.top = '0.5em';
        before.style.width = '6px';
        before.style.height = '6px';
        before.style.background = '#d6a800';
        before.style.borderRadius = '1px';
        before.style.display = 'inline-block';
        li.appendChild(before);
        li.appendChild(document.createTextNode(item));
        ul.appendChild(li);
      });

      card.appendChild(iconDiv);
      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(ul);

      col.appendChild(card);
      grid.appendChild(col);
    });
  }

  document.addEventListener('DOMContentLoaded', renderServices);
})();