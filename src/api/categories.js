const CATEGORIES_API_URL = 'http://localhost:5050/categories';

export const getAllCategories = async () => {
    const response = await fetch(CATEGORIES_API_URL);
    return response.json();
};

export const getCategoryById = async (id) => {
    const response = await fetch(`${CATEGORIES_API_URL}/${id}`);
    return response.json();
};


