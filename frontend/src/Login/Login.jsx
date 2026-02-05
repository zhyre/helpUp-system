import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = ({ onClose, onSwitchToRegister, onLogin }) => {
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Login successful:', user);
        authLogin(user);
        onClose();
        if (onLogin) {
          onLogin(user);
        }
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Login failed.");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Network error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="modal-title">Welcome Back</h3>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="form-footer">
            <p>Don't have an account? <a href="#signup" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
