import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createArticle } from '../../api/articles';
import useAlert from '../../hooks/useAlert';
import CustomArticle from '../ui/CustomArticle';


const NewArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { alert, showAlert, hideAlert } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createArticle({ title, content });
            showAlert({
                message: 'Article créé avec succès',
                severity: 'success'
            });
            setTimeout(() => {
                navigate('/articles');
            }, 1500);
        } catch (error) {
            showAlert({
                message: 'Erreur lors de la création de l\'article',
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
            onCancel={() => navigate('/articles')}
            pageTitle="Nouvel article"
            submitButtonText="Publier"
            alert={{
                open: alert.open,
                onClose: hideAlert,
                message: alert.message,
                severity: alert.severity
            }}
        />
    );
};

export default NewArticle;