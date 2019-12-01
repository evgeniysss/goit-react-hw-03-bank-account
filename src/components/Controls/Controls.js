import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesControls from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    amount: '', // текущее значение инпута
  };

  handleInputChange = transactionInputValue => {
    const { name, value } = transactionInputValue.target;
    this.setState({ [name]: value });
  };

  onDeposit = () => {
    const { onDeposit } = this.props;
    onDeposit(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  onWithdraw = () => {
    const { onWithdraw } = this.props;
    onWithdraw(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={stylesControls.controls}>
        <input
          className={stylesControls.input}
          onChange={this.handleInputChange}
          type="number"
          name="amount"
          value={amount}
        />
        <button
          className={stylesControls.button}
          onClick={this.onDeposit}
          type="button"
        >
          Deposit
        </button>
        <button
          className={stylesControls.button}
          onClick={this.onWithdraw}
          type="button"
        >
          Withdraw
        </button>
      </section>
    );
  }
}
