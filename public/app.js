const productsGrid = document.getElementById('products');
const wishlistGrid = document.getElementById('wishlist');
const statusEl = document.getElementById('status');

let currentProducts = [];

function renderProducts(products, savedIds) {
  productsGrid.innerHTML = products.map(p => {
    const saved = savedIds.has(p.id);
    return `
      <div class="card ${saved ? 'saved' : ''}">
        <button class="heart ${saved ? 'active' : ''}" data-id="${p.id}" aria-label="Save ${p.name}">&hearts;</button>
        <img src="${p.image}" alt="${p.name}">
        <div>${p.name}</div>
        <div class="price">₹${p.price}</div>
      </div>
    `;
  }).join('');
}

function renderWishlist(items) {
  if (!items.length) {
    wishlistGrid.innerHTML = '<p class="empty">Your wishlist is empty. Tap the heart on a product above to save it here.</p>';
    return;
  }
  wishlistGrid.innerHTML = items.map(p => `
    <div class="card saved">
      <button class="remove" data-id="${p.id}" aria-label="Remove ${p.name}">Remove</button>
      <img src="${p.image}" alt="${p.name}">
      <div>${p.name}</div>
      <div class="price">₹${p.price}</div>
    </div>
  `).join('');
}

async function loadProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function loadWishlist() {
  const res = await fetch('/api/wishlist');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = await res.json();
  renderWishlist(items);
  return items;
}

async function addToWishlist(productId) {
  const res = await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = await loadWishlist();
  renderProducts(currentProducts, new Set(items.map(p => p.id)));
}

async function removeFromWishlist(productId) {
  const res = await fetch(`/api/wishlist/${productId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = await loadWishlist();
  renderProducts(currentProducts, new Set(items.map(p => p.id)));
}

productsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.heart');
  if (!btn) return;
  const productId = Number(btn.dataset.id);
  btn.disabled = true;
  statusEl.textContent = '';
  addToWishlist(productId)
    .catch(() => {
      statusEl.textContent = 'Could not save that item. Try again.';
    })
    .finally(() => {
      btn.disabled = false;
    });
});

wishlistGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove');
  if (!btn) return;
  const productId = Number(btn.dataset.id);
  btn.disabled = true;
  statusEl.textContent = '';
  removeFromWishlist(productId)
    .catch(() => {
      statusEl.textContent = 'Could not remove that item. Try again.';
    })
    .finally(() => {
      btn.disabled = false;
    });
});

async function init() {
  try {
    currentProducts = await loadProducts();
    const items = await loadWishlist();
    renderProducts(currentProducts, new Set(items.map(p => p.id)));
  } catch (err) {
    productsGrid.textContent = 'Could not load products. Try refreshing.';
    wishlistGrid.textContent = '';
  }
}

init();
