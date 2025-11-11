import React, { useState } from "react";
import "./Register.css";

const Register = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "DONOR",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });


      console.log("Response status:", response.status);
      console.log("Response:", response);

      if (response.ok) {
        alert("User registered successfully!");
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Registration failed:", errorText);
        alert("Failed to register. Please check your inputs. Error: " + errorText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="modal-title">Create your Account</h3>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>


          <button type="submit" className="submit-btn">Register</button>

          <div className="form-footer">
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Sign In</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
