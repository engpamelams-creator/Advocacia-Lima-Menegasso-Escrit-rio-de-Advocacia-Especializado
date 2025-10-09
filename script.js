// ========================================
// SITE DATA CONFIGURATION (imutável)
// OBS: Você deve ter certeza de que este código está no topo do seu arquivo script.js
// ou que o objeto window.SITE_DATA no HTML acima foi carregado.
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
// DOM HOOKS & UTILS (Mantidos)
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

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

function formatPhone(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function smoothScrollTo(target, offset = 80) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    const behavior = prefersReducedMotion ? 'instant' : 'smooth';
    window.scrollTo({ top, behavior });
}

function generateWhatsAppLink(message = SITE_DATA.contact.whatsappMessage) {
    return `https://wa.me/${SITE_DATA.contact.phone}?text=${encodeURIComponent(message)}`;
}

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
// FORM CONTATO (Removido do HTML e centralizado aqui)
// ========================================
function initContactForm() {
    if (!contactForm) return;

    // Aplica formatação de telefone
    phoneInput?.addEventListener('input', (e) => { e.target.value = formatPhone(e.target.value); });

    // Lógica de Submissão do Formulário para WhatsApp
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const name = data.get('name')?.toString().trim();
        const email = data.get('email')?.toString().trim();
        const phone = data.get('phone')?.toString().trim();
        const message = data.get('message')?.toString().trim();

        if (!name || !email || !message) return alert('Por favor, preencha todos os campos obrigatórios.');
        if (!isValidEmail(email)) return alert('Por favor, insira um e-mail válido.');

        const numeroWhatsApp = '5511994194529'; // Número da Dra. Cida (Pode ser alterado conforme a preferência)
        const texto = `Olá! Gostaria de uma consulta.

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone || 'Não fornecido'}

*Mensagem:* ${message}`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank', 'noopener');

        contactForm.reset();
        alert('Mensagem enviada! Em breve entraremos em contato.');
    });
}

// ========================================
// LIGHTBOX (Implementação Única e Final)
// ========================================
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxModal = document.getElementById('lightboxModal');
    let zoomed = false;

    let bsModal = null;
    if (typeof bootstrap !== 'undefined' && lightboxModal) {
        try { bsModal = new bootstrap.Modal(lightboxModal); }
        catch (err) { console.warn('Bootstrap Modal não pôde ser inicializado:', err); }
    }

    if (!galleryItems.length || !lightboxImage || !lightboxModal) return;

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
                lightboxModal.classList.add('show');
                lightboxModal.style.display = 'block';
            }
        }, { passive: true });
    });

    if (lightboxImage) {
        lightboxImage.addEventListener('click', function (e) {
            e.preventDefault();
            zoomed = !zoomed;
            lightboxImage.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
            lightboxImage.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
        });
    }

    if (lightboxModal) {
        // Escuta o evento nativo do Bootstrap
        lightboxModal.addEventListener('hidden.bs.modal', function () {
            if (lightboxImage) {
                lightboxImage.src = '';
                lightboxImage.style.transform = 'scale(1)';
                lightboxImage.style.cursor = 'zoom-in';
            }
            zoomed = false;
        });

        // Fallback/fechamento manual se o Bootstrap falhar
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
}

// ========================================
// WHATSAPP FLOATING MENU (Implementação Única e Final)
// *Este bloco é o que faz o botão flutuante funcionar.*
// ========================================
(function initWhatsAppMenu() {
    const onReady = () => {
        const toggleButton = document.getElementById('whatsappToggle');
        const menuOptions = document.getElementById('whatsappOptions');

        if (!toggleButton || !menuOptions) {
            console.warn("Elemento 'whatsappToggle' ou 'whatsappOptions' não encontrado — botão flutuante desativado.");
            return;
        }

        // Estado inicial
        menuOptions.classList.remove('active');
        menuOptions.setAttribute('aria-hidden', 'true');
        toggleButton.setAttribute('aria-expanded', 'false');

        function setAria(expanded) {
            toggleButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            menuOptions.setAttribute('aria-hidden', expanded ? 'false' : 'true');
        }

        function toggleMenu(e) {
            e.stopPropagation();
            const active = menuOptions.classList.toggle('active');
            setAria(active);
        }

        toggleButton.addEventListener('click', toggleMenu, { passive: false });

        // Fecha ao clicar fora
        document.addEventListener('click', function (event) {
            const isClickInside = toggleButton.contains(event.target) || menuOptions.contains(event.target);
            if (!isClickInside && menuOptions.classList.contains('active')) {
                menuOptions.classList.remove('active');
                setAria(false);
            }
        }, { passive: true });

        // Fecha ao clicar em uma opção
        menuOptions.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menuOptions.classList.remove('active');
                setAria(false);
            });
        });

        // Fecha com ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menuOptions.classList.contains('active')) {
                menuOptions.classList.remove('active');
                setAria(false);
                toggleButton.focus();
            }
        });
    };
    
    // Garantir que a inicialização ocorra após o DOM estar pronto
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
    else onReady();
})();

// ========================================
// INICIALIZAÇÃO GERAL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa funcionalidades principais
    initSmoothScroll();
    initContactForm();
    initLightbox(); // Chamada da função Lightbox unificada
});

window.addEventListener('scroll', handleNavbarShrink);
window.addEventListener('load', handleNavbarShrink); // Para garantir o estado inicial

// ========================================
// LOGGING DE ERROS (Mantido)
// ========================================
window.addEventListener('error', (e) => console.error('Uncaught error:', e.error || e.message));
window.addEventListener('unhandledrejection', (e) => console.error('Unhandled promise rejection:', e.reason));