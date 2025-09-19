# Lima & Menegasso Advocacia - Website

Este é o site institucional do escritório de advocacia Lima & Menegasso, desenvolvido como uma landing page moderna e responsiva com foco em conversão e experiência do usuário.

## 🎯 Visão Geral

O site foi desenvolvido seguindo as melhores práticas de web design moderno, com uma identidade visual elegante baseada na paleta preta e dourada, transmitindo profissionalismo e sofisticação adequados para um escritório de advocacia.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização avançada com variáveis, Grid, Flexbox e animações
- **JavaScript (Vanilla)** - Funcionalidades interativas e dinâmicas
- **Bootstrap 5** - Framework responsivo para componentes e grid system
- **Bootstrap Icons** - Biblioteca de ícones
- **Google Fonts** - Tipografia (Playfair Display + Inter)

## 📁 Estrutura do Projeto

```
adv-lima-menegasso/
├── index.html          # Página principal (HTML5 semântico)
├── styles.css          # Estilos customizados (CSS3 avançado)
├── script.js           # Funcionalidades JavaScript
└── README.md           # Documentação do projeto
```

## 🎨 Paleta de Cores

- **Preto**: `#0B0B0B` - Fundo principal e contrastes
- **Antracito**: `#141414` - Áreas secundárias
- **Dourado**: `#C7A23A` - Elementos de destaque
- **Dourado Escuro**: `#9A7B22` - Estados hover
- **Cinza Suave**: `#B8B8B8` - Textos de apoio
- **Branco**: `#FFFFFF` - Textos principais

## 📱 Funcionalidades Principais

### Navegação
- Navbar responsiva com menu hambúrguer (mobile)
- Scroll suave entre seções com offset automático
- Destaque da seção ativa usando Intersection Observer
- Header que diminui ao fazer scroll

### Hero Section
- Carrossel com 3 slides em fullscreen
- Overlay com gradiente para melhor contraste
- CTAs otimizados para conversão (WhatsApp + Áreas de Atuação)
- Indicadores customizados

### Seções Principais
- **Sobre**: Missão, visão, valores e credenciais do escritório
- **Áreas de Atuação**: 8 especialidades com descrições detalhadas
- **Galeria**: Grid responsivo com lightbox modal
- **Depoimentos**: Cards de clientes com avaliações
- **FAQ**: Accordion com perguntas frequentes
- **Contato**: Formulário com validação + informações de contato
- **Mapa**: Google Maps incorporado

### Integração WhatsApp
- Links Click-to-Chat em múltiplos pontos
- Mensagens pré-formatadas para diferentes contextos
- Botões flutuantes laterais (desktop)

### Formulário de Contato
- Máscara automática para telefone
- Validação de e-mail em tempo real
- Integração com WhatsApp para envio de mensagens
- Campos flutuantes (floating labels)

## 🛠️ Como Editar o Conteúdo

### Dados do Escritório
Todos os dados principais estão centralizados no arquivo `script.js` no objeto `SITE_DATA`:

```javascript
const SITE_DATA = {
  contact: {
    phone: '5511999887766',              // Telefone (formato E164)
    email: 'contato@limamenegasso.adv.br', // E-mail principal
    address: 'Rua Augusta, 1230...',      // Endereço completo
    // ...
  },
  // ...
}
```

### Áreas de Atuação
Para adicionar/editar especialidades, modifique o array `services` em `SITE_DATA`:

```javascript
services: [
  {
    title: 'Nova Área',
    icon: 'bi-icon-name',    // Ícone do Bootstrap Icons
    description: 'Descrição da área',
    items: [
      'Serviço 1',
      'Serviço 2',
      'Serviço 3'
    ]
  }
]
```

### Depoimentos
Edite o array `testimonials` para modificar os depoimentos:

```javascript
testimonials: [
  {
    name: 'Nome do Cliente',
    text: 'Texto do depoimento...',
    stars: 5,
    avatar: 'URL_da_imagem'
  }
]
```

### Cores e Estilos
As cores principais estão definidas como variáveis CSS no `:root` do arquivo `styles.css`:

```css
:root {
  --color-primary: #0B0B0B;
  --color-gold: #C7A23A;
  /* ... */
}
```

## 🌐 Como Executar Localmente

1. **Clone ou baixe os arquivos** para uma pasta local

2. **Servidor HTTP Local** (recomendado):
   ```bash
   # Usando Python 3
   python -m http.server 8000
   
   # Usando Python 2
   python -m SimpleHTTPServer 8000
   
   # Usando Node.js (serve)
   npx serve .
   
   # Usando PHP
   php -S localhost:8000
   ```

3. **Acesse no navegador**: `http://localhost:8000`

### Alternativas Simples
- Extensão "Live Server" no VS Code
- Abrir diretamente o `index.html` (algumas funcionalidades podem não funcionar)

## 🚀 Como Publicar

### Vercel (Recomendado)
1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub ou faça upload dos arquivos
3. Deploy automático com URL personalizada

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch `main` como source
5. Seu site estará disponível em `username.github.io/repository-name`

### Netlify
1. Crie uma conta em [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para a área de deploy
3. Deploy automático com URL personalizada

### Hospedagem Tradicional
- Upload via FTP para qualquer servidor web
- Funciona em Apache, Nginx, IIS
- Não requer configurações especiais

## 🔧 Personalizações Avançadas

### Adicionar Nova Seção
1. Adicione o HTML da seção no `index.html`
2. Inclua o link na navbar
3. Adicione os estilos correspondentes no `styles.css`
4. Atualize o JavaScript se necessário

### Modificar Animações
As animações estão definidas em CSS usando `transition` e `@keyframes`. Para modificar:

```css
.elemento {
  transition: all var(--transition-fast); /* 200ms */
}
```

### Alterar Breakpoints Responsivos
Os breakpoints seguem o padrão Bootstrap:
- `576px` - Smartphones
- `768px` - Tablets  
- `992px` - Desktops pequenos
- `1200px` - Desktops grandes

## 📊 SEO e Performance

### Otimizações Implementadas
- Meta tags completas (Title, Description, Open Graph, Twitter Card)
- Dados estruturados JSON-LD para mecanismos de busca
- Imagens lazy loading para performance
- CSS e JavaScript minificados em produção
- Fontes otimizadas do Google Fonts

### Google Analytics
Para adicionar Analytics, inclua o script antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🎯 Otimizações de Conversão

### CTAs Estratégicos
- Botão WhatsApp em posição de destaque
- Multiple touchpoints ao longo da página
- Mensagens pré-formatadas para diferentes contextos

### Formulário Otimizado
- Campos mínimos necessários
- Validação em tempo real
- Redirecionamento automático para WhatsApp

### Social Proof
- Depoimentos com fotos e avaliações
- Credenciais e certificações em destaque
- Números de experiência e clientes atendidos

## 🛡️ Segurança e Boas Práticas

- Validação de formulários client-side e server-side
- Links externos com `rel="noopener noreferrer"`
- Headers de segurança implementados
- Sem dependências de terceiros desnecessárias

## 📞 Suporte Técnico

Para dúvidas sobre personalização ou manutenção do site:

1. Consulte esta documentação
2. Verifique os comentários no código
3. Teste mudanças em ambiente local primeiro
4. Mantenha backups antes de alterações importantes

---

**Desenvolvido com ❤️ para Lima & Menegasso Advocacia**

*Última atualização: Dezembro 2024*