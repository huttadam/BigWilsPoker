import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8888/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ l_name: loginName, password: password }),
      });
      console.log('response',response)
      if (!response.ok) {
        console.log(response)
        throw new Error('Failed to authenticate'); // Throw error if response is not ok
      }

      const data = await response.json();
      console.log('data', data)
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoading(false);
        onLogin({ token: data.token }); 
      } else {
        throw new Error('Failed to get token');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
