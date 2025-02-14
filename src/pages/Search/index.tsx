import { useState, useEffect } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading';

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

  function handleClick() {
    setSearchValue('');
  }
  const [disabled, setDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState('false');

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

    </div>
  );
}

export default Search;
