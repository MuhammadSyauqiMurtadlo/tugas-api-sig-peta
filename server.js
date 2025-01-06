// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route to get school data by city
app.get('/api/schools', async (req, res) => {
  try {
    const city = req.query.city;

    const query = `
            SELECT sekolah, lintang, bujur 
            FROM sekolah 
            WHERE kabupaten_kota LIKE ? 
            AND lintang != '' 
            AND bujur != ''
        `;

    const [results] = await db.execute(query, [`%${city}%`]);
    res.json(results);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat mengambil data sekolah',
      details: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Terjadi kesalahan pada server',
    details: err.message,
  });
});

// Running server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
