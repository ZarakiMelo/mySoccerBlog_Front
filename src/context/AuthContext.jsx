import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: null,
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setAuthData({
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      });
    }
  }, []);

  const login = (data) => {
    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setAuthData({
      token,
      user,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthData({
      token: null,
      user: null,
      isAuthenticated: false
    });
  };

  const isMyArticle = (article) => {
    return article.User.id === authData.user?.id;
  };

  const value = {
    ...authData,
    login,
    logout,
    isMyArticle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 