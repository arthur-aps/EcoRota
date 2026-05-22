const ECOPONTOS = [
  {
    id: 1,
    nome: "Ecoponto Canto do Forte",
    endereco: "Rua Xixová, s/n - Canto do Forte, Praia Grande - SP, 11700-430",
    horario: "Seg–Sex: 8h–17h | Sáb e Dom: 9h–14h",
    telefone: "(13) 3495-1527",
    lat: -24.004585412873343,
    lng: -46.40057882731924,
    materiais: ["metais", "pilhas", "oleo", "eletronicos", "vidros", "plastico"]
  },
  {
    id: 2,
    nome: "Ecoponto Boqueirão",
    endereco: "R. Guanabara - Boqueirão, Praia Grande - SP, 11700-030",
    horario: "Seg–Sex: 8h–17h | Sáb: 9h–15h",
    telefone: "(13) 3496-2000",
    lat: -24.004602926553808,
    lng: -46.41253633765659,
    materiais: ["metais", "pilhas", "oleo", "plastico", "cartuchos"]
  },
  {
    id: 3,
    nome: "Ecoponto Sítio do Campo",
    endereco: "R. Saturnino de Brito - Sítio do Campo, Praia Grande - SP, 11725-160",
    horario: "Seg–Sex: 8h–17h | Sáb: 9h–14h",
    telefone: "(13) 3496-2000",
    lat: -24.001591985673716,
    lng: -46.428740382202506,
    materiais: ["metais", "pilhas", "plastico", "vidros", "oleo"]
  },
  {
    id: 4,
    nome: "Ecoponto Aviação",
    endereco: "R. José Alves Maciel - Aviação, Praia Grande - SP, 11702-440",
    horario: "Seg-Sex: 8h–17h | Sáb e Dom: 8h–14h",
    telefone: "(13) 3496-2000",
    lat: -24.0133616921888, 
    lng: -46.43947735023707,
    materiais: ["metais", "plastico", "eletronicos", "vidros", "cartuchos"]
  },
  {
    id: 5,
    nome: "Ecoponto Vila Sônia",
    endereco: "R. Arnaldo Augusto Baptista - Vila Sonia, Praia Grande - SP, 11722-005",
    horario: "Seg–Sex: 8h–18h",
    telefone: "(13) 3496-2000",
    lat: -24.00387360513702, 
    lng: -46.44774059948937,
    materiais: ["metais", "pilhas", "oleo", "eletronicos", "vidros", "plastico"]
  },
  {
    id: 6,
    nome: "Droga Raia - Av. Mal. Mallet",
    endereco: "Av. Mal. Mallet, 669 - Jardim Mathilde, Praia Grande - SP, 11700-400",
    horario: "Aberto 24h",
    telefone: "(13) 99714-5834",
    lat: -24.011254059136185, 
    lng: -46.40302682755027,
    materiais: ["remedios"]
  },
  {
    id: 7,
    nome: "Drogaria São Paulo - Av. Mal. Mallet",
    endereco: "Av. Mal. Mallet, 1097 - Canto do Forte, Praia Grande - SP, 11700-405",
    horario: "Aberto 24h",
    telefone: "(13) 3473-3445",
    lat: -24.00810301634711, 
    lng: -46.40585725388993,
    materiais: ["remedios"]
  },
  {
    id: 8,
    nome: "Farma Conde - Loja 189",
    endereco: "Av. Pres. Costa e Silva, 520 - Boqueirão, Praia Grande - SP, 11700-005",
    horario: "Todos os dias: 7h–23h",
    telefone: "(13) 3213-5375",
    lat: -24.00868492460601, 
    lng: -46.41369351366501,
    materiais: ["remedios"]
  },
  {
    id: 9,
    nome: "Drogaria São Paulo - Av. Pres. Kennedy",
    endereco: "Av. Pres. Kennedy, 5360 - Vila Tupi, Praia Grande - SP, 11703-200",
    horario: "Aberto 24h",
    telefone: "(13) 99697-9409",
    lat: -24.018371611244106, 
    lng: -46.459597664297384,
    materiais: ["remedios"]
  },
  {
    id: 10,
    nome: "Droga Raia - R. Evaristo Paraizo",
    endereco: "R. Evaristo Paraizo, 09 - Vila Antartica, Praia Grande - SP, 11721-240",
    horario: "Todos os dias: 7h–23h",
    telefone: "(13) 99645-8572",
    lat: -24.00629843398978, 
    lng: -46.4444831416049,
    materiais: ["remedios"]
  }
];

// =============================================
// CATEGORIAS
// =============================================
const CATEGORIAS = [
  { id: "pilhas",      emoji: "bi-battery-half", nome: "Pilhas e Baterias" },
  { id: "eletronicos", emoji: "bi-phone", nome: "Eletrônicos" },
  { id: "oleo",        emoji: "bi-droplet", nome: "Óleo de Cozinha" },
  { id: "remedios",    emoji: "bi-capsule", nome: "Remédios Vencidos" },
  { id: "vidros",      emoji: "bi-layout-wtf", nome: "Vidros" },
  { id: "cartuchos",   emoji: "bi-printer", nome: "Cartuchos de Tinta" },
  { id: "plastico",    emoji: "bi-recycle", nome: "Plástico" },
  { id: "metais",      emoji: "bi-gear", nome: "Metais" }
];

// =============================================
// ESTADO DA APLICAÇÃO
// =============================================
let categoriaAtiva = null;
let marcadoresMapa = [];
let cardSelecionado = null;

// =============================================
// INICIALIZA MAPA
// =============================================
const mapa = L.map('mapa').setView([-24.008, -46.415], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(mapa);

// Ícone customizado verde
function criarIcone(destaque = false) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 36px; height: 36px;
      background: ${destaque ? '#2ecc71' : '#1a7a4a'};
      border: 3px solid ${destaque ? '#0f4d2e' : '#2ecc71'};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
}

// =============================================
// RENDERIZA CATEGORIAS
// =============================================
function renderCategorias() {
  const grid = document.getElementById('categoriasGrid');
  grid.innerHTML = '';
  CATEGORIAS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (categoriaAtiva === cat.id ? ' ativo' : '');
    btn.innerHTML = `<i class="emoji bi ${cat.emoji}"></i><span class="nome">${cat.nome}</span>`;
    btn.onclick = () => selecionarCategoria(cat.id);
    grid.appendChild(btn);
  });
}

// =============================================
// LÓGICA PRINCIPAL — FILTRO POR MATERIAL
// =============================================
function selecionarCategoria(id) {
  // Se a categoria clicada já está ativa, desativa (toggle)
  if (categoriaAtiva === id) {
    categoriaAtiva = null;
    limparMapa();
    renderCategorias();
    document.getElementById('resultados').innerHTML = `
      <div class="estado-vazio">
        <i class="bi bi-globe-americas"></i>
        <p>Selecione uma categoria acima para ver os ecopontos disponíveis.</p>
      </div>`;
    return;
  }

  // Senão, ativa a categoria selecionada
  categoriaAtiva = id;
  renderCategorias();

  // Filtro: quais ecopontos aceitam este material?
  const pontos = ECOPONTOS.filter(ep => ep.materiais.includes(id));

  renderResultados(pontos, id);
  renderMarcadores(pontos, id);
}

// =============================================
// RENDERIZA LISTA LATERAL
// =============================================
function renderResultados(pontos, materialId) {
  const container = document.getElementById('resultados');
  const cat = CATEGORIAS.find(c => c.id === materialId);

  if (pontos.length === 0) {
    container.innerHTML = `
      <div class="estado-vazio">
        <i class="bi emoji-frown"></i>
        <p>Nenhum ecoponto cadastrado para ${cat.nome} ainda.</p>
      </div>`;
    return;
  }

  let html = `
    <div class="contador">
      <i class="bi ${cat.emoji}"></i>
      ${pontos.length} ponto${pontos.length > 1 ? 's' : ''} encontrado${pontos.length > 1 ? 's' : ''}
    </div>`;

  pontos.forEach(ep => {
    const tags = ep.materiais.map(m => {
      const c = CATEGORIAS.find(x => x.id === m);
      const destaque = m === materialId;
      return `<span class="tag ${destaque ? 'destaque' : ''}">${c ? `<i class="bi ${c.emoji}"></i> ` + c.nome : m}</span>`;
    }).join('');

    html += `
      <div class="card" id="card-${ep.id}" onclick="focarPonto(${ep.id})">
        <div class="card-nome">${ep.nome}</div>
        <div class="card-info">
          <span><i class="bi bi-geo-alt-fill"></i> ${ep.endereco}</span>
          <span><i class="bi bi-clock-fill"></i> ${ep.horario}</span> 
          <span><i class="bi bi-telephone-fill"></i> ${ep.telefone}</span>
          </div>
        <div class="card-tags">${tags}</div>
      </div>`;
  });

  container.innerHTML = html;
}

// =============================================
// RENDERIZA MARCADORES NO MAPA
// =============================================
function renderMarcadores(pontos, materialId) {
  limparMapa();

  const bounds = [];

  pontos.forEach(ep => {
    const marker = L.marker([ep.lat, ep.lng], { icon: criarIcone(false) })
      .addTo(mapa);

    const cat = CATEGORIAS.find(c => c.id === materialId);
    const tagsPopup = ep.materiais.map(m => {
      const c = CATEGORIAS.find(x => x.id === m);
      return `<span class="popup-tag">${c ? `<i class="bi ${c.emoji}"></i> ` + c.nome : m}</span>`;
    }).join('');

    marker.bindPopup(`
      <div class="popup-inner">
        <div class="popup-nome">${ep.nome}</div>
        <div class="popup-linha"><i class="bi bi-geo-alt-fill"></i> ${ep.endereco}</div>
        <div class="popup-linha"><i class="bi bi-clock-fill"></i> ${ep.horario}</div>
        <div class="popup-linha"><i class="bi bi-telephone-fill"></i> ${ep.telefone}</div>
        <div class="popup-materiais">${tagsPopup}</div>
      </div>
    `, { maxWidth: 280 });

    marker.on('click', () => destacarCard(ep.id));
    marcadoresMapa.push({ id: ep.id, marker });
    bounds.push([ep.lat, ep.lng]);
  });

  if (bounds.length > 0) {
    mapa.fitBounds(bounds, { padding: [40, 40] });
  }
}

// =============================================
// FOCAR PONTO (card → mapa)
// =============================================
function focarPonto(id) {
  const obj = marcadoresMapa.find(m => m.id === id);
  if (!obj) return;

  mapa.setView(obj.marker.getLatLng(), 16, { animate: true });
  obj.marker.openPopup();
  destacarCard(id);
}

function destacarCard(id) {
  // Remove seleção anterior
  if (cardSelecionado) {
    const anterior = document.getElementById(`card-${cardSelecionado}`);
    if (anterior) anterior.classList.remove('selecionado');
  }
  // Seleciona novo
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.classList.add('selecionado');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  cardSelecionado = id;
}

// =============================================
// LIMPAR MAPA
// =============================================
function limparMapa() {
  marcadoresMapa.forEach(({ marker }) => mapa.removeLayer(marker));
  marcadoresMapa = [];
}

// =============================================
// DARK MODE TOGGLE
// =============================================
if (localStorage.getItem('dark') === 'true') {
  document.body.classList.add('dark');
}

document.querySelector('.toggle-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('dark', document.body.classList.contains('dark'));
});

// =============================================
// INIT
// =============================================
renderCategorias();