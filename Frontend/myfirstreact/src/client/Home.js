import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuthStore } from '../useAuthStore';
import { useHotelsStore } from '../useHotelsStore';
import { fetchHotelPhotos } from '../API/PixabayAPI';

export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dateArrivee, setDateArrivee] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const { hotels, fetchHotels } = useHotelsStore();

  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const { user, logout } = useAuthStore();

const handleLogout = async () => {
    await logout();
    navigate('/');
};
  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Charge une galerie de photos d'hôtels en Tunisie pour illustrer la page d'accueil
  useEffect(() => {
    setLoadingGallery(true);
    fetchHotelPhotos('Tunisia hotel resort', 8).then((photos) => {
      setGallery(photos);
      setLoadingGallery(false);
    });
  }, []);

  const villes = [...new Set(hotels.map((h) => h.ville).filter(Boolean))];

  const handleSearch = () => {
    navigate(`/Hotels?destination=${encodeURIComponent(destination)}`);
  };

  return (
    <Box>
      {/* HERO façon Booking.com */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 5, md: 8 },
          px: 2,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 900, mx: 'auto', mb: 2 }}>
          {user ? (
    <Button variant="outlined" color="inherit" onClick={handleLogout}>
        Se déconnecter
    </Button>
) : (
    <Button variant="outlined" color="inherit" onClick={() => navigate('/login')}>
        Se connecter
    </Button>
)}
        </Box>

        <Typography variant="h3" fontWeight={800} gutterBottom>
          Trouvez votre prochain séjour
        </Typography>
        <Typography variant="h6" fontWeight={400} sx={{ opacity: 0.9, mb: 4 }}>
          Recherchez des offres sur des hôtels en Tunisie
        </Typography>

        {/* Barre de recherche large, claire, sur fond blanc */}
        <Paper
          elevation={6}
          sx={{
            maxWidth: 900,
            mx: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'stretch',
            borderRadius: 3,
          }}
        >
          <Box sx={{ flex: 2, textAlign: 'left' }}>
            <InputLabel shrink sx={{ color: 'text.primary', fontWeight: 600, mb: 0.5 }}>
              Destination
            </InputLabel>
            <TextField
              select
              fullWidth
              placeholder="Indiquez la destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              InputProps={{
                startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            >
              <MenuItem value="">Où allez-vous ?</MenuItem>
              {villes.map((ville) => (
                <MenuItem key={ville} value={ville}>{ville}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ flex: 1, textAlign: 'left' }}>
            <InputLabel shrink sx={{ color: 'text.primary', fontWeight: 600, mb: 0.5 }}>
              Date de départ
            </InputLabel>
            <TextField
              fullWidth
              type="date"
              value={dateDepart}
              onChange={(e) => setDateDepart(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1, textAlign: 'left' }}>
            <InputLabel shrink sx={{ color: 'text.primary', fontWeight: 600, mb: 0.5 }}>
              Date d'arrivée
            </InputLabel>
            <TextField
              fullWidth
              type="date"
              value={dateArrivee}
              onChange={(e) => setDateArrivee(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              sx={{ height: 56, px: 4, whiteSpace: 'nowrap' }}
            >
              Rechercher
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Galerie de photos d'hôtels (Pixabay) */}
      <Box sx={{ py: 5, px: 2, maxWidth: 1100, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Découvrez nos hôtels en images
        </Typography>

        {loadingGallery && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {!loadingGallery && gallery.length === 0 && (
          <Typography color="text.secondary">Aucune photo disponible pour le moment.</Typography>
        )}

        {!loadingGallery && gallery.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {gallery.map((photo) => (
              <Card key={photo.id} sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={photo.url}
                  alt={photo.tags}
                  sx={{ width: '100%', height: 140, objectFit: 'cover', display: 'block', flexShrink: 0 }}
                />
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Section basse */}
      <Box sx={{ textAlign: 'center', py: 5, px: 2 }}>
        <Typography sx={{ mb: 1 }}>Pour trouver plus d'Hôtels avec plus de Détails :</Typography>
        <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/Hotels')}>
          Voir les Hôtels
        </Button>
        <Typography sx={{ mt: 3, mb: 1 }}>Pour plus d'information contactez-nous :</Typography>
        <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/Contact')}>
          Contact
        </Button>
      </Box>
    </Box>
  );
}