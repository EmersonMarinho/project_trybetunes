/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    isLoading: true,
    user: {},
  };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({ user, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, user } = this.state;

    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li><Link to="/search">Buscar</Link></li>
            <li><Link to="/album/:id">Album</Link></li>
            <li><Link to="/favorites">Favoritos</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/profile/edit">Editar Perfil</Link></li>
          </ul>
        </nav>
        {isLoading ? (<p>Carregando...</p>)
          : (<p data-testid="header-user-name">
            Ola,
            {' '}
            {user.name}
            !
          </p>
          )}
      </header>
    );
  }
}

export default Header;
