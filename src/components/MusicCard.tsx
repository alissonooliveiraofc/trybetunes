import { useState, useEffect } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

interface MusicCardProps extends SongType {
  onFavoriteChange?: (trackId: number) => void;
}

function MusicCard({
  trackName,
  previewUrl,
  trackId,
  onFavoriteChange = () => {},
}: MusicCardProps) {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkIfFavorited = async () => {
      const favoriteSongs = await getFavoriteSongs();
      const isFavorited = favoriteSongs
        .some((song: SongType) => song.trackId === trackId);
      setFavorited(isFavorited);
      setLoading(false);
    };

    checkIfFavorited();
  }, [trackId]);

  const handleFavoriteToggle = async () => {
    setLoading(true);
    if (favorited) {
      await removeSong({ trackName, previewUrl, trackId });
      setFavorited(false);
      if (onFavoriteChange) {
        onFavoriteChange(trackId);
      }
    } else {
      await addSong({ trackName, previewUrl, trackId });
      setFavorited(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <input
          type="checkbox"
          name={ `checkbox-music-${trackId}` }
          id={ `checkbox-music-${trackId}` }
          checked={ favorited }
          onChange={ handleFavoriteToggle }
          disabled={ loading }
        />
        <img
          src={ favorited ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
      {loading && <p>Carregando...</p>}
    </div>
  );
}

export default MusicCard;
