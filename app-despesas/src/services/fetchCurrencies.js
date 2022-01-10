const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  // delete jsonResponse.USDT; // DELETA usdt que pede no req 5 ref.: https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
  return jsonResponse;
};

export default fetchCurrencies;
