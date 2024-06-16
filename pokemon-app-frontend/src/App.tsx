import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PokemonDetail from './components/PokemonDetail';
import Search from './components/Search';
import CaughtPokemons from './components/CaughtPokemons';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/caught" element={<CaughtPokemons />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
