import axios from 'axios';

const CATEGORIES_API_URL = `${import.meta.env.VITE_API_URL}/categories`;

export const getAllCategories = async () => {
    try {
        const response = await axios.get(CATEGORIES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        throw new Error('Erreur lors de la récupération des catégories');
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${CATEGORIES_API_URL}/${id}`);    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie:', error);
        throw new Error('Erreur lors de la récupération de la catégorie');
    }
};




