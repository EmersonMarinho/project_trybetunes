import React, { Component } from 'react';

class Search extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
  };

  handleInputChange = (event) => {
    const name = event.target.value;
    const isButtonDisabled = name.length < 2;
    this.setState({ name, isButtonDisabled });
  };

  render() {
    const { name, isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-artist-input">Nome do artista:</label>
          <input
            type="text"
            id="search-artist-input"
            value={ name }
            onChange={ this.handleInputChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
