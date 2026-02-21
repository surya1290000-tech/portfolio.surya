// setup-db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  try {
    // Connect without database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    // Create database if not exists
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    console.log('Database created or already exists');

    // Switch to the database
    await connection.changeUser({ database: process.env.DB_NAME });

    // Create projects table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        repo VARCHAR(500)
      )
    `);
    console.log('Projects table created');

    // Create contacts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Contacts table created');

    // Insert default projects if table is empty
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    if (rows[0].count === 0) {
      await connection.execute(`
        INSERT INTO projects (id, title, description, url, repo) VALUES
        ('proj-1', 'Portfolio (Vite + React)', 'Personal portfolio built with Vite and React', 'https://your-site.example', 'https://github.com/yourname/portfolio'),
        ('proj-2', 'Another Project', 'Short description', '', '')
      `);
      console.log('Default projects inserted');
    }

    await connection.end();
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();