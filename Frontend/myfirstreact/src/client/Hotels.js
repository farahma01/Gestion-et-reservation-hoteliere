import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuthStore } from '../useAuthStore';
import { useHotelsStore } from '../useHotelsStore';

export default function Hotels() {
  const navigate = useNavigate();
  const { hotels, status, fetchHotels, setHotelCourant } = useHotelsStore();
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';
  const { token } = useAuthStore();

  const filteredHotels = hotels.filter((item) =>
    destination ? item.ville?.toLowerCase().includes(destination.toLowerCase()) : true
  );

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detailHotel = (id) => {
    setHotelCourant(id);
    navigate(`/detail/${id}`);
  };

  const afficherEtoiles = (categorie) => {
    const nombre = parseInt(categorie, 10);
    if (!nombre) return categorie;
    return '\u{1F31F}'.repeat(nombre);
  };

  return (
    <Box sx={{ py: 4, pl: { xs: 2, sm: 4, md: 6 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  <Typography variant="h4" fontWeight={700}>Liste des Hôtels</Typography>
</Box>

      {status === 'loading' && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
    },
    gap: 3,
    px: { xs: 2, sm: 4, md: 6 },  // même valeur que le header
    pb: 4,                          // un peu d'espace en bas
  }}
>
        {filteredHotels.map((item) => (
          <Card key={item.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <CardMedia component="img" image={item.image} alt={item.nom} sx={{ width: '100%', height: 180, objectFit: 'cover' }} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => detailHotel(item.id)}>
                {item.nom}
              </Typography>
              <Typography color="text.secondary">📍 {item.ville}</Typography>
              <Typography>{afficherEtoiles(item.categorie)}</Typography>
              <Typography variant="body2" sx={{ color: item.disponibilite ? 'success.main' : 'error.main', fontWeight: 600 }}>
    {item.disponibilite ? '✅ Disponible' : '❌ Indisponible'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
              <Typography sx={{ mt: 1, fontWeight: 700 }}>{item.prix} DT/nuit</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Button size="small" onClick={() => detailHotel(item.id)}>Détail</Button>
              {item.disponibilite && (
    <Button
        variant="contained"
        color="success"
        onClick={() => token ? navigate(`/reserver/${item.id}`) : navigate('/login')}
    >
        Réserver
    </Button>
)}
            </CardActions>
          </Card>
        ))}
      </Box>

      {status === 'succeeded' && filteredHotels.length === 0 && (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
          Aucun hôtel trouvé.
        </Typography>
      )}
    </Box>
  );
}