"use strict";
const Bank = require("../bank");
const {Income, Withdraw, Create} = require("./commands");

class BankWrite {
  constructor(eventBus) {
    this.bank = new Bank();
    this.eventBus = eventBus;
    this.commands = [];
  }

  createAccount(name) {
    const command = new Create(name);
    command.execute(this.bank);

    this.commands.push(command);
    this.eventBus.emit('command', command);
  }

  operation(account, amount) {
    const operation = amount < 0 ? Withdraw : Income;
    const command = new operation(account, Math.abs(amount));
    this.commands.push(command);
    this.eventBus.emit('command', command);
    command.execute(this.bank);
  }
}

module.exports = BankWrite;
