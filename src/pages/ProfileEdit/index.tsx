import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { UserType } from '../../types';

function ProfileEdit() {
  const [loading, setLoading] = useState(true);
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
      setFormData(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const isFormValid = () => {
    const { name, email, image, description } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      name.trim() !== ''
      && emailPattern.test(email)
      && image.trim() !== ''
      && description.trim() !== ''
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(formData);
    setLoading(false);
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

  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h4>Editar perfil</h4>
          <form onSubmit={ handleSubmit }>
            <label htmlFor="name">
              Nome
              <input
                data-testid="edit-input-name"
                type="text"
                id="name"
                name="name"
                value={ formData.name }
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
                value={ formData.email }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="image">
              Foto
              <input
                type="text"
                data-testid="edit-input-image"
                id="image"
                name="image"
                value={ formData.image }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description"
                name="description"
                value={ formData.description }
                onChange={ handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ !isFormValid() }
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
