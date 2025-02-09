
export interface DeezerTrack {
  id: number;
  title: string;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture_small: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_small: string;
    cover_medium: string;
  };
  duration: number;
}

export interface DeezerArtist {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  nb_album: number;
  nb_fan: number;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  tracks: {
    data: DeezerTrack[];
  };
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  tracks: {
    data: DeezerTrack[];
  };
}

export interface SearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}
