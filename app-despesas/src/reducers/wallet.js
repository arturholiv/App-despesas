// // Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_EXPENSE, REMOVE_EXPENSE, ADD_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
