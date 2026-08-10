const PIXABAY_KEY = process.env.REACT_APP_PIXABAY_KEY;

/**
 * Récupère plusieurs photos liées à une recherche (ex: "Djerba hotel").
 * Retourne un tableau d'objets { id, url } — vide si rien trouvé ou en cas d'erreur.
 */
export async function fetchHotelPhotos(query, perPage = 6, page = 1) {
  if (!query) return [];
  if (!PIXABAY_KEY) {
    console.error('Clé Pixabay manquante : vérifie ton fichier .env (REACT_APP_PIXABAY_KEY) et redémarre le serveur.');
    return [];
  }

  const encodedQuery = encodeURIComponent(query);
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodedQuery}&image_type=photo&per_page=${perPage}&page=${page}&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Pixabay renvoie un statut 200 même en cas de clé invalide, mais avec un champ "error"
    if (!response.ok || data.error) {
      console.error('Réponse Pixabay en erreur:', data.error || response.status, '— requête:', query);
      return [];
    }

    if (!data.hits || data.hits.length === 0) {
      console.warn('Aucun résultat Pixabay pour la requête:', query);
      return [];
    }

    return data.hits.map((hit) => ({
      id: hit.id,
      url: hit.webformatURL,
      tags: hit.tags,
    }));
  } catch (error) {
    console.error('Erreur réseau Pixabay:', error);
    return [];
  }
}

/**
 * Récupère les hits COMPLETS de Pixabay (toutes les infos : tags, vues, likes,
 * téléchargements, pageURL, utilisateur, etc.) pour une requête donnée.
 * Utilisé pour la page qui affiche un tableau détaillé par résultat.
 */
export async function fetchHotelHits(query, perPage = 12, page = 1) {
  if (!query) return [];
  if (!PIXABAY_KEY) {
    console.error('Clé Pixabay manquante : vérifie ton fichier .env (REACT_APP_PIXABAY_KEY) et redémarre le serveur.');
    return [];
  }

  const encodedQuery = encodeURIComponent(query);
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodedQuery}&image_type=photo&per_page=${perPage}&page=${page}&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Réponse Pixabay en erreur:', data.error || response.status, '— requête:', query);
      return [];
    }

    return data.hits || [];
  } catch (error) {
    console.error('Erreur réseau Pixabay:', error);
    return [];
  }
}