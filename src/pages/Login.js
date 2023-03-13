import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
    isLoading: false,
    willRedirect: false,
  };

  handleNameChange = ({ target }) => {
    const MIN_LENGTH = 3;
    const name = target.value;
    const isButtonDisabled = name.length < MIN_LENGTH;
    this.setState({ name, isButtonDisabled });
  };

  handleButtonClick = async (event) => {
    const { name } = this.state;
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await createUser({ name });
      this.setState({ willRedirect: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { name, isButtonDisabled, willRedirect, isLoading } = this.state;

    if (willRedirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.handleButtonClick }>
          <label htmlFor="page-login">Nome:</label>
          <input
            type="text"
            id="page-login"
            value={ name }
            onChange={ this.handleNameChange }
            data-testid="login-name-input"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled || isLoading }
            data-testid="login-submit-button"
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
