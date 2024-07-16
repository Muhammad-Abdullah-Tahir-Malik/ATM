import inquirer from "inquirer";

class ATM {
  private balance: number;

  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  checkBalance(): void {
    console.log(`Your current balance is: $${this.balance}`);
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than zero.");
      return;
    }
    this.balance += amount;
    console.log(`You have successfully deposited $${amount}.`);
    this.checkBalance();
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdrawal amount must be greater than zero.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds.");
      return;
    }
    this.balance -= amount;
    console.log(`You have successfully withdrawn $${amount}.`);
    this.checkBalance();
  }
}

const atm = new ATM(1000); // Initial balance set to $1000

async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Select an action:",
      choices: ["Check Balance", "Deposit Money", "Withdraw Money", "Exit"],
    },
  ]);

  switch (answers.action) {
    case "Check Balance":
      atm.checkBalance();
      break;
    case "Deposit Money":
      await depositMoney();
      break;
    case "Withdraw Money":
      await withdrawMoney();
      break;
    case "Exit":
      console.log("Thank you for using our ATM. Goodbye!");
      return;
  }

  await mainMenu();
}

async function depositMoney() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "amount",
      message: "Enter the amount to deposit:",
      validate: (value) => {
        const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
        return valid || "Please enter a valid amount.";
      },
      filter: Number,
    },
  ]);

  atm.deposit(answers.amount);
}

async function withdrawMoney() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "amount",
      message: "Enter the amount to withdraw:",
      validate: (value) => {
        const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
        return valid || "Please enter a valid amount.";
      },
      filter: Number,
    },
  ]);

  atm.withdraw(answers.amount);
}

mainMenu();
