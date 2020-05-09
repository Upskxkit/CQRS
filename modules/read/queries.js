class AccountQuery {
  constructor(account, operation) {
    this.account = account;
    this.operation = operation;
    this.rows = 0;
    const proto = Object.getPrototypeOf(this);

    if (proto.constructor === AccountQuery) {
      throw new Error("AccountQuery should not be instantiated");
    }
  }

  execute() {
    throw new Error("Need define execute method");
  }
}

class AccountSelect extends AccountQuery {
  execute(commands) {
    const result = [];
    for (const command of commands) {
      let condition = true;
      if (this.account) condition = command.account === this.account;
      if (command.operation) condition = condition && command.operation.constructor.name.toLowerCase() === this.operation;
      if (condition) result.push(command);
    }
    this.rows = result.length;
    return result;
  }
}

module.exports = {AccountSelect};
