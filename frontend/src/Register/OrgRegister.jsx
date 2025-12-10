import React, { useState } from "react";

const OrgRegister = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        role: "ORGANIZATION",
        organization_name: "",
        organization_description: "",
        organization_address: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
        if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        if (!formData.organization_name.trim())
            newErrors.organization_name = "Organization name is required";
        if (!formData.organization_description.trim())
            newErrors.organization_description = "Organization description is required";
        if (!formData.organization_address.trim())
            newErrors.organization_address = "Organization address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
                setSuccessMessage("Organization registered successfully!");
                setTimeout(() => {
                    if (onRegisterSuccess) onRegisterSuccess();
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
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Register Organization
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="First name"
                            />
                            {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="Last name"
                            />
                            {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="Mobile number"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="Re-enter password"
                            />
                            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Organization Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <input
                                type="text"
                                name="organization_name"
                                value={formData.organization_name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600"
                                placeholder="Organization name"
                            />
                            {errors.organization_name && (
                                <p className="text-red-600 text-sm mt-1">{errors.organization_name}</p>
                            )}
                        </div>
                        <div>
                            <textarea
                                name="organization_description"
                                value={formData.organization_description}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600 resize-none"
                                placeholder="Describe your organization"
                                rows="3"
                            />
                            {errors.organization_description && (
                                <p className="text-red-600 text-sm mt-1">{errors.organization_description}</p>
                            )}
                        </div>
                        <div>
                            <textarea
                                name="organization_address"
                                value={formData.organization_address}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-red-600 resize-none"
                                placeholder="Organization address"
                                rows="2"
                            />
                            {errors.organization_address && (
                                <p className="text-red-600 text-sm mt-1">{errors.organization_address}</p>
                            )}
                        </div>
                    </div>
                </div>

                {errors.general && (
                    <p className="text-red-600 text-center mt-4">{errors.general}</p>
                )}
                {successMessage && (
                    <p className="text-green-600 text-center mt-4">{successMessage}</p>
                )}

                <button
                    type="submit"
                    className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing up..." : "Sign up"}
                </button>

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
        </>
    );
};

export default OrgRegister;
