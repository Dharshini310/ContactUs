const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'contactus',
  port: process.env.DB_PORT || 3306,
});


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Contact Us API');
});

app.post('/api/contact', async (req, res) => {
  const { email, suggestions } = req.body;

  // Validation
  if (!email || !suggestions) {
    return res.status(400).json({ error: 'Email and suggestions are required' });
  }

  try {
    const [result] = await pool.query('INSERT INTO feedback (email, suggestions) VALUES (?, ?)', [email, suggestions]);
    res.status(201).json({ message: 'Feedback submitted', data: { id: result.insertId, email, suggestions } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown (optional)
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('MySQL pool closed.');
    process.exit(0);
  });
});
