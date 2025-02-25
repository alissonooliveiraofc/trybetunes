import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import { SongType } from '../../types';

function Favorites() {
  const [loading, setLoading] = useState<boolean>(true);
  const [allFavoritesSongs, setAllFavoritesSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setAllFavoritesSongs(favoriteSongs);
      setLoading(false);
    };

    fetchFavoriteSongs();
  }, [allFavoritesSongs]);

  return (
    <main>
      <h4>Músicas Favoritas</h4>
      { loading && <Loading /> }
      {allFavoritesSongs.map((song) => (
        <MusicCard
          key={ song.trackId }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
          trackId={ song.trackId }
        />
      ))}
    </main>
  );
}

export default Favorites;
