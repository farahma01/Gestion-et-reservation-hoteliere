import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { sendMessage } from '../API/MessageAPI';
import { useAuthStore } from '../useAuthStore';

function Contact() {
  const { user } = useAuthStore();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    if (user) {
      setNom(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    try {
      await sendMessage({ nom, email, message });
      setEnvoye(true);
      setMessage('');
      if (!user) { setNom(''); setEmail(''); }
    } catch (err) {
      setErreur(err.message || "Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Contactez-nous
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Une question sur nos hôtels ?
        </Typography>

        {!user && (
          <Alert severity="info" sx={{ my: 2 }}>
            Connectez-vous pour retrouver la réponse dans "Mes messages", ou laissez votre email ci-dessous.
          </Alert>
        )}
        {envoye && (
          <Alert severity="success" sx={{ my: 2 }}>
            Votre message a bien été envoyé. Merci !
          </Alert>
        )}
        {erreur && (
          <Alert severity="error" sx={{ my: 2 }}>
            {erreur}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Nom complet"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom"
            required
            fullWidth
            disabled={!!user}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            required
            fullWidth
            disabled={!!user}
            helperText={user ? "Email lié à votre compte" : ""}
          />
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message..."
            multiline
            rows={5}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" size="large">
            Envoyer
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Contact;