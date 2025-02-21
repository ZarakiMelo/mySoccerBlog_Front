import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import { deleteArticle, getArticleById } from '../../api/articles';
import { useState, useEffect } from 'react';
import CustomCard from '../ui/CustomCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Typography, Box } from '@mui/material';
import useAlert from '../../hooks/useAlert';
import CustomAlert from '../ui/CustomAlert';

const Article = () => {
    const [article, setArticle] = useState(null);
    const { isAuthenticated, isMyArticle } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const { alert, showAlert, hideAlert } = useAlert();

    const handleDelete = async () => {
        try {
            await deleteArticle(id);
            showAlert({
                message: 'Article supprimé avec succès',
                severity: 'success'
            });
            setTimeout(() => {
                navigate('/articles');
            }, 1500);
        } catch (error) {
            showAlert({
                message: 'Erreur lors de la suppression',
                severity: 'error'
            });
        }
    };

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticleById(id);
                setArticle(data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'article:', error);
            }
        };
        fetchArticle();
    }, [id]);

    if (!article) {
        return <div>Chargement...</div>;
    }

    const formattedDate = format(new Date(article.createdAt), 'dd MMMM yyyy', { locale: fr });

    return (
        <Box maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <CustomCard
                title={article.title}
                content={
                    <Typography variant="body1" paragraph>
                        {article.content}
                    </Typography>
                }
                createdAt={formattedDate}
                maxWidth="100%"
                actions={
                    isAuthenticated && isMyArticle(article) 
                    ? [
                        {
                            label: "Modifier",
                            onClick: () => navigate(`/articles/${id}/edit`),
                            props: { color: "primary" }
                        },
                        {
                            label: "Supprimer",
                            onClick: handleDelete,
                            props: { color: "error" }
                        }
                    ] 
                    : []
                }
            />
            <CustomAlert
                open={alert.open}
                onClose={hideAlert}
                message={alert.message}
                severity={alert.severity}
                action={alert.action}
            />
        </Box>
    );
};

export default Article;