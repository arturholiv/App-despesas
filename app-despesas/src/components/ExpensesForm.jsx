import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpense, addCurrencies } from '../actions/index';
import fetchCurrencies from '../services/fetchCurrencies';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    // this.getCurrencies = this.getCurrencies.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    this.getCurrencies(); // toda vez que entra na pag faz essa chamada à função que retorna a resposta do fetch da api de currencies
  }

  async getCurrencies() {
    const { saveCurrencies } = this.props;
    const response = await fetchCurrencies();
    const currencies = Object.keys(response);
    // console.log(currencies);
    // this.setState({
    //   currencies,
    // });
    saveCurrencies(currencies);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async addExpense(event) {
    event.preventDefault();
    const { id, value, currency, description, method, tag } = this.state;
    const exchangeRates = await fetchCurrencies(); // returna a chamada da api no momento para salval o vlaor do câmbio na hora que adiciona
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const { dispatchExpense } = this.props;
    dispatchExpense(newExpense);
    this.setState({
      id: newExpense.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  methodSelectorInput() {
    return (
      <label htmlFor="method-input">
        Forma de pagamento:
        <select
          name="method"
          data-testid="method-input"
          id="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagSelectorInputs() {
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          name="tag"
          data-testid="tag-input"
          id="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderCurrenciesOptions() { // Pega as moedas da API salvos no estado do Redux
    const { currencies } = this.props;
    return currencies.filter((currency) => currency !== 'USDT').map((currency, index) => (
      <option key={ index } value={ currency } data-testid={ currency }>
        {currency}
      </option>));
  }

  render() {
    const { currency } = this.state;
    return (
      <form onSubmit={ (event) => this.addExpense(event) } className="expenses-form">
        <label htmlFor="description-input">
          Descrição:
          <input
            type="textarea"
            name="description"
            onChange={ this.handleChange }
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <label htmlFor="value-input">
          Valor da Despesa:
          <input
            type="text"
            name="value"
            onChange={ this.handleChange }
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
            type="select"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
          >
            { this.renderCurrenciesOptions() }
          </select>
        </label>
        {this.tagSelectorInputs()}
        {this.methodSelectorInput()}
        <button
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (items) => dispatch(addCurrencies(items)),
  dispatchExpense: (newExpense) => dispatch(saveExpense(newExpense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  saveCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
