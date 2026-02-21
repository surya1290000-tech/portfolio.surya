// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { readProjects, saveContact } = require('./storage');

const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: Date.now() }));

// Get projects (static or from storage)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readProjects();
    res.json({ success: true, projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to load projects' });
  }
});

// Contact form: expects { name, email, message }
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'name, email and message are required' });
  }
  try {
    const entry = await saveContact({ name, email, message });
    res.json({ success: true, entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to save contact' });
  }
});

// Serve built frontend optionally (if you want backend to serve static build)
// Uncomment the following if you build the frontend into ../vite-project/dist
// const path = require('path');
// app.use(express.static(path.join(__dirname, '..', 'vite-project', 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'vite-project', 'dist', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});
