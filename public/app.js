const productsGrid = document.getElementById('products');
const wishlistGrid = document.getElementById('wishlist');
const statusEl = document.getElementById('status');

let currentProducts = [];
let wishlistIds = new Set();

function renderProducts(products) {
  productsGrid.innerHTML = products.map(p => {
    const saved = wishlistIds.has(p.id);
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
    wishlistGrid.innerHTML = '<p class="empty">Your wishlist is empty.</p>';
    return;
  }
  wishlistGrid.innerHTML = items.map(p => `
    <div class="card saved">
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
  wishlistIds = new Set(items.map(p => p.id));
  renderWishlist(items);
}

async function addToWishlist(productId) {
  const res = await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await loadWishlist();
  renderProducts(currentProducts);
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

async function init() {
  try {
    currentProducts = await loadProducts();
    await loadWishlist();
    renderProducts(currentProducts);
  } catch (err) {
    productsGrid.textContent = 'Could not load products. Try refreshing.';
  }
}

init();
