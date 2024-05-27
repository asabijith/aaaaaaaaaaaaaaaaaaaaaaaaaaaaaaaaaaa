// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'abijith_user',
  host: 'dpg-cp9enh4f7o1s739vj3mg-a',
  database: 'abijith',
  password: 'TxDQXYYP8QL3q9lSZjsxbrgrd5BTKE3p',
  port: 5432, // Default PostgreSQL port
});

app.use(bodyParser.json());

// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
    const result = await pool.query(query, [username, hashedPassword]);
    res.status(200).json({ message: 'Sign-up successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sign-up failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});