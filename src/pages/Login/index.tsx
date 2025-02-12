import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../../services/userAPI';

function Login() {
  const navigate = useNavigate();
  const [button, setButton] = useState(true);
  const [name, setName] = useState('');

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { value } = target;

    if (value.length >= 3) {
      setButton(false);
      setName(value);
    } else { setButton(true); }
  }

  function onClick() {
    const user = { name };
    createUser(user);
    navigate('/search');
  }

  return (
    <main>
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
  );
}

export default Login;
