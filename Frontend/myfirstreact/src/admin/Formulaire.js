import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHotelsStore } from '../useHotelsStore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { FormControlLabel, Checkbox } from '@mui/material';

// Petit composant réutilisable : un label fixe au-dessus du champ
function Field({ label, children }) {
  return (
    <Box sx={{ textAlign: 'left' }}>
      <InputLabel shrink sx={{ color: 'text.primary', fontWeight: 600, mb: 0.5 }}>
        {label}
      </InputLabel>
      {children}
    </Box>
  );
}

function Formulaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotelCourant, fetchHotelById, addHotel, updateHotel } = useHotelsStore();
  const [nom, setNom] = useState('');
  const [category, setCateg] = useState('');
  const [description, setDesc] = useState('');
  const [image, setIm] = useState('');
  const [prix, setPrix] = useState('');
  const [ville, setVille] = useState('');
  const [disponibilite, setDisponibilite] = useState(true);

  useEffect(() => {
    if (id) {
      fetchHotelById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id && hotelCourant) {
      setNom(hotelCourant.nom);
      setCateg(hotelCourant.categorie);
      setDesc(hotelCourant.description);
      setIm(hotelCourant.image);
      setPrix(hotelCourant.prix);
      setVille(hotelCourant.ville);
      setDisponibilite(hotelCourant.disponibilite);
    }
  }, [id, hotelCourant]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // qualité 70%
          setIm(compressedBase64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hotelData = { nom, ville, categorie: category, description, image, prix: Number(prix), disponibilite };    if (id) {
      await updateHotel(id, hotelData);
    } else {
      await addHotel(hotelData);
    }
    navigate('/hotels');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 550 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {id ? "Modifier l'hôtel" : 'Ajouter un hôtel'}
        </Typography>


        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 2 }}>
          <Field label="Nom Hôtel">
            <TextField
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="nom de l'hôtel"
              fullWidth
            />
          </Field>
            

          <Field label="Ville">
            <TextField
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              placeholder="ex: Djerba"
              fullWidth
            />
          </Field>

          <Field label="Catégorie">
            <TextField
              select
              value={category}
              onChange={(e) => setCateg(e.target.value)}
              required
              fullWidth
            >
              <MenuItem value="">-- Sélectionner une Catégorie --</MenuItem>
              <MenuItem value="1 étoiles">🌟 (1 étoile)</MenuItem>
              <MenuItem value="2 étoiles">🌟🌟 (2 étoiles)</MenuItem>
              <MenuItem value="3 étoiles">🌟🌟🌟 (3 étoiles)</MenuItem>
              <MenuItem value="4 étoiles">🌟🌟🌟🌟 (4 étoiles)</MenuItem>
              <MenuItem value="5 étoiles">🌟🌟🌟🌟🌟 (5 étoiles)</MenuItem>
            </TextField>
          </Field>
           <FormControlLabel
    control={
        <Checkbox
            checked={disponibilite}
            onChange={(e) => setDisponibilite(e.target.checked)}
        />
    }
    label="Disponible"
/>

          <Field label="Description">
            <TextField
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              multiline
              rows={3}
              fullWidth
            />
          </Field>

          <Field label="Prix (DT/nuit)">
            <TextField
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              fullWidth
            />
          </Field>

          <Field label="Image">
            <Button variant="outlined" component="label">
              Choisir une image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
          </Field>

          {image && (
            <Box
              component="img"
              src={image}
              alt="Aperçu"
              sx={{ maxWidth: 150, borderRadius: 1, display: 'block' }}
            />
          )}

          <Button type="submit" variant="contained" size="large">
            {id ? 'Modifier' : 'Envoyer'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Formulaire;
