const request = require('request');
const STOCK_API_BASE = 'https://api.iextrading.com/1.0/stock';
const MARKET_API = 'https://api.iextrading.com/1.0/market';

function get_market_data(cb) {
  request({
    url: `${MARKET_API}`,
    json: true
  }, (error, response, body) => {
    if (error) cb(error); else cb(null, body);
  });

}

function do_for_symbol(action = 'quote', symbol, cb) {
  if (!symbol) {
    throw new Error('No symbol specified.');
  }

  let iex_stock_actions = {
    quote: 'quote',
    chart: 'chart',
    company: 'company',
    stats: 'stats',
    news: 'news',
    financials: 'financials',
    earnings: 'earnings',
    logo: 'logo',
    price: 'price',
    'delayed-quote' : 'delayed-quote',
  }

  if (action in iex_stock_actions) {
    action = iex_stock_actions[action];
  }

  request({
    url: `${STOCK_API_BASE}/${symbol}/${action}`,
    json: true
  }, (error, response, body) => {
    if (error) cb(error); else cb(null, body);
  });
}

module.exports = exports = {
  do_for_symbol,
  get_market_data
}
