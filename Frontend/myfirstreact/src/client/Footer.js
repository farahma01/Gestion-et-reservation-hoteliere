import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 6 }}>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700}>Tunisie Booking Hotels</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Votre partenaire de confiance pour un séjour d'exception.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2.5}>
            <Typography variant="subtitle2" fontWeight={700}>Adresse</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>Tunis, Djerba</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2.5}>
            <Typography variant="subtitle2" fontWeight={700}>Téléphone</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>+216 00 000 000</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle2" fontWeight={700}>Email</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>contact@myproject.com</Typography>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', py: 2 }}>
        <Container>
          <Typography variant="body2" align="center" sx={{ opacity: 0.75 }}>
            Booking.com fait partie de Booking Holdings Inc., le leader mondial des voyages en ligne et services associés. Copyright © 1996–2026 Booking.com™. Tous droits réservés.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
