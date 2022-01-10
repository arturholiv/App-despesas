import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.totalSum = this.totalSum.bind(this);
  }

  totalSum() {
    const { wallet: { expenses } } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total += Number(expense.value * (expense.exchangeRates[expense.currency].ask));
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h2>Carteira de despesas</h2>
        <h3 data-testid="total-field">
          Despesa total: R$
          {this.totalSum()}
        </h3>
        <p data-testid="email-field">{ email }</p>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Header);
