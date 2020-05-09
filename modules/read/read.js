"use strict";

const Bank = require("../bank");
const {AccountSelect} = require("./queries");

class BankRead {
  constructor(eventBus) {
    this.commands = [];
    this.queries = [];
    this.bank = new Bank();
    eventBus.on('command', command => {
      this.commands.push(command);

      command.execute(this.bank);
    });
  }

  select({account, operation}) {
    const query = new AccountSelect(account, operation);
    this.queries.push(query);

    return query.execute(this.commands).map(({amount, account, constructor}) => ({
      account,
      amount,
      operation: constructor.name
    }));
  }

  getAccount(name) {
    return this.bank.find(name);
  }
}

module.exports = BankRead;
