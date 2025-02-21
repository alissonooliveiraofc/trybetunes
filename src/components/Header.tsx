import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search" />
      <NavLink data-testid="link-to-favorites" to="/favorites" />
      <NavLink data-testid="link-to-profile" to="/profile" />

      <p>
        Bem vindo(a)
        {' '}
      </p>
    </header>
  );
}

export default Header;
