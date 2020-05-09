class BankAccount {
  constructor(name) {
    this.name = name;
    this.balance = 0;
  }
}

class Bank {
  constructor() {
    this.accounts = new Map();
  }

  createAccount(name) {
    const account = new BankAccount(name);
    this.accounts.set(name, account);
  }

  find(name) {
    return this.accounts.get(name);
  }
}

module.exports = Bank;
