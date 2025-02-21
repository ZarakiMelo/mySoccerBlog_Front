import axios from 'axios';



const ARTICLES_API_URL = 'http://localhost:5050/articles';


const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const getAllArticles = async () => {
    try {
        const response = await axios.get(ARTICLES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};


export const getArticleById = async (id) => {
    try {
        const response = await axios.get(`${ARTICLES_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

export const createArticle = async (article) => {
    try {
        const response = await axios.post(ARTICLES_API_URL, article, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'article:', error);
        throw error;
    }
};

export const updateArticle = async (id, article) => {
    try {
        const response = await axios.put(`${ARTICLES_API_URL}/${id}`, article, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
        throw error;
    }
};

export const deleteArticle = async (id) => {
    try {
        const response = await axios.delete(
            `${ARTICLES_API_URL}/${id}`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
        throw error;
    }
};


