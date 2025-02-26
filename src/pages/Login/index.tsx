import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createUser } from '../../services/userAPI';
import './styles.css';

function Login() {
  const navigate = useNavigate();

  const [button, setButton] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { value } = target;

    if (value.length >= 3) {
      setButton(false);
      setName(value);
    } else { setButton(true); }
  }

  useEffect(() => {
    const fetchData = async () => {
      await createUser({ name });
      setLoading(false);
      navigate('/search');
    };
    if (loading) {
      fetchData();
    }
  }, [loading, name, navigate]);

  function onClick() {
    setLoading(true);
  }

  return (
    <div className="login">
      {loading ? <h2>Carregando...</h2> : (
        <main>
          <img src="src/images/image.png" alt="" />
          <input
            type="text"
            placeholder="Digite seu nome"
            name="name"
            data-testid="login-name-input"
            onChange={ onChange }
          />
          <button
            data-testid="login-submit-button"
            disabled={ button }
            onClick={ onClick }
          >
            Entrar
          </button>
        </main>
      )}
    </div>
  );
}

export default Login;
