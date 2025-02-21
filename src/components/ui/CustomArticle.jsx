import CustomInput from '../ui/CustomInput';
import CustomButton from '../ui/CustomButton';
import CustomAlert from '../ui/CustomAlert';
import { Box, Container, Typography } from '@mui/material';

const CustomArticle = ({ 
    title = '',
    content = '',
    onTitleChange,
    onContentChange,
    onSubmit,
    onCancel,
    pageTitle,
    submitButtonText,
    alert,
}) => {
    return (
        <Container maxWidth="md">
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    mt: 4,
                    mb: 4,
                    width: '100%',
                    maxWidth: '600px',
                    mx: 'auto'
                }}
            >
                <Typography 
                    variant="h4" 
                    component="h1" 
                    align="center"
                    gutterBottom
                    sx={{ mb: 4 }}
                >
                    {pageTitle}
                </Typography>

                <CustomInput
                    label="Titre"
                    value={title}
                    onChange={onTitleChange}
                    required
                    fullWidth
                />

                <CustomInput
                    label="Contenu"
                    value={content}
                    onChange={onContentChange}
                    required
                    multiline
                    rows={6}
                    fullWidth
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <CustomButton
                        onClick={onCancel}
                        variant="outlined"
                        color="primary"
                    >
                        Annuler
                    </CustomButton>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {submitButtonText}
                    </CustomButton>
                </Box>
            </Box>

            <CustomAlert
                open={alert.open}
                onClose={alert.onClose}
                message={alert.message}
                severity={alert.severity}
            />
        </Container>
    );
};

export default CustomArticle; 