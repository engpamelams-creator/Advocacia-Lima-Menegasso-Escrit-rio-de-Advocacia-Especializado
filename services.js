/* Lê dados de window.SITE_DATA.services e renderiza a grade de cards */

(function () {
  window.SITE_DATA = window.SITE_DATA || {};

  // Fallback: descomente se quiser garantir serviços mesmo sem outro arquivo
  /*
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
  */

  const emojiByTitle = {
    'Direito Civil': '⚖️',
    'Direito de Família': '❤️',
    'Direito Trabalhista': '💼',
    'Direito Empresarial': '🏢',
    'Direito do Consumidor': '🛡️',
    'Direito Imobiliário': '🏠',
    'LGPD & Compliance': '🔐',
    'Consultoria Jurídica': '💬'
  };

  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const services = (window.SITE_DATA && window.SITE_DATA.services) || [];
    if (!Array.isArray(services) || services.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-light-50">Sem serviços cadastrados.</div>';
      return;
    }

    grid.classList.add('grid');

    grid.innerHTML = services.map(s => {
      const useBootstrapIcon = typeof s.icon === 'string' && s.icon.startsWith('bi-');
      const iconEl = useBootstrapIcon
        ? `<i class="bi ${s.icon}" aria-hidden="true" style="font-size:18px"></i>`
        : `<span>${emojiByTitle[s.title] || '⚖️'}</span>`;

      const bullets = (s.items || []).map(i => `<li>${i}</li>`).join('');

      return `
        <article class="card">
          <div class="icon" aria-hidden="true">${iconEl}</div>
          <h3>${s.title || ''}</h3>
          <p>${s.description || ''}</p>
          <ul class="bullets">${bullets}</ul>
        </article>
      `;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { renderServices(); }
    catch (e) {
      console.error('Erro ao renderizar serviços:', e);
      const grid = document.getElementById('servicesGrid');
      if (grid) grid.innerHTML = '<div class="col-12 text-center text-danger">Falha ao carregar a seção.</div>';
    }
  });
})();