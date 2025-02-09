
const RAPID_API_KEY = 'b7c3a85e14mshc8d5f68ddd00616p12dafajsna72de86b3139';
const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com';

const headers = {
  'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
  'x-rapidapi-key': RAPID_API_KEY,
};

export const deezerApi = {
  search: async (query: string) => {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`, { headers });
    return response.json();
  },

  getTrack: async (id: string) => {
    const response = await fetch(`${BASE_URL}/track/${id}`, { headers });
    return response.json();
  },

  getAlbum: async (id: string) => {
    const response = await fetch(`${BASE_URL}/album/${id}`, { headers });
    return response.json();
  },

  getArtist: async (id: string) => {
    const response = await fetch(`${BASE_URL}/artist/${id}`, { headers });
    return response.json();
  },

  getPlaylist: async (id: string) => {
    const response = await fetch(`${BASE_URL}/playlist/${id}`, { headers });
    return response.json();
  },

  getGenre: async (id: string) => {
    const response = await fetch(`${BASE_URL}/genre/${id}`, { headers });
    return response.json();
  },
};
