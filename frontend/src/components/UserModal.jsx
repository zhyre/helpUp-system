import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable modal for adding/editing a user.
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - onSave: function(userData)
 * - initialData: user object (for edit) or empty (for add)
 * - loading: boolean
 * - mode: 'add' | 'edit'
 */
const UserModal = ({ isOpen, onClose, onSave, initialData, loading, mode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    role: 'donor',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const firstNameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        contactNumber: initialData?.contactNumber || '',
        password: '', // never prefill password
        role: initialData?.role || 'donor',
      });
      setErrors({});
      setTouched({});
      if (firstNameRef.current) firstNameRef.current.focus();
    }
  }, [isOpen, initialData]);

  const validate = (data = formData) => {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Invalid email';
    if (mode === 'add') {
      if (!data.password) newErrors.password = 'Password is required';
      else if (data.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...formData, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ firstName: true, lastName: true, email: true, password: true, contactNumber: true, role: true });
    if (Object.keys(validationErrors).length > 0) return;
    const submitData = { ...formData };
    if (mode === 'edit') delete submitData.password;
    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-[#624d41] mb-6">{mode === 'add' ? 'Add New User' : 'Edit User'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-[#624d41] font-medium mb-2">First Name</label>
              <input
                ref={firstNameRef}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] ${errors.firstName && touched.firstName ? 'border-red-400' : 'border-[#e9ecef]'}`}
                required
                disabled={loading}
              />
              {errors.firstName && touched.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] ${errors.lastName && touched.lastName ? 'border-red-400' : 'border-[#e9ecef]'}`}
                required
                disabled={loading}
              />
              {errors.lastName && touched.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] ${errors.email && touched.email ? 'border-red-400' : 'border-[#e9ecef]'}`}
                required
                disabled={loading}
              />
              {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                disabled={loading}
              />
            </div>
            {mode === 'add' && (
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] ${errors.password && touched.password ? 'border-red-400' : 'border-[#e9ecef]'}`}
                  required
                  disabled={loading}
                />
                {errors.password && touched.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            )}
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                disabled={loading}
              >
                <option value="donor">Donor</option>
                <option value="admin">Admin</option>
                <option value="organization">Organization</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (mode === 'add' ? 'Creating...' : 'Saving...') : (mode === 'add' ? 'Create User' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
