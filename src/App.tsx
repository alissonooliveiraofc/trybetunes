import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
      </Route>

    </Routes>
  );
}

export default App;
