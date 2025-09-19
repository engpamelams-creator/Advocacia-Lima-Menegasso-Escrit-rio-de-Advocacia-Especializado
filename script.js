// ========================================
// SITE DATA CONFIGURATION
// ========================================
const SITE_DATA = {
  contact: {
    phone: '5511994194529',
    email: 'cidamenegasso.77gmail.com  ',
    address: 'Rua Augusta, 1230 - Conjunto 45, São Paulo - SP',
    hours: 'Segunda a Sexta: 8h às 18h | Sábados: 9h às 13h',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta jurídica.'
  },
  
  social: {
    whatsapp: 'https://wa.me/5511994194529',
    instagram: 'https://www.instagram.com/lima.menegasso?igsh=dWZubTJ2MzVpbmpw',
    facebook: 'https://facebook.com/limamenegassoadvocacia',
    linkedin: 'https://linkedin.com/company/lima-menegasso'
  },
  
  services: [
    {
      title: 'Direito Civil',
      icon: 'bi-scale',
      description: 'Soluções completas para questões cíveis',
      items: [
        'Contratos e negociações',
        'Responsabilidade civil',
        'Direitos da personalidade'
      ]
    },
    {
      title: 'Direito de Família',
      icon: 'bi-heart',
      description: 'Orientação em questões familiares sensíveis',
      items: [
        'Divórcio e Dissolução de União Estável',
        'Guarda e pensão alimentícia',
        'Inventário e partilha'
      ]
    },
    {
      title: 'Direito Trabalhista',
      icon: 'bi-briefcase',
      description: 'Defesa dos direitos trabalhistas',
      items: [
        'Demissões irregulares',
        'Assédio moral e sexual',
        'Acordos trabalhistas'
      ]
    },
    {
      title: 'Direito Empresarial',
      icon: 'bi-building',
      description: 'Consultoria jurídica para empresas',
      items: [
        'Constituição de empresas',
        'Contratos comerciais',
        'Recuperação judicial'
      ]
    },
    {
      title: 'Direito do Consumidor',
      icon: 'bi-person-check',
      description: 'Proteção dos direitos do consumidor',
      items: [
        'Defeitos de produtos',
        'Cobranças indevidas',
        'Negativações irregulares'
      ]
    },
    {
      title: 'Direito Imobiliário',
      icon: 'bi-house',
      description: 'Assessoria em transações imobiliárias',
      items: [
        'Compra e venda de imóveis',
        'Contratos de locação',
        'Regularização fundiária'
      ]
    },
    {
      title: 'LGPD & Compliance',
      icon: 'bi-shield-check',
      description: 'Adequação à legislação de proteção de dados',
      items: [
        'Adequação à LGPD',
        'Políticas de privacidade',
        'Compliance corporativo'
      ]
    },
    {
      title: 'Consultoria Jurídica',
      icon: 'bi-chat-square-text',
      description: 'Orientação jurídica preventiva',
      items: [
        'Pareceres técnicos',
        'Consultoria preventiva',
        'Due diligence'
      ]
    }
  ],
  
  testimonials: [
    {
      name: 'Maria Silva',
      text: 'Profissionais excepcionais! Resolveram meu caso de divórcio com muita competência e sensibilidade. Recomendo fortemente.',
      stars: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&auto=compress'
    },
    {
      name: 'João Santos',
      text: 'Excelente atendimento na questão trabalhista. Conseguiram todos os direitos que eu tinha. Muito profissionais e éticos.',
      stars: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&auto=compress'
    },
    {
      name: 'Ana Costa',
      text: 'Atendimento personalizado e resultado excelente no meu caso empresarial. Equipe muito preparada e atualizada.',
      stars: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&auto=compress'
    },
    {
      name: 'Carlos Oliveira',
      text: 'Consultoria jurídica de alta qualidade. Muito satisfeito com o atendimento e os resultados obtidos em meu processo.',
      stars: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&auto=compress'
    }
  ]
};

// ========================================
// DOM ELEMENTS
// ========================================
const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contactForm');
const phoneInput = document.getElementById('phone');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Phone mask formatting
function formatPhone(value) {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Smooth scroll with offset
function smoothScrollTo(target, offset = 80) {
  const element = document.querySelector(target);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Generate WhatsApp link
function generateWhatsAppLink(message = SITE_DATA.contact.whatsappMessage) {
  return `https://wa.me/${SITE_DATA.contact.phone}?text=${encodeURIComponent(message)}`;
}

// ========================================
// NAVBAR FUNCTIONALITY
// ========================================

// Header shrink on scroll
function handleNavbarShrink() {
  if (window.scrollY > 100) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
}

// Active section highlighting
function updateActiveNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Navigation link smooth scroll
function initSmoothScroll() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScrollTo(target);
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });
}

// ========================================
// SERVICES SECTION
// ========================================
function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  if (!servicesGrid) return;
  
  servicesGrid.innerHTML = SITE_DATA.services.map(service => `
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="service-card">
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        <h4>${service.title}</h4>
        <p class="text-light mb-3">${service.description}</p>
        <ul class="list-unstyled">
          ${service.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// ========================================
// TESTIMONIALS SECTION
// ========================================
function renderTestimonials() {
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (!testimonialsGrid) return;
  
  testimonialsGrid.innerHTML = SITE_DATA.testimonials.map(testimonial => `
    <div class="col-lg-6 mb-4">
      <div class="testimonial-card">
        <div class="d-flex align-items-center mb-3">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar me-3">
          <div>
            <h5 class="testimonial-author mb-1">${testimonial.name}</h5>
            <div class="testimonial-stars">
              ${'★'.repeat(testimonial.stars)}
            </div>
          </div>
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
      </div>
    </div>
  `).join('');
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
  if (!contactForm) return;
  
  // Phone input masking
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      e.target.value = formatPhone(e.target.value);
    });
  }
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `
*Nova mensagem do site*

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}

*Mensagem:*
${message}
    `.trim();
    
    // Open WhatsApp
    window.open(generateWhatsAppLink(whatsappMessage), '_blank');
    
    // Reset form
    this.reset();
    alert('Mensagem enviada! Em breve entraremos em contato.');
  });
}

// ========================================
// GALLERY LIGHTBOX
// ========================================
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imageSrc = this.getAttribute('data-image');
      if (lightboxImage && imageSrc) {
        lightboxImage.src = imageSrc;
      }
    });
  });
}

// ========================================
// WHATSAPP INTEGRATION
// ========================================
function initWhatsAppLinks() {
  // Main CTA buttons
  const whatsappCTA = document.getElementById('whatsappCTA');
  const scheduleConsultation = document.getElementById('scheduleConsultation');
  const whatsappFloat = document.getElementById('whatsappFloat');
  const whatsappFooterLink = document.getElementById('whatsappFooterLink');
  
  // Set WhatsApp links
  [whatsappCTA, scheduleConsultation, whatsappFloat, whatsappFooterLink].forEach(element => {
    if (element) {
      element.href = generateWhatsAppLink();
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    }
  });
  
  // Social media links
  const socialLinks = {
    instagramFloat: SITE_DATA.social.instagram,
    instagramFooterLink: SITE_DATA.social.instagram,
    facebookLink: SITE_DATA.social.facebook,
    linkedinLink: SITE_DATA.social.linkedin
  };
  
  Object.entries(socialLinks).forEach(([id, url]) => {
    const element = document.getElementById(id);
    if (element) {
      element.href = url;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    }
  });
}

// ========================================
// INTERSECTION OBSERVER
// ========================================
function initIntersectionObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '-50px 0px -50px 0px',
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ========================================
// IMAGE LAZY LOADING
// ========================================
function initImageLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.addEventListener('load', function() {
            this.classList.add('loaded');
          });
          if (img.complete) {
            img.classList.add('loaded');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

// ========================================
// HERO CAROUSEL ENHANCEMENTS
// ========================================
function initHeroCarousel() {
  // Add smooth scroll to hero CTA buttons
  const heroCtaButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
  
  heroCtaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
      }
    });
  });
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for frequent events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// EVENT LISTENERS
// ========================================
function initEventListeners() {
  // Scroll events (debounced for performance)
  window.addEventListener('scroll', debounce(handleNavbarShrink, 10));
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
  
  // Resize events
  window.addEventListener('resize', debounce(function() {
    // Handle any responsive adjustments
    updateActiveNavLink();
  }, 250));
  
  // Prevent default for all anchor links starting with #
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target && !target.hasAttribute('data-bs-toggle')) {
      e.preventDefault();
      const targetId = target.getAttribute('href');
      smoothScrollTo(targetId);
    }
  });
}

// ========================================
// INITIALIZATION
// ========================================
function init() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }
  
  try {
    // Initialize all components
    initSmoothScroll();
    initContactForm();
    initLightbox();
    initWhatsAppLinks();
    initIntersectionObserver();
    initImageLazyLoading();
    initHeroCarousel();
    initEventListeners();
    
    // Render dynamic content
    renderServices();
    renderTestimonials();
    
    // Set initial active state
    updateActiveNavLink();
    
    console.log('🎯 Lima & Menegasso website initialized successfully');
    
  } catch (error) {
    console.error('❌ Error initializing website:', error);
  }
}

// ========================================
// START THE APPLICATION
// ========================================
init();

// ========================================
// ADDITIONAL FEATURES
// ========================================

// Add to window object for external access (useful for debugging)
window.LIMA_MENEGASSO = {
  SITE_DATA,
  smoothScrollTo,
  generateWhatsAppLink,
  formatPhone,
  isValidEmail
};

// Service Worker registration (if needed in the future)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js')
    //   .then(function(registration) {
    //     console.log('SW registered: ', registration);
    //   })
    //   .catch(function(registrationError) {
    //     console.log('SW registration failed: ', registrationError);
    //   });
  });
}

// Error handling for uncaught errors
window.addEventListener('error', function(e) {
  console.error('Uncaught error:', e.error);
  // Could send to analytics or error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  // Could send to analytics or error tracking service
});

