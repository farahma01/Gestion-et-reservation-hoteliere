import { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, TextField, Button, Chip, Stack
} from '@mui/material';
import { getAllMessages, repondreMessage, deleteMessage } from '../API/MessageAPI';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [reponses, setReponses] = useState({});

    const charger = async () => {
        const data = await getAllMessages();
        setMessages(data);
    };

    useEffect(() => { charger(); }, []);

    const handleReponse = async (id) => {
        if (!reponses[id]) return;
        await repondreMessage(id, reponses[id]);
        charger();
    };

    const handleSupprimer = async (id) => {
        if (window.confirm('Supprimer ce message ?')) {
            await deleteMessage(id);
            charger();
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={3}>Messages de contact</Typography>
            <Stack spacing={2}>
                {messages.map((m) => (
                    <Card key={m.id}>
                        <CardContent>
                            <Typography fontWeight={700}>{m.nom} — {m.email}</Typography>
                            <Typography sx={{ my: 1 }}>{m.message}</Typography>
                            <Chip
                                label={m.statut}
                                color={m.statut === 'repondu' ? 'success' : 'warning'}
                                size="small"
                                sx={{ mb: 1 }}
                            />
                            {m.reponse && (
                                <Typography color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                                    Réponse : {m.reponse}
                                </Typography>
                            )}
                            <Stack direction="row" spacing={1}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Écrire une réponse..."
                                    value={reponses[m.id] || ''}
                                    onChange={(e) => setReponses({ ...reponses, [m.id]: e.target.value })}
                                />
                                <Button variant="contained" onClick={() => handleReponse(m.id)}>Répondre</Button>
                                <Button color="error" onClick={() => handleSupprimer(m.id)}>Supprimer</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}