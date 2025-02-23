import { useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  const [favorited, setFavorited] = useState<boolean>(false);

  const handleFavoriteToggle = () => {
    setFavorited(!favorited);
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
        />
        <img
          src={ favorited ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
