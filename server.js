const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = [
  { id: 1, name: 'Cotton Kurta', price: 499, image: 'https://picsum.photos/seed/kurta/300' },
  { id: 2, name: 'Denim Jacket', price: 1299, image: 'https://picsum.photos/seed/jacket/300' },
  { id: 3, name: 'Running Shoes', price: 999, image: 'https://picsum.photos/seed/shoes/300' },
  { id: 4, name: 'Leather Wallet', price: 349, image: 'https://picsum.photos/seed/wallet/300' },
  { id: 5, name: 'Analog Watch', price: 799, image: 'https://picsum.photos/seed/watch/300' },
  { id: 6, name: 'Backpack', price: 899, image: 'https://picsum.photos/seed/backpack/300' },
  { id: 7, name: 'Sunglasses', price: 599, image: 'https://picsum.photos/seed/sunglasses/300' },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

const wishlist = []; // product_ids saved by the shopper

app.get('/api/wishlist', (req, res) => {
  const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);
  res.json(items);
});

app.post('/api/wishlist', (req, res) => {
  const { product_id } = req.body;
  const product = products.find(p => p.id === product_id);
  if (!product) {
    return res.status(400).json({ message: 'product_id is missing or unknown' });
  }

  // Adding a product already on the list is a no-op, not a duplicate: it
  // returns the existing entry with 200 instead of creating a second one.
  if (!wishlist.includes(product_id)) {
    wishlist.push(product_id);
    return res.status(201).json(product);
  }
  res.status(200).json(product);
});

app.delete('/api/wishlist/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = wishlist.indexOf(id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not in wishlist' });
  }
  wishlist.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
