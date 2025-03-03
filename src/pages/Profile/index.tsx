import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { UserType } from '../../types';
import './styles.css';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, [user]);

  return (
    <div className="search-container">
      <div className="input-container">
        <div className="album-info">
          {user?.image ? (
            <div>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt="user"
              />
            </div>
          ) : (
            <RiAccountCircleFill
              size={ 350 }
              style={ {
                color: '#d3d3d3', // light gray color
                position: 'absolute',
                top: '50px',
                left: '300px',
              } }
            />
          )}
        </div>

      </div>

      <div className="result-container2" />
      {loading && <Loading />}
      {user && (
        <div className="profile-info">

          <h4>Nome</h4>
          <p>

            {user.name}
          </p>

          <h4>Email</h4>
          <p>{user.email}</p>

          <h4>Descrição</h4>
          <p>{user.description}</p>

          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
