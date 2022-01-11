import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderColumns = this.renderColumns.bind(this);
    this.changeUSDandEUR = this.changeUSDandEUR.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.deleteExpenseFunc = this.deleteExpenseFunc.bind(this);
  }

  deleteExpenseFunc({ current, remove }) {
    const { deleteExpenseDispatch } = this.props;
    const expenses = current.filter((expense) => expense.id !== remove.id);
    deleteExpenseDispatch(expenses);
  }

  changeUSDandEUR(currency) {
    if (currency === 'USD') {
      return 'Dólar Comercial';
    } if (currency === 'EUR') {
      return 'Euro';
    }
    return currency;
  }

  renderRows() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => (
        <tr
          key={ expense.id }
        >
          <td>
            { expense.description }
          </td>
          <td>
            { expense.tag }
          </td>
          <td>
            { expense.method }
          </td>
          <td>
            { expense.value }
          </td>
          <td>
            { this.changeUSDandEUR(expense.currency) }
          </td>
          <td>
            { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
          </td>
          <td>
            { parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2) }
          </td>
          <td>
            Real
          </td>

          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={
                () => this.deleteExpenseFunc({ remove: expense, current: expenses })
              }
            >
              Deletar
            </button>
          </td>
        </tr>
      ))
    );
  }

  renderColumns() {
    const columns = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return columns.map((item) => (
      <th
        key={ item }
      >
        { item }
      </th>
    ));
  }

  render() {
    return (
      <div className="table-wrapper">
        <table
          border="1"
          className="fl-table"
        >
          <thead>
            <tr>
              { this.renderColumns() }
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDispatch: (expense) => dispatch(removeExpense(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

// ref.: https://github.com/tryber/sd-015-b-project-trybewallet/pull/111/commits/b9928dcd66de5f5858f84a647cc9f8b7b4b72863 para fazer a tabela
// Logica de remover despesa ref.: https://github.com/tryber/sd-015-b-project-trybewallet/pull/114/commits/cf4414032348ef3df1b81244c298392cffe86794
