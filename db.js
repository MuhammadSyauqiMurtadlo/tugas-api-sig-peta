// db.js
const mysql = require('mysql2');

// Konfigurasi database
const dbConfig = {
  host: 'localhost',
  user: 'root', // Sesuaikan dengan username database Anda
  password: '', // Sesuaikan dengan password database Anda
  database: 'sig-daftar-sekolah',
};

// Create pool connection
const pool = mysql.createPool(dbConfig);

// Create promise wrapper
const promisePool = pool.promise();

// Export pool for use in other files
module.exports = promisePool;
