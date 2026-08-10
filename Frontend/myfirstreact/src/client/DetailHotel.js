import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import { useHotelsStore } from '../useHotelsStore';
import { fetchHotelPhotos } from '../API/PixabayAPI';
import { getAvisParHotel, addAvis } from '../API/AvisAPI';
import { useAuthStore } from '../useAuthStore';


function DetailHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotelCourant, fetchHotelById, status } = useHotelsStore();
  const { user, token } = useAuthStore();

  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  const [avisListe, setAvisListe] = useState([]);
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [erreurAvis, setErreurAvis] = useState('');
  const [succesAvis, setSuccesAvis] = useState(false);

  useEffect(() => {
    fetchHotelById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (hotelCourant?.nom) {
      setLoadingGallery(true);
      const query = `${hotelCourant.ville || ''} hotel luxury`;
      const idString = String(hotelCourant.id ?? id ?? '1');
      const numericSeed = idString
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const page = (numericSeed % 5) + 1;

      fetchHotelPhotos(query, 6, page).then((photos) => {
        setGallery(photos);
        setLoadingGallery(false);
      });
    }
  }, [hotelCourant]);

  const chargerAvis = () => {
    getAvisParHotel(id).then(setAvisListe).catch(console.error);
  };

  useEffect(() => {
    chargerAvis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const afficherEtoiles = (categorie) => {
    const nombre = parseInt(categorie, 10);
    if (!nombre) return categorie;
    return '\u{1F31F}'.repeat(nombre);
  };

  const moyenneNotes = avisListe.length
    ? avisListe.reduce((acc, a) => acc + a.note, 0) / avisListe.length
    : 0;

  const dejaNote = user && avisListe.some((a) => a.user_id === user.id);

  const handleSubmitAvis = async (e) => {
    e.preventDefault();
    setErreurAvis('');
    setSuccesAvis(false);
    try {
      await addAvis({ hotel_id: id, note, commentaire }, token);
      setSuccesAvis(true);
      setNote(0);
      setCommentaire('');
      chargerAvis();
    } catch (err) {
      setErreurAvis(err.message || "Erreur lors de l'envoi de l'avis.");
    }
  };

  if (status === 'loading' || !hotelCourant) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        {status === 'loading' ? (
          <CircularProgress />
        ) : (
          <Typography>Aucune donnée disponible. Reviens depuis la liste des hôtels.</Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/Hotels')}>
            Retour à la liste
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 650 }}>
        <Typography variant="h5" fontWeight={700} color="secondary" gutterBottom>
          Détail de l'hôtel
        </Typography>

        <Box
          component="img"
          src={hotelCourant.image}
          alt={hotelCourant.nom}
          sx={{ width: '100%', maxWidth: 400, borderRadius: 2, display: 'block', mx: 'auto', mb: 2 }}
        />

        {/* Note moyenne */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={moyenneNotes} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary">
            {avisListe.length > 0
              ? `${moyenneNotes.toFixed(1)} / 5 (${avisListe.length} avis)`
              : 'Aucun avis pour le moment'}
          </Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
          Galerie photos
        </Typography>

        {loadingGallery && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!loadingGallery && gallery.length > 0 && (
          <ImageList cols={3} gap={8} sx={{ mb: 2 }}>
            {gallery.map((photo) => (
              <ImageListItem key={photo.id}>
                <img
                  src={photo.url}
                  alt={photo.tags}
                  loading="lazy"
                  style={{ borderRadius: 8, objectFit: 'cover', height: 100, width: '100%' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        {!loadingGallery && gallery.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Aucune photo trouvée pour cette destination.
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Table size="small" sx={{ maxWidth: 450 }}>
            <TableBody>
              <TableRow>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell>{hotelCourant.nom}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Ville</strong></TableCell>
                <TableCell>{hotelCourant.ville}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Catégorie</strong></TableCell>
                <TableCell>{afficherEtoiles(hotelCourant.categorie)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell>{hotelCourant.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Prix</strong></TableCell>
                <TableCell>{hotelCourant.prix} DT</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* Section Avis */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          Avis des clients
        </Typography>

        {avisListe.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Aucun avis pour cet hôtel pour le moment.
          </Typography>
        )}

        {avisListe.map((a) => (
          <Box key={a.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography fontWeight={600}>{a.user?.name || 'Client'}</Typography>
              <Rating value={a.note} readOnly size="small" />
            </Box>
            {a.commentaire && (
              <Typography variant="body2" color="text.secondary">{a.commentaire}</Typography>
            )}
          </Box>
        ))}

        {/* Formulaire pour laisser un avis */}
        {user && !dejaNote && (
          <Box component="form" onSubmit={handleSubmitAvis} sx={{ mt: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Laisser un avis
            </Typography>
            {succesAvis && <Alert severity="success" sx={{ mb: 2 }}>Merci pour votre avis !</Alert>}
            {erreurAvis && <Alert severity="error" sx={{ mb: 2 }}>{erreurAvis}</Alert>}
            <Rating
              value={note}
              onChange={(e, newValue) => setNote(newValue)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Votre commentaire (optionnel)"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" disabled={note === 0}>
              Envoyer mon avis
            </Button>
          </Box>
        )}

        {!user && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Connectez-vous pour laisser un avis sur cet hôtel.
          </Alert>
        )}

        {user && dejaNote && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Vous avez déjà laissé un avis pour cet hôtel.
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => navigate('/Hotels')}>
            Retour à la liste
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default DetailHotel;