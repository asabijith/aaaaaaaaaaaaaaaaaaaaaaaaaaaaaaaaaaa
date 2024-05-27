// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/signup', { username, password });
      alert('Sign-up successful');
    } catch (err) {
      alert('Sign-up failed');
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/login', { username, password });
      setIsLoggedIn(true);
    } catch (err) {
      alert('Invalid username or password');
      console.error(err);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>

          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Welcome!</h2>
          <img src="path/to/your/image.jpg" alt="Your Image" />
        </div>
      )}
    </div>
  );
};

export default App;