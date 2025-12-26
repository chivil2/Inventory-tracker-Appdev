require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const itemsRoute = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 8000;

if (!process.env.MONGODB_URI) {
  console.warn('Warning: MONGODB_URI not set. Set MONGODB_URI in the environment to connect to a database.');
}

app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRoute);

app.use(express.static(path.join(__dirname, '..')));
app.get(/^(?!\/api).*/, (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

connectDB(process.env.MONGODB_URI || '');

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));