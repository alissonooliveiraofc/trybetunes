import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { UserType } from '../../types';

function ProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const [buttonState, setButtonState] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setLoading(false);
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(formData);
    setButtonState(true);
    navigate('/profile');
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  return (
    <main>
      {loading && <Loading />}
      {user && (
        <div>
          <img
            data-testid="profile-image"
            src={ user.image }
            alt="user"
          />
          <h4>Editar perfil</h4>
          <form onSubmit={ handleSubmit }>
            <label htmlFor="name">
              Nome
              <input
                data-testid="edit-input-name"
                type="text"
                id="name"
                name="name"
                defaultValue={ user.name }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                data-testid="edit-input-email"
                id="email"
                name="email"
                defaultValue={ user.email }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description"
                name="description"
                defaultValue={ user.description }
                onChange={ handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              // disabled={ buttonState }
            >
              Salvar
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default ProfileEdit;
