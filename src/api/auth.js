import axios from 'axios';

const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw new Error('Erreur lors de la connexion');
    }
}

export { signIn };

const signUp = async (firstname, lastname, email, password) => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/register`, { firstname, lastname, email, password });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        throw new Error('Erreur lors de l\'inscription');
    }
}

export { signUp };

const signOut = async () => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/logout`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        throw new Error('Erreur lors de la déconnexion');
    }
}

export { signOut };

       