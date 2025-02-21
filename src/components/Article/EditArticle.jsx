import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getArticleById, updateArticle } from '../../api/articles';
import useAlert from '../../hooks/useAlert';
import CustomArticle from '../ui/CustomArticle';


const EditArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { alert, showAlert, hideAlert } = useAlert();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const article = await getArticleById(id);
                setTitle(article.title);
                setContent(article.content);
            } catch (error) {
                showAlert({
                    message: 'Erreur lors de la récupération de l\'article',
                    severity: 'error'
                });
                navigate('/articles');
            }
        };
        fetchArticle();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateArticle(id, { title, content });
            showAlert({
                message: 'Article modifié avec succès',
                severity: 'success'
            });
            setTimeout(() => {
                navigate(`/articles/${id}`);
            }, 1500);
        } catch (error) {
            showAlert({
                message: 'Erreur lors de la modification de l\'article',
                severity: 'error'
            });
        }
    };

    return (

            <CustomArticle
                title={title}
                content={content}
                onTitleChange={(e) => setTitle(e.target.value)}
                onContentChange={(e) => setContent(e.target.value)}
                onSubmit={handleSubmit}
            onCancel={() => navigate(`/articles/${id}`)}
            pageTitle="Modifier l'article"
            submitButtonText="Enregistrer"
            alert={{
                open: alert.open,
                onClose: hideAlert,
                message: alert.message,
                severity: alert.severity
            }}
        />
    );
};

export default EditArticle;
         