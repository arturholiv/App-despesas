import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loginEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInputText: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  render() {
    const { password, emailInputText } = this.state;
    const { dispatchUserEmail } = this.props;
    const minPasswordLength = 6;
    return (
      <div className="whole-login-page">
        <h1>
          App de despesas
        </h1>
        <p>Carteira de conversão de moedas para Real</p>
       <div className="login-page">
        <form className="login-page">
          <label
            htmlFor="email-input"
            className="form__label"
          >
            <input
              type="email"
              name="emailInputText"
              placeholder="Email"
              data-testid="email-input"
              required
              className="form__field"
              onChange={ this.handleChange }
            />
          </label>

          <label
            htmlFor="password-input"
            className="form__label"
          >
            <input
              type="password"
              name="password"
              minLength="6"
              placeholder="Senha"
              data-testid="password-input"
              required
              className="form__field"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="submit"
              className="enter-btn"
              disabled={ !(this.validateEmail(emailInputText)
              && password.length >= minPasswordLength) }
              onClick={ () => dispatchUserEmail(emailInputText) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
      </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(loginEmail(email)),
});

Login.propTypes = {
  dispatchUserEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
