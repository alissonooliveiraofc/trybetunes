import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import './styles.css';

function Album() {
  const { id } = useParams();
  const [allAlbuns, setAllAlbuns] = useState<any[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusics = async () => {
      if (id) {
        const albums = await getMusics(id);
        setAllAlbuns(albums);
        setLoading(false);
      }
    };
    fetchMusics();
  }, [id]);

  return (
    <div className="search-container">
      <div className="input-container">
        { allAlbuns && (
          <div className="album-info">
            <img
              src={ allAlbuns[0].artworkUrl100 }
              alt=""
              style={ {
                width: '170px',
                height: '170px',
              } }
            />
            <h1 data-testid="album-name">{allAlbuns[0].collectionName}</h1>
            <h2 data-testid="artist-name">{allAlbuns[0].artistName}</h2>
          </div>
        )}

      </div>

      <div className="result-container">
        { allAlbuns && allAlbuns.slice(1).map((album) => (
          <div key={ album.trackName }>
            <MusicCard
              trackName={ album.trackName }
              trackId={ album.trackId }
              previewUrl={ album.previewUrl }
            />
          </div>
        ))}
        {loading && <Loading />}
      </div>
    </div>

  );
}

export default Album;
