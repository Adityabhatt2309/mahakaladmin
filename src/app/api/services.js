import axiosInstance from './axiosInstance';

// Get list of items with loading and error management
export const getList = async (endpoint) => {
    let loading = true;
    let error = null;
    try {
        const response = await axiosInstance.get(endpoint);
        return { loading: false, error: null, data: response.data };
    } catch (error) {
        return { loading: false, error: error.response?.data?.message || 'Error fetching list', data: null };
    } finally {
        loading = false;
    }
};

// Get item by ID with loading and error management
export const getById = async (endpoint, id) => {
    let loading = true;
    let error = null;
    try {
        const response = await axiosInstance.get(`${endpoint}/${id}`);
        return { loading: false, error: null, data: response.data };
    } catch (error) {
        return { loading: false, error: error.response?.data?.message || 'Error fetching item', data: null };
    } finally {
        loading = false;
    }
};

// Add new item with loading and error management
export const add = async (endpoint, data) => {
    let loading = true;
    let error = null;
    try {
        const response = await axiosInstance.post(endpoint, data);
        return { loading: false, error: null, data: response.data };
    } catch (error) {
        return { loading: false, error: error.response?.data?.message || 'Error adding item', data: null };
    } finally {
        loading = false;
    }
};

// Update item by ID with loading and error management
export const update = async (endpoint, data) => {
    let loading = true;
    let error = null;
    try {
        const response = await axiosInstance.put(`${endpoint}`, data);
        return { loading: false, error: null, data: response.data };
    } catch (error) {
        return { loading: false, error: error.response?.data?.message || 'Error updating item', data: null };
    } finally {
        loading = false;
    }
};

// Delete item by ID with loading and error management
export const deleteById = async (endpoint, id) => {
    let loading = true;
    let error = null;
    try {
        const response = await axiosInstance.delete(`${endpoint}/${id}`);
        return { loading: false, error: null, data: response.data };
    } catch (error) {
        return { loading: false, error: error.response?.data?.message || 'Error deleting item', data: null };
    } finally {
        loading = false;
    }
};
