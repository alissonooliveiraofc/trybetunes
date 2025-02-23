import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUserName(user.name);
      setIsLoading(false);
    };
    fetchUser();
  }, [userName]);

  if (isLoading) return <Loading />;
  return (

    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search">Pesquisa</NavLink>
      <NavLink data-testid="link-to-favorites" to="/favorites">Favoritas</NavLink>
      <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>

      <p data-testid="header-user-name">
        Bem vindo(a)
        {' '}
        {userName}
      </p>
    </header>
  );
}

export default Header;
