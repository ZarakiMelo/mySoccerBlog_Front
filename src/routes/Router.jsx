import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Articles from '../pages/Articles/Articles';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import Article from '../components/Article/Article';
import NewArticle from '../components/Article/NewArticle';
import EditArticle from '../components/Article/EditArticle';
import PrivateRoute from './PrivateRoute';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<Article />} />
      <Route 
        path="/articles/:id/edit" 
        element={
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/articles/new" 
        element={
          <PrivateRoute>
            <NewArticle />
          </PrivateRoute>
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRouter; 