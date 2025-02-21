import { useState, useEffect } from 'react';
import { getAllArticles } from '../../api/articles';
import { useNavigate } from 'react-router';
import './Articles.css';
import { useAuth } from '../../context/AuthContext';
import { getAllCategories } from '../../api/categories';
import CustomCard from '../../components/ui/CustomCard';
import ChipFilter from '../../components/ui/ChipFilter';
import CustomAlert from '../../components/ui/CustomAlert';
import useAlert from '../../hooks/useAlert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Container, Box } from '@mui/material';


const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { alert, showAlert, hideAlert } = useAlert();

    const formattedDate = (date) => format(new Date(date), 'dd MMMM yyyy', { locale: fr });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [articlesData, categoriesData] = await Promise.all([
                    getAllArticles(),
                    getAllCategories()
                ]);
                setArticles(articlesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const filteredArticles = articles.filter(article => 
        !selectedCategory || article.categoryId === selectedCategory
    );

    return (
        <Container className="articles-list">
            <Box className="filters">
                <ChipFilter
                    items={categories}
                    selectedItem={selectedCategory}
                    onItemClick={setSelectedCategory}
                    getItemLabel={(category) => category.title}
                    getItemValue={(category) => category.id}
                />
            </Box>

            <Box className="articles-grid">
                {filteredArticles.map(article => (
                    <CustomCard
                        createdAt={formattedDate(article.createdAt)}
                        key={article.id}
                        title={article.title}
                        content={article.content.substring(0, 50) + '...'}
                        actions={[
                            {
                                label: "Voir l'article",
                                onClick: () => navigate(`/articles/${article.id}`),
                                props: { variant: "contained" }
                            }
                        ]}
                    />
                ))}
            </Box>

            {isAuthenticated && (
                <Fab 
                    color="primary" 
                    aria-label="add article"
                    onClick={() => navigate('/articles/new')}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16
                    }}
                >
                    <AddIcon />
                </Fab>
            )}

            <CustomAlert
                open={alert.open}
                onClose={hideAlert}
                message={alert.message}
                severity={alert.severity}
                action={alert.action}
            />
        </Container>
    );
};

export default Articles; 