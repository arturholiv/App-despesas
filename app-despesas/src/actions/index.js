export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export default function loginEmail(email) {
  return {
    type: LOGIN_EMAIL,
    email,
  };
}

export function saveExpense(payload) {
  return {
    type: SAVE_EXPENSE,
    payload,
  };
}

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export function removeExpense(payload) {
  return {
    type: REMOVE_EXPENSE,
    payload,
  };
}
