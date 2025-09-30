import axios from 'axios';

const BASE_URL = 'https://knowledge-base-production-543f.up.railway.app';

export const getArticles = () => axios.get(`${BASE_URL}/articles`);
export const createArticle = (data) => axios.post(`${BASE_URL}/articles`, data);
export const updateArticle = (id, data) => axios.put(`${BASE_URL}/articles/${id}`, data);
export const deleteArticle = (id) => axios.delete(`${BASE_URL}/articles/${id}`);

export const getDocuments = () => axios.get(`${BASE_URL}/documents`);
export const createDocument = (data) => axios.post(`${BASE_URL}/media`, data);
export const deleteDocument = (id) => axios.delete(`${BASE_URL}/media/${id}`);