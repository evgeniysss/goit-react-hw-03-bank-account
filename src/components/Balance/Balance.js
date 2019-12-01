import React from 'react';
import PropTypes from 'prop-types';
import stylesBalance from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={stylesBalance.balance}>
    <span>
      <span className={stylesBalance.income}>&#8593;</span>
      {income}$
    </span>
    <span>
      <span className={stylesBalance.expenses}>&#8595;</span>
      {expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
