import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          {user && (
            <div>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt="user"
              />

            </div>
          )}
        </div>

      </div>

      <div className="result-container2" />
      {loading && <Loading />}
      {user && (
        <div className="profile-info">
          <img
            data-testid="profile-image"
            src={ user.image }
            alt="user"
          />
          <Link to="/profile/edit">Editar perfil</Link>
          <h4>Nome</h4>
          <p>{user.name}</p>

          <h4>Email</h4>
          <p>{user.email}</p>

          <h4>Descrição</h4>
          <p>{user.description}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
