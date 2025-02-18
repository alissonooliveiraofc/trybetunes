import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading';
import { AlbumType } from '../../types';

function Search() {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchValue(value);
    if (value.length >= 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  async function handleClick() {
    setErrorApi('');
    setLoading(true);
    setApiData(null);
    setArtist('');

    const data = await searchAlbumsAPI(searchValue);

    setArtist(searchValue);
    setLoading(false);

    if (data.length === 0) {
      setErrorApi('Nenhum álbum foi encontrado');
    } else {
      setApiData(data);
    }

    setSearchValue('');
    return apiData;
  }

  const [disabled, setDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState('');
  const [errorApi, setErrorApi] = useState('');

  const [apiData, setApiData] = useState<AlbumType[] | null>();

  return (
    <div>
      <input
        type="text"
        data-testid="search-artist-input"
        onChange={ (event) => onChange(event) }
        value={ searchValue }
        name="searchValue"
      />

      <button
        data-testid="search-artist-button"
        disabled={ disabled }
        onClick={ handleClick }
      >
        Pesquisar
      </button>

      {loading ? (
        <Loading />
      ) : null}

      {artist && (
        <p>
          Resultado de álbuns de:
          {' '}
          {artist}
        </p>
      )}

      {errorApi && !loading && (
        <p>{errorApi}</p>
      )}
      {apiData && (
        <ul>
          {apiData.map((album) => (
            <li key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{album.collectionName}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default Search;
