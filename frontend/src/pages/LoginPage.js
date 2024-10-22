import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard
            history.push('/');
        } catch (error) {
            console.error('Login error', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
    );
}

export default LoginPage;
