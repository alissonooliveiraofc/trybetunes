import { SongType } from '../types';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>

      </audio>
      <label htmlFor="" data-testid={ `checkbox-music-${trackId}` }>
        <input type="checkbox" name="" id="" />
      </label>
    </div>
  );
}

export default MusicCard;
