import { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Button, Stack
} from '@mui/material';
import { getReservations, updateStatutReservation, deleteReservation } from '../API/ReservationAPI';

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [chargement, setChargement] = useState(true);

    const charger = async () => {
        setChargement(true);
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (err) {
            console.error(err);
        }
        setChargement(false);
    };

    useEffect(() => {
        charger();
    }, []);

    const handleStatut = async (id, statut) => {
        await updateStatutReservation(id, statut);
        charger();
    };

    const handleSupprimer = async (id) => {
        if (window.confirm('Supprimer définitivement cette réservation ?')) {
            await deleteReservation(id);
            charger();
        }
    };

    const couleurStatut = (statut) => {
        if (statut === 'confirmee') return 'success';
        if (statut === 'annulee') return 'error';
        return 'warning';
    };

    if (chargement) return <Typography sx={{ p: 4 }}>Chargement...</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={3}>
                Gestion des réservations
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hôtel</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Téléphone</TableCell>
                            <TableCell>Arrivée</TableCell>
                            <TableCell>Départ</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.hotel?.nom || '—'}</TableCell>
                                <TableCell>{r.nom_client}</TableCell>
                                <TableCell>{r.email}</TableCell>
                                <TableCell>{r.telephone}</TableCell>
                                <TableCell>{r.date_debut}</TableCell>
                                <TableCell>{r.date_fin}</TableCell>
                                <TableCell>
                                    <Chip label={r.statut} color={couleurStatut(r.statut)} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        {r.statut !== 'confirmee' && (
                                            <Button size="small" color="success" onClick={() => handleStatut(r.id, 'confirmee')}>
                                                Confirmer
                                            </Button>
                                        )}
                                        {r.statut !== 'annulee' && (
                                            <Button size="small" color="warning" onClick={() => handleStatut(r.id, 'annulee')}>
                                                Annuler
                                            </Button>
                                        )}
                                        <Button size="small" color="error" onClick={() => handleSupprimer(r.id)}>
                                            Supprimer
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}