import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable modal for adding/editing an organization.
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - onSave: function(organizationData)
 * - initialData: organization object (for edit) or empty (for add)
 * - loading: boolean
 * - mode: 'add' | 'edit'
 */
const OrganizationModal = ({ isOpen, onClose, onSave, initialData, loading, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactDetails: '',
    eligibilityProof: '',
    approvalStatus: 'pending',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const newFormData = {
        name: initialData?.name || '',
        contactDetails: initialData?.contactDetails || '',
        eligibilityProof: initialData?.eligibilityProof || '',
        approvalStatus: initialData?.approvalStatus || 'pending',
      };
      console.log('Modal opened. initialData:', initialData, 'newFormData:', newFormData);
      setFormData(newFormData);
      setErrors({});
      setTouched({});
      if (nameRef.current) nameRef.current.focus();
    }
  }, [isOpen, initialData]);

  const validate = (data = formData) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Organization name is required';
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
    setTouched({ name: true, contactDetails: true, eligibilityProof: true, approvalStatus: true });
    if (Object.keys(validationErrors).length > 0) return;
    console.log('Submitting formData:', formData);
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#624d41]">{mode === 'add' ? 'Add New Organization' : 'Edit Organization'}</h3>
          <button
            onClick={onClose}
            className="text-[#b6b1b2] hover:text-[#624d41] transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Organization Name</label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] ${errors.name && touched.name ? 'border-red-400' : 'border-[#e9ecef]'}`}
                placeholder="Enter organization name"
                required
                disabled={loading}
              />
              {errors.name && touched.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Contact Details</label>
              <input
                type="text"
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                placeholder="Enter contact details (email, phone, etc.)"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Eligibility Proof</label>
              <textarea
                name="eligibilityProof"
                value={formData.eligibilityProof}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] resize-none"
                placeholder="Enter eligibility proof details or document reference"
                rows="4"
                disabled={loading}
              />
              <p className="text-[#b6b1b2] text-sm mt-1">Provide details about the organization&apos;s legitimacy and documentation</p>
            </div>
            {mode === 'edit' && (
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Approval Status</label>
                <select
                  name="approvalStatus"
                  value={formData.approvalStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white"
                  disabled={loading}
                >
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-[#e9ecef]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors disabled:opacity-50 font-medium flex items-center space-x-2"
              disabled={loading}
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{loading ? (mode === 'add' ? 'Creating...' : 'Saving...') : (mode === 'add' ? 'Create Organization' : 'Save Changes')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationModal;
