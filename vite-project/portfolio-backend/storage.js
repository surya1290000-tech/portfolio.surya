// storage.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

async function readProjects() {
  try {
    const pool = await getPool();
    const [rows] = await pool.execute('SELECT * FROM projects ORDER BY id');
    return rows;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

async function saveContact({ name, email, message }) {
  try {
    const pool = await getPool();
    const id = uuidv4();
    const [result] = await pool.execute(
      'INSERT INTO contacts (id, name, email, message) VALUES (?, ?, ?, ?)',
      [id, name, email, message]
    );
    return { id, name, email, message, receivedAt: new Date().toISOString() };
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
}

module.exports = {
  readProjects,
  saveContact
};
