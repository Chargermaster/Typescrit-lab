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
const errorMessage = document.getElementById(
  "errorMessage"
) as HTMLParagraphElement;

let monthlyCost: number = 0;
let interestExpense: number = 0;

const loanAmountUpperLimit: number = 10000000;
const loanAmountLowerLimit: number = 10000;
const interestRateUpperLimit: number = 30;
const interestRateLowerLimit: number = 0.1;
const monthlyPaymentsUpperLimit: number = 600;
const monthlyPaymentsLowerLimit: number = 0;

function calculatePaymentPlan(): void {
  errorMessage.innerHTML = "";
  interestRateInput.value = interestRateInput.value.replace(",", ".");
  let loanAmount: number = parseFloat(loanAmountInput.value);
  let interestRate: number = parseFloat(interestRateInput.value);
  let monthlyInterestRate: number = interestRate / 1200;
  let monthlyPayments: number = parseFloat(monthlyPaymentsInput.value);
  console.log(loanAmount);

  if (Number.isNaN(loanAmount) === true) {
    errorMessage.textContent = "Lånemängd måste vara ett nummer.";
    return;
  } else if (Number.isNaN(interestRate) === true) {
    errorMessage.textContent = "Räntesatsen måste vara ett nummer.";
    return;
  } else if (Number.isNaN(monthlyPayments) === true) {
    errorMessage.textContent = "Månadsbetalningar måste vara ett nummer.";
    return;
  }

  if (loanAmountLowerLimit > loanAmount || loanAmountUpperLimit < loanAmount) {
    if (loanAmountUpperLimit < loanAmount) {
      errorMessage.textContent = "Lånemängden får max vara 10 miljoner.";
      return;
    } else {
      errorMessage.textContent = "Lånemängden får minst vara 10000";
      return;
    }
  }

  if (
    interestRateLowerLimit > interestRate ||
    interestRateUpperLimit < interestRate
  ) {
    if (interestRateUpperLimit < interestRate) {
      errorMessage.textContent = "Räntesatsen får max vara 30% miljoner.";
      return;
    } else {
      errorMessage.textContent = "Räntesatsen får minst vara 0.1%";
      return;
    }
  }

  if (
    monthlyPaymentsLowerLimit >= monthlyPayments ||
    monthlyPaymentsUpperLimit < monthlyPayments
  ) {
    if (monthlyPaymentsUpperLimit < monthlyPayments) {
      errorMessage.textContent =
        "Låneperioden får max vara 600 månader (50 år).";
      return;
    } else {
      errorMessage.textContent = "Låneperioden måste vara över 0";
      return;
    }
  }
  monthlyCost =
    loanAmount *
    (monthlyInterestRate *
      (Math.pow(1 + monthlyInterestRate, monthlyPayments) /
        (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1)));
  console.log(Math.ceil(monthlyCost));
  interestExpense = loanAmount * monthlyInterestRate * monthlyPayments;
  //Orginal beloppet - interestExpense = räntekostnaden över hela låneperioden
  console.log(interestExpense);
  console.log(Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1);
  console.log(Math.pow(1 + monthlyInterestRate, monthlyPayments));
  console.log(
    (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1) /
      Math.pow(1 + monthlyInterestRate, monthlyPayments)
  );
}
