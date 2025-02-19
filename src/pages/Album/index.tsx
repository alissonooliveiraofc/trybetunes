import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';

function Album() {
  const { id } = useParams();
  const [allAlbuns, setAllAlbuns] = useState<any[]>([]);

  useEffect(() => {
    const fetchMusics = async () => {
      if (id) {
        const albums = await getMusics(id);
        setAllAlbuns(albums);
        // console.log(allAlbuns);
      }
    };
    fetchMusics();
  }, [id, allAlbuns]);

  return (
    <h1>Album</h1>

  );
}

export default Album;
