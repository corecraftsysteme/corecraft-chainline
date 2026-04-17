async function load(path) {
  const r = await fetch(path);
  return await r.json();
}

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

  function renderTab(tab) {
    tabs.forEach(t => t.classList.remove("active"));
    document.querySelector(`button[data-tab="${tab}"]`).classList.add("active");

    const items = data[tab][tab] || data[tab];

    content.innerHTML = items.map(item => `
      <div class="card">
        <h3>${item.name || item.id}</h3>
        <pre>${JSON.stringify(item, null, 2)}</pre>
      </div>
    `).join("");
  }

  function applySearch() {
    const q = search.value.toLowerCase();
    const active = document.querySelector("nav button.active").dataset.tab;
    const items = data[active][active] || data[active];

    const filtered = items.filter(i =>
      JSON.stringify(i).toLowerCase().includes(q)
    );

    content.innerHTML = filtered.map(item => `
      <div class="card">
        <h3>${item.name || item.id}</h3>
        <pre>${JSON.stringify(item, null, 2)}</pre>
      </div>
    `).join("");
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => renderTab(btn.dataset.tab));
  });

  search.addEventListener("input", applySearch);

  renderTab("districts");
}

init();
