/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v1';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const saved = localStorage.getItem('transactions');
    const localBalance = localStorage.getItem('balance');
    if (saved) {
      const transactions = JSON.parse(saved);
      this.setState({ transactions });
    }
    if (localBalance) {
      const balance = JSON.parse(localBalance);
      this.setState({ balance });
    }
  }

  componentDidUpdate(prevState) {
    const { transactions, balance } = this.state;
    if (prevState.tasks !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  // componentDidMount() {
  //   const saved = localStorage.getItem('transactions');
  //   if (saved) {
  //     const transactions = JSON.parse(saved);
  //     this.setState({ transactions });
  //   }
  // }

  // componentDidUpdate(prevState) {
  //   const { transactions } = this.state;
  //   if (prevState.tasks !== transactions) {
  //     localStorage.setItem('transactions', JSON.stringify(transactions));
  //   }
  // }

  onDeposit = moneyTransaction => {
    if (moneyTransaction === 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const newOnDeposit = {
      id: uuid(),
      type: 'deposit',
      amount: moneyTransaction,
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [newOnDeposit, ...state.transactions],
      balance: state.balance + moneyTransaction,
    }));
    // return '';
  };

  onWithdraw = moneyTransaction => {
    if (moneyTransaction === 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (moneyTransaction > this.state.balance) {
      return toast.error(
        'На счету недостаточно средств для проведения операции!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    }
    const newWithdraw = {
      id: uuid(),
      type: 'withdraw',
      amount: moneyTransaction,
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [newWithdraw, ...state.transactions],
      balance: state.balance - moneyTransaction,
    }));
  };

  render() {
    const { transactions, balance } = this.state;

    const income = transactions.reduce(
      (acc, item) => (item.type === 'deposit' ? acc + item.amount : acc),
      0,
    );

    const expenses = transactions.reduce(
      (acc, item) => (item.type === 'withdraw' ? acc + item.amount : acc),
      0,
    );

    return (
      <>
        <div className={styles.dashboardContainer}>
          <div className={styles.blueBox}>
            <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
          </div>
          <Balance balance={balance} income={income} expenses={expenses} />
          <div className={styles.transactionHistoryBox}>
            <TransactionHistory items={transactions} />
          </div>
          <ToastContainer />
        </div>
      </>
    );
  }
}
