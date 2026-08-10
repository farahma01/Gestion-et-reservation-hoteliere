import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';

import { getMesMessages } from '../API/MessageAPI';
import { useAuthStore } from '../useAuthStore';

export default function MesMessages() {
    const { token } = useAuthStore();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const charger = async () => {
            try {
                const data = await getMesMessages(token);
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        };
        if (token) charger();
    }, [token]);

    return (
  <Box sx={{ p: 4, width: '100%' }}>
    <Typography variant="h5" fontWeight={700} mb={3}>Mes messages</Typography>
    <Stack spacing={2}>
      {messages.length === 0 && (
        <Typography color="text.secondary">Aucun message envoyé pour l'instant.</Typography>
      )}
      {messages.map((m) => (
        <Card key={m.id} sx={{ width: '100%' }}>
          <CardContent>
            <Typography sx={{ mb: 1 }}>{m.message}</Typography>
            <Chip
              label={m.statut === 'repondu' ? 'Répondu' : 'En attente'}
              color={m.statut === 'repondu' ? 'success' : 'warning'}
              size="small"
              sx={{ mb: 1 }}
            />
            {m.reponse && (
              <Typography color="primary" sx={{ fontStyle: 'italic' }}>
                Réponse : {m.reponse}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  </Box>
);}