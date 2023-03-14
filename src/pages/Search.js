import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadMessage from '../components/LoadMessage';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
    isLoading: false,
    albums: [],
    searchedArtist: '',
    message: '',
  };

  handleInputChange = ({ target }) => {
    const name = target.value;
    const isButtonDisabled = name.length < 2;
    this.setState({ name, isButtonDisabled });
  };

  handleSearchClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ isLoading: true, searchedArtist: name, message: '' });

    try {
      const albums = await searchAlbumsAPI(name);

      if (albums.length > 0) {
        this.setState({ albums });
      } else {
        this.setState({ message: 'Nenhum álbum foi encontrado' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false, name: '' });
    }
  };

  render() {
    const {
      name,
      isButtonDisabled,
      isLoading,
      albums,
      searchedArtist,
      message,
    } = this.state;

    return (
      <div data-testid="page-search">
        <form onSubmit={ this.handleSearchClick }>
          <label htmlFor="search-artist-input">Nome do artista:</label>
          <input
            type="text"
            id="search-artist-input"
            value={ name }
            onChange={ this.handleInputChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled || isLoading }
            data-testid="search-artist-button"
          >
            {isLoading ? <LoadMessage /> : 'Pesquisar'}
          </button>
        </form>
        {searchedArtist && (
          <p>
            Resultado de álbuns de:
            {' '}
            {searchedArtist}
          </p>
        )}
        {message && <p>{message}</p>}
        <div>
          {albums.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <h2>{album.collectionName}</h2>
              <p>{album.artistName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
