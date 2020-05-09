class AccountCommand {
  constructor(account, amount = 0) {
    this.account = account;
    this.amount = amount;

    const proto = Object.getPrototypeOf(this);

    if (proto.constructor === AccountCommand) {
      throw new Error("AccountCommand should not be instantiated");
    }
  }

  execute() {
    throw new Error("Need define execute method");
  }
}

class Withdraw extends AccountCommand {
  execute(bank) {
    const account = bank.find(this.account);
    account.balance -= this.amount;
  }
}

class Income extends AccountCommand {
  execute(bank) {
    const account = bank.find(this.account);
    account.balance += this.amount;
  }
}

class Create extends AccountCommand {
  execute(bank) {

    let account = bank.find(this.account);
    if (!account) bank.createAccount(this.account);
  }
}

module.exports = {Withdraw, Income, Create};
