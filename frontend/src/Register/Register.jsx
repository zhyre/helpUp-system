import React, { useState } from "react";

const Register = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    role: "DONOR",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("User registered successfully!");
        setTimeout(() => {
          if (onRegisterSuccess) {
            onRegisterSuccess();
          }
        }, 1500);
      } else {
        setErrors({ general: "Registration failed." });
      }
    } catch {
      setErrors({ general: "Network error. Try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">

        {/* MODAL */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[95%] max-w-3xl relative">

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl"
          >
            &times;
          </button>

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Create your Account
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-4">

                {/* FIRST NAME */}
                <div>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                    placeholder="Enter first name"
                  />
                  {errors.first_name && (
                    <p className="text-red-600 text-sm">{errors.first_name}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
       
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-4">

                {/* LAST NAME */}
                <div>

                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                    placeholder="Enter last name"
                  />
                  {errors.last_name && (
                    <p className="text-red-600 text-sm">{errors.last_name}</p>
                  )}
                </div>

                {/* CONTACT NUMBER */}
                <div>

                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                    placeholder="Enter mobile number"
                  />
                </div>

                {/* ROLE SELECTION */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                  >
                    <option value="DONOR">Donor</option>
                    <option value="ORGANIZATION">Organization</option>
                  </select>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

              </div>
            </div>

            {/* GENERAL ERROR */}
            {errors.general && (
              <p className="text-red-600 text-center mt-4">{errors.general}</p>
            )}

            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <p className="text-green-600 text-center mt-4">{successMessage}</p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>

            {/* SWITCH TO LOGIN */}
            <p className="text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-red-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>

        </div>
      </div>
    </>
  );
};

export default Register;
