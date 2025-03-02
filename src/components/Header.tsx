import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FaRegStar } from 'react-icons/fa';
import { RiAccountCircleFill } from 'react-icons/ri';
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
        <NavLink data-testid="link-to-search" to="/search">
          <HiSearch
            size={ 20 }
            style={ { marginRight: 10 } }
          />
          Pesquisa
        </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">
          <FaRegStar
            size={ 20 }
            style={ { marginRight: 10 } }
          />
          Favoritas
        </NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">
          <RiAccountCircleFill
            size={ 20 }
            style={ { marginRight: 10 } }
          />
          Perfil
        </NavLink>
      </div>

      <p
        className="user-name"
        data-testid="header-user-name"
        style={ { fontSize: '12px' } }
      >
        <RiAccountCircleFill
          size={ 20 }
          style={ { marginRight: 10 } }
        />
        {userName}
      </p>
    </header>
  );
}

export default Header;
