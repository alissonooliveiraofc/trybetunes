import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading';
import { AlbumType } from '../../types';
import './styles.css';

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
    <div className="search-container">
      <div className="input-container">
        <input
          className="search-input"
          type="text"
          data-testid="search-artist-input"
          onChange={ (event) => onChange(event) }
          value={ searchValue }
          name="searchValue"
          placeholder="Digite sua Pesquisa"
        />

        <button
          data-testid="search-artist-button"
          disabled={ disabled }
          onClick={ handleClick }
          className="search-button"
        >
          Pesquisar
        </button>
      </div>

      {artist && (
        <p
          style={ { textAlign: 'center',
            fontFamily: 'Josefin Sans',
            marginTop: '50px' } }
        >
          Resultado de álbuns de:
          {' '}
          {artist}
        </p>
      )}
      <div className="result-container">

        {loading ? (
          <Loading />
        ) : null}

        {errorApi && !loading && (
          <p>{errorApi}</p>
        )}
        {apiData && (
          <ul className="link-list">
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

    </div>
  );
}

export default Search;
