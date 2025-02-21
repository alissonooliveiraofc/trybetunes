import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

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
    <main>
      { allAlbuns && (
        <div>
          <img src={ allAlbuns[0].artworkUrl60 } alt="" />
          <h1 data-testid="album-name">{allAlbuns[0].collectionName}</h1>
          <h2 data-testid="artist-name">{allAlbuns[0].artistName}</h2>
        </div>
      )}
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
    </main>

  );
}

export default Album;
