const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
