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

  const [disabled, setDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const data = await searchAlbumsAPI(searchValue);
      setLoading(false);
      // setApiResponse(data);
      console.log(data);
    };

    if (loading) { fetchApi(); }
  }, [searchValue, loading, apiResponse]);
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
        onClick={ () => setLoading(true) }
      >
        Pesquisar
      </button>

      {loading ? (
        <Loading />
      ) : null}
    </div>
  );
}

export default Search;
