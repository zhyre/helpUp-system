// Organization service for frontend
import api from './api';

export const fetchOrganizationById = async (id) => {
    return api.get(`/organizations/${id}`);
};

export const fetchOrganizationByUserId = async (userId) => {
    return api.get(`/organizations/user/${userId}`);
};

export const updateOrganization = async (id, orgDetails) => {
    return api.put(`/organizations/${id}`, orgDetails);
};

export const createOrganization = async (orgDetails) => {
    return api.post('/organizations', orgDetails);
};

export const deleteOrganization = async (id) => {
    return api.delete(`/organizations/${id}`);
};
