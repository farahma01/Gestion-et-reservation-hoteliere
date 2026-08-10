import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import HotelIcon from '@mui/icons-material/Hotel';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

function About() {
  const atouts = [
    {
      icon: <HotelIcon fontSize="large" />,
      titre: "Large sélection d'hôtels",
      texte: 'Des adresses soigneusement choisies dans toute la Tunisie, du 3 au 5 étoiles.',
    },
    {
      icon: <VerifiedIcon fontSize="large" />,
      titre: 'Réservation garantie',
      texte: 'Confirmation immédiate et suivi de votre réservation à chaque étape.',
    },
    {
      icon: <PriceCheckIcon fontSize="large" />,
      titre: 'Meilleurs prix',
      texte: 'Des tarifs transparents, sans frais cachés, pour tous les budgets.',
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      titre: 'Support réactif',
      texte: 'Une équipe à votre écoute pour répondre à toutes vos questions.',
    },
  ];

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          À propos de Tunisie Booking Hotels
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Tunisie Booking Hotels est votre partenaire de confiance pour organiser
          un séjour d'exception. Que vous recherchiez une escapade en bord de mer
          à Djerba, un séjour culturel à Tunis ou une parenthèse bien-être à
          Hammamet, nous vous accompagnons à chaque étape pour trouver l'hôtel
          qui vous correspond.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Notre plateforme réunit une sélection d'établissements à travers tout
          le pays, avec des informations claires, des avis de voyageurs
          authentiques et un processus de réservation simple et sécurisé.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 500, mx: 'auto' }}>
  {atouts.map((atout, index) => (
    <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex' }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
          },
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          {atout.icon}
        </Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {atout.titre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {atout.texte}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>

      <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Notre mission
        </Typography>
        <Typography color="text.secondary">
          Faciliter l'accès à l'hôtellerie tunisienne pour tous les voyageurs,
          en mettant en avant la richesse et la diversité de nos destinations,
          tout en garantissant une expérience de réservation fluide et fiable.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;