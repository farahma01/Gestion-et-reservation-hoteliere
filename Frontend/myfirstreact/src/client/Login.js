import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useAuthStore } from '../useAuthStore';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login({ email, password });
            if (data.user.role === 'admin') {
                navigate('/admin/hotels');
            } else {
                navigate('/hotels');
            }
        } catch (err) {
            setError(err.message || 'Email ou mot de passe incorrect.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Se connecter
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Adresse e-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Veuillez saisir votre adresse e-mail"
                        required
                        fullWidth
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Continuer
                    </Button>
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        Pas encore de compte ?{' '}
                        <Button size="small" onClick={() => navigate('/register')}>
                            Créer un compte
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}