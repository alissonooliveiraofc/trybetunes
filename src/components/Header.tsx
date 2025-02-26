import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

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
      <img src="src/images/image.png" alt="" />
      <div className="links">
        <NavLink data-testid="link-to-search" to="/search">Pesquisa</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritas</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      </div>

      <p data-testid="header-user-name">
        {/* {' '} */}
        {userName}
      </p>
    </header>
  );
}

export default Header;
