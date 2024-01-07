const loanAmountInput = document.getElementById(
  "loanAmount"
) as HTMLInputElement;
const interestRateInput = document.getElementById(
  "interestRate"
) as HTMLInputElement;
const monthlyPaymentsInput = document.getElementById(
  "monthlyPayments"
) as HTMLInputElement;
const submitButton = document.getElementById(
  "submitButton"
) as HTMLButtonElement;
submitButton.addEventListener("click", calculatePaymentPlan);
// let loanAmount: number;
// let interestRate: number;
// let monthlyPayments: number;
let m: number = 0;
let interestExpense: number = 0;

function calculatePaymentPlan(): void {
  let loanAmount: number = parseFloat(loanAmountInput.value);
  let interestRate: number = parseFloat(interestRateInput.value);
  let monthlyInterestRate: number = interestRate / 1200;
  let monthlyPayments: number = parseFloat(monthlyPaymentsInput.value);
  m =
    loanAmount *
    (monthlyInterestRate *
      (Math.pow(1 + monthlyInterestRate, monthlyPayments) /
        (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1)));
  console.log(Math.ceil(m));
  interestExpense = loanAmount * monthlyInterestRate * monthlyPayments;
  console.log(interestExpense);
  console.log(Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1);
  console.log(Math.pow(1 + monthlyInterestRate, monthlyPayments));
  console.log(
    (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1) /
      Math.pow(1 + monthlyInterestRate, monthlyPayments)
  );
}
