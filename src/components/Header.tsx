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
  const [userImage, setUserImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user.name !== userName || user.image !== userImage) {
        setUserName(user.name);
        setUserImage(user.image);
      }
      setIsLoading(false);
    };
    fetchUser();
    const intervalId = setInterval(fetchUser, 5000); // Fetch user data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [userName, userImage]);

  if (isLoading) return <Loading />;
  return (
    <header data-testid="header-component">
      <img src="src/images/image.png" alt="logo" className="logo" />
      <div className="links">
        <NavLink data-testid="link-to-search" to="/search">
          <HiSearch size={ 20 } style={ { marginRight: 10 } } />
          Pesquisa
        </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">
          <FaRegStar size={ 20 } style={ { marginRight: 10 } } />
          Favoritas
        </NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">
          <RiAccountCircleFill size={ 20 } style={ { marginRight: 10 } } />
          Perfil
        </NavLink>
      </div>
      <div className="user-info">
        {userImage ? (
          <img src={ userImage } alt="user" className="user-image" />
        ) : (
          <RiAccountCircleFill
            size={ 30 }
            style={ { textAlign: 'center', margin: '0 auto',
            } }
          />
        )}
        <p className="user-name" data-testid="header-user-name">
          {userName}
        </p>
      </div>
    </header>
  );
}

export default Header;
