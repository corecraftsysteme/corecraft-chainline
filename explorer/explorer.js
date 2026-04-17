async function loadJSON(path) {
  const r = await fetch(path);
  return await r.json();
}

async function initExplorer() {
  const root = await loadJSON("explorer.json");

  const districts = await loadJSON(root.districts);
  const products = await loadJSON(root.products);
  const registry = await loadJSON(root.registry);
  const chains = await loadJSON(root.chains);

  const el = document.getElementById("explorer");

  el.innerHTML = `
    <h2>Districts</h2>
    <pre>${JSON.stringify(districts, null, 2)}</pre>

    <h2>Products</h2>
    <pre>${JSON.stringify(products, null, 2)}</pre>

    <h2>Registry</h2>
    <pre>${JSON.stringify(registry, null, 2)}</pre>

    <h2>Chains</h2>
    <pre>${JSON.stringify(chains, null, 2)}</pre>
  `;
}

initExplorer();
