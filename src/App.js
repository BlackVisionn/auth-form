import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setError('Некорректный email');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setError('');
    setMessage('');
    
    try {
      const response = await new Promise((resolve) => {        
        setTimeout(() => {
          resolve({
            json: () => ({
              success: email === 'test@example.com' && password === 'password123',
            }),
          });
        }, 1000);
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Аутентификация успешна!');
      } else {
        setError('Неверный email или пароль');
      }
    } catch (error) {
      setError('Ошибка сервера');
    }
  };

  return (
    <div className="auth-form">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Электронная почта:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default App;
