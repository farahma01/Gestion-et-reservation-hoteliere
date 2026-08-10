import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

import { addReservation } from '../API/ReservationAPI';
import { useAuthStore } from '../useAuthStore';

export default function FormulaireReservation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [nomClient, setNomClient] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur('');

        if (new Date(dateFin) <= new Date(dateDebut)) {
            setErreur('La date de fin doit être après la date de début.');
            return;
        }

        try {
            await addReservation({
                hotel_id: id,
                nom_client: nomClient,
                email,
                telephone,
                date_debut: dateDebut,
                date_fin: dateFin,
            }, token);
            setSucces(true);
            setTimeout(() => navigate('/hotels'), 2000);
        } catch (err) {
            setErreur(err.message || "Une erreur est survenue lors de la réservation.");
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
                Réserver cet hôtel
            </Typography>

            {succes && <Alert severity="success" sx={{ mb: 2 }}>Réservation confirmée ! Redirection...</Alert>}
            {erreur && <Alert severity="error" sx={{ mb: 2 }}>{erreur}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nom complet"
                    value={nomClient}
                    onChange={(e) => setNomClient(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Téléphone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                    fullWidth
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Date d'arrivée *
                    </Typography>
                    <TextField
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                        fullWidth
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Date de départ *
                    </Typography>
                    <TextField
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                        fullWidth
                    />
                </Box>

                <Button type="submit" variant="contained" color="success" size="large">
                    Confirmer la réservation
                </Button>
            </Box>
        </Box>
    );
}