import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';

import { fetchHotelHits } from '../API/PixabayAPI';

export default function PixabayHotels() {
  const [query, setQuery] = useState('Tunisia hotel');
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (q) => {
    setLoading(true);
    const results = await fetchHotelHits(q, 9, 1);
    setHits(results);
    setLoading(false);
  };

  useEffect(() => {
    search(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(query);
  };

  return (
    <Box sx={{ py: 4, pl: { xs: 2, sm: 4, md: 6 } }}>
  <Typography variant="h4" fontWeight={700} gutterBottom>
    Explorer des photos d'hôtels (Pixabay)
    </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, my: 3, maxWidth: 500 }}>
        <TextField
          fullWidth
          label="Rechercher (ex: Djerba hotel, Tunis resort...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
  type="submit"
  variant="contained"
  sx={{
    px: 4,           // plus large horizontalement
    py: 0.5,          // un peu plus haut aussi si tu veux
    borderRadius: 1.5,  // coins moins arrondis (1 = 4px, au lieu du défaut souvent plus arrondi)
    whiteSpace: 'nowrap',
  }}
>
  Rechercher
</Button>
      </Box>

      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && hits.length === 0 && (
        <Typography color="text.secondary">Aucun résultat pour cette recherche.</Typography>
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
        }}
      >
        {hits.map((hit) => (
          <Card key={hit.id} sx={{ height: '100%', width: '100%', maxWidth: 345, mx: 'auto', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={hit.webformatURL}
              alt={hit.tags}
              sx={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
            />
            <Box sx={{ p: 2 }}>
              <Table
                size="small"
                sx={{ tableLayout: 'fixed', width: '100%' }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%', verticalAlign: 'top' }}><strong>Tags</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word', whiteSpace: 'normal' }}>{hit.tags}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%' }}><strong>Vues</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word' }}>{hit.views}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%' }}><strong>Téléchargements</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word' }}>{hit.downloads}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%' }}><strong>Likes</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word' }}>{hit.likes}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%' }}><strong>Auteur</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word' }}>{hit.user}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%' }}><strong>Dimensions</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word' }}>{hit.imageWidth} × {hit.imageHeight}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0, pl: 0, width: '35%' }}><strong>Source</strong></TableCell>
                    <TableCell sx={{ border: 0, wordBreak: 'break-word' }}>
                      <Link href={hit.pageURL} target="_blank" rel="noopener noreferrer">
                        Voir sur Pixabay
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}