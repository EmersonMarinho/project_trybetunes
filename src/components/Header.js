import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadMessage from './LoadMessage';

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
            <li><Link to="/search" data-testid="link-to-search">Buscar</Link></li>
            <li><Link to="/album/:id">Album</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
            <li><Link to="/profile/edit">Editar Perfil</Link></li>
          </ul>
        </nav>
        {isLoading ? (<LoadMessage />)
          : (<p data-testid="header-user-name">{user.name}</p>)}
      </header>
    );
  }
}

export default Header;
