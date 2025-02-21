import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search">Pesquisa</NavLink>
      <NavLink data-testid="link-to-favorites" to="/favorites">Favoritas</NavLink>
      <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>

      <p data-testid="header-user-name">
        Bem vindo(a)
        {' '}
      </p>
    </header>
  );
}

export default Header;
