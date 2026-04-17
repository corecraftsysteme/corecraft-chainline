async function load(path) {
  const r = await fetch(path);
  return await r.json();
}

/* ------------------------------
   Dashboard HTML
------------------------------ */
const dashboardHTML = `
<div id="dashboard">

  <section class="dash-row">
    <div class="dash-card metric">
      <h3>Active Districts</h3>
      <div class="metric-value" id="metric-districts">0</div>
    </div>

    <div class="dash-card metric">
      <h3>Active Products</h3>
      <div class="metric-value" id="metric-products">0</div>
    </div>

    <div class="dash-card metric">
      <h3>Registry Entries</h3>
      <div class="metric-value" id="metric-registry">0</div>
    </div>
  </section>

  <section class="dash-row">
    <div class="dash-card status">
      <h3>System Status</h3>
      <div id="status-system" class="status-indicator ok">OK</div>
    </div>

    <div class="dash-card status">
      <h3>Chain Health</h3>
      <div id="status-chain" class="status-indicator ok">OK</div>
    </div>
  </section>

  <section class="dash-row">
    <div class="dash-card version">
      <h3>Explorer Version</h3>
      <div class="version-value">1.0.0</div>
    </div>

    <div class="dash-card version">
      <h3>Genesis Engine</h3>
      <div class="version-value" id="version-engine">n/a</div>
    </div>
  </section>

</div>
`;

/* ------------------------------
   Chain Graph HTML
------------------------------ */
const chainGraphHTML = `
<div id="chain-graph">
  <h2>Chain Health Graph</h2>

  <div class="graph-row">
    <div class="graph-block" id="graph-master"></div>
    <div class="graph-arrow">→</div>
    <div class="graph-block" id="graph-districts"></div>
    <div class="graph-arrow">→</div>
    <div class="graph-block" id="graph-products"></div>
  </div>
</div>
`;

/* ------------------------------
   INIT
------------------------------ */
async function init() {
  const root = await load("explorer.json");

  const data = {
    districts: await load(root.districts),
    products: await load(root.products),
    registry: await load(root.registry),
    chains: await load(root.chains)
  };

  const content = document.getElementById("content");
  const search = document.getElementById("search");
  const tabs = document.querySelectorAll("nav button");

  /* ------------------------------
     RENDER TAB
  ------------------------------ */
  function renderTab(tab) {
    tabs.forEach(t => t.classList.remove("active"));
    document.querySelector(`button[data-tab="${tab}"]`).classList.add("active");

    /* Chain Graph */
    if (tab === "chain-graph") {
      content.innerHTML = chainGraphHTML;
      renderChainGraph(data.chains);
      return;
    }

    /* Dashboard */
    if (tab === "dashboard") {
      content.innerHTML = dashboardHTML;
      loadDashboard(data);
      return;
    }

    /* Standard Tabs */
    const items = data[tab][tab] || data[tab];

    content.innerHTML = items.map(item => `
      <div class="card" data-id="${item.id}">
        <h3>${item.name || item.id}</h3>
        <pre>${JSON.stringify(item, null, 2)}</pre>
      </div>
    `).join("");

    /* Card → Detail */
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () =>
        renderDetail(tab, card.dataset.id)
      );
    });
  }

  /* ------------------------------
     DETAIL VIEW
  ------------------------------ */
  function renderDetail(tab, id) {
    const items = data[tab][tab] || data[tab];
    const item = items.find(i => i.id === id);

    content.innerHTML = `
      <button class="back-btn">← Back</button>

      <div class="detail">
        <h2>${item.name || item.id}</h2>
        <pre>${JSON.stringify(item, null, 2)}</pre>
      </div>
    `;

    document.querySelector(".back-btn").onclick = () => renderTab(tab);
  }

  /* ------------------------------
     SEARCH
  ------------------------------ */
  function applySearch() {
    const q = search.value.toLowerCase();
    const active = document.querySelector("nav button.active").dataset.tab;

    if (active === "dashboard" || active === "chain-graph") return;

    const items = data[active][active] || data[active];

    const filtered = items.filter(i =>
      JSON.stringify(i).toLowerCase().includes(q)
    );

    content.innerHTML = filtered.map(item => `
      <div class="card" data-id="${item.id}">
        <h3>${item.name || item.id}</h3>
        <pre>${JSON.stringify(item, null, 2)}</pre>
      </div>
    `).join("");

    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () =>
        renderDetail(active, card.dataset.id)
      );
    });
  }

  /* ------------------------------
     EVENT LISTENERS
  ------------------------------ */
  tabs.forEach(btn => {
    btn.addEventListener("click", () => renderTab(btn.dataset.tab));
  });

  search.addEventListener("input", applySearch);

  /* ------------------------------
     DEFAULT TAB
  ------------------------------ */
  renderTab("dashboard");

  /* ------------------------------
     AUTO REFRESH DASHBOARD
  ------------------------------ */
  setInterval(() => {
    const active = document.querySelector("nav button.active").dataset.tab;
    if (active === "dashboard") loadDashboard(data);
  }, 5000);
}

init();

/* ------------------------------
   DASHBOARD LOADER
------------------------------ */
async function loadDashboard(data) {
  document.getElementById("metric-districts").textContent =
    data.districts.districts.length;

  document.getElementById("metric-products").textContent =
    data.products.products.length;

  document.getElementById("metric-registry").textContent =
    data.registry.registry.entries.length;

  const chainOK = data.chains.chains.master.entries.length >= 0;
  document.getElementById("status-chain").className =
    "status-indicator " + (chainOK ? "ok" : "err");
  document.getElementById("status-chain").textContent =
    chainOK ? "OK" : "ERROR";

  document.getElementById("version-engine").textContent =
    data.products.products.find(p => p.id === "enginecore")?.version || "n/a";
}

/* ------------------------------
   CHAIN GRAPH RENDERER
------------------------------ */
function renderChainGraph(chains) {
  document.getElementById("graph-master").innerHTML = `
    <h3>Master Chain</h3>
    <p>${chains.chains.master.entries.length} entries</p>
  `;

  document.getElementById("graph-districts").innerHTML = `
    <h3>District Chain</h3>
    <p>${chains.chains.districts.districts.length} districts</p>
  `;

  document.getElementById("graph-products").innerHTML = `
    <h3>Product Chain</h3>
    <p>${chains.chains.products.products.length} products</p>
  `;
}

