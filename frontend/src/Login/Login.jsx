import React, { useState } from "react";
import UserData, { useUser } from "../components/UserData";
import "./Login.css";

const Login = ({ onClose, onSwitchToRegister }) => {
  const { login } = UserData();
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
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        alert("Login successful! Welcome back.");
        onClose();
      } else {
        setError(result.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
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
          {error && (
            <div className="error-message" style={{
              color: '#e74c3c',
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

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

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="form-footer">
            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
