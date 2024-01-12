//Finds all the elements needed for ths functions

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
const outputContainer = document.getElementById(
  "outputContainer"
) as HTMLButtonElement;
const totalSumOfLoan = document.getElementById(
  "totalSumOfLoan"
) as HTMLButtonElement;
const interestExpenseParagraph = document.getElementById(
  "interestExpenseParagraph"
) as HTMLButtonElement;
const amortizationPlan = document.getElementById(
  "amortizationPlan"
) as HTMLButtonElement;
const monthCounter = document.getElementById(
  "monthCounter"
) as HTMLButtonElement;
const amortizationPerMonth = document.getElementById(
  "amortizationPerMonth"
) as HTMLButtonElement;
const interestExpensePerMonth = document.getElementById(
  "interestExpensePerMonth"
) as HTMLButtonElement;
const PaymentPerMonth = document.getElementById(
  "PaymentPerMonth"
) as HTMLButtonElement;
const remainingDebt = document.getElementById(
  "remainingDebt"
) as HTMLButtonElement;

//Various variables needed for checking
let monthlyCost: number = 0;

const loanAmountUpperLimit: number = 10000000;
const loanAmountLowerLimit: number = 10000;
const interestRateUpperLimit: number = 30;
const interestRateLowerLimit: number = 0.1;
const monthlyPaymentsUpperLimit: number = 600;
const monthlyPaymentsLowerLimit: number = 0;

//Initial function that calculates the monthly cost
function calculatePaymentPlan(): void {
  //Removes the error message (present or not)
  errorMessage.innerHTML = "";
  //Goes through every child of outputContainer that's a paragraph and removes its text content
  let resetOutputTags: NodeListOf<HTMLParagraphElement> =
    outputContainer.querySelectorAll("p");
  resetOutputTags.forEach((childElement) => {
    childElement.textContent = "";
  });
  //Removes the need for a specific character to be used for the calculations to run correctly
  interestRateInput.value = interestRateInput.value.replace(",", ".");
  //Input takes in a string, this converts the string into a number.
  //Returns NaN if it's only text, surprisingly works fine even if a letter is added at the end.
  let loanAmount: number = parseFloat(loanAmountInput.value);
  let interestRate: number = parseFloat(interestRateInput.value);
  let monthlyInterestRate: number = interestRate / 1200;
  let monthlyPayments: number = parseFloat(monthlyPaymentsInput.value);

  //Multiple to checks to see that stuff is inside of their allowed values and to see if they're even numbers to begin with
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

  //Calculation for the monthly cost
  monthlyCost =
    loanAmount *
    (monthlyInterestRate *
      (Math.pow(1 + monthlyInterestRate, monthlyPayments) /
        (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1)));

  //To break up the function I added another one for rendering, takes all needed values for the payment plan
  renderPaymentPlan(
    loanAmount,
    monthlyInterestRate,
    monthlyCost,
    monthlyPayments
  );
}

function renderPaymentPlan(
  loanAmount: number,
  monthlyInterestRate: number,
  monthlyCost: number,
  monthlyPayments: number
): void {
  //A few variables that are needed later
  let interestExpense: number = 0;
  let originalLoanAmount: number = loanAmount;
  interestExpense = 0;
  let payment: number = 0;

  //Creates the column names
  let monthTracker: HTMLElement = document.createElement("p");
  monthTracker.textContent = "Månad";
  monthCounter.appendChild(monthTracker);
  let amortizationTracker: HTMLElement = document.createElement("p");
  amortizationTracker.textContent = "Amortering";
  amortizationPerMonth.appendChild(amortizationTracker);
  let interestExpensePerTracker: HTMLElement = document.createElement("p");
  interestExpensePerTracker.textContent = "Räntekostnad";
  interestExpensePerMonth.appendChild(interestExpensePerTracker);
  let PaymentTracker: HTMLElement = document.createElement("p");
  PaymentTracker.textContent = "Inbetalning";
  PaymentPerMonth.appendChild(PaymentTracker);
  let remainingDebtTracker: HTMLElement = document.createElement("p");
  remainingDebtTracker.textContent = "Restskuld";
  remainingDebt.appendChild(remainingDebtTracker);

  for (let i: number = 0; i < monthlyPayments; i++) {
    //New elements have to be created for more than one to be displayed
    let monthTracker: HTMLElement = document.createElement("p");
    let amortizationTracker: HTMLElement = document.createElement("p");
    let interestExpensePerTracker: HTMLElement = document.createElement("p");
    let PaymentTracker: HTMLElement = document.createElement("p");
    let remainingDebtTracker: HTMLElement = document.createElement("p");
    //More calculations that will later render
    interestExpense += loanAmount * monthlyInterestRate;
    payment = monthlyCost - loanAmount * monthlyInterestRate;
    loanAmount -= monthlyCost - loanAmount * monthlyInterestRate;
    //Renders months, i+1 since i starts at 0
    monthTracker.textContent = (i + 1).toString();
    monthCounter.appendChild(monthTracker);
    //Amortization
    amortizationTracker.textContent = monthlyCost.toFixed(2).toString();
    amortizationPerMonth.appendChild(amortizationTracker);
    //Interest expense
    interestExpensePerTracker.textContent = (monthlyCost - payment)
      .toFixed(2)
      .toString();
    interestExpensePerMonth.appendChild(interestExpensePerTracker);
    //Payment
    PaymentTracker.textContent = payment.toFixed(2).toString();
    PaymentPerMonth.appendChild(PaymentTracker);
    //Remaining debt
    remainingDebtTracker.textContent = loanAmount.toFixed(2).toString();
    remainingDebt.appendChild(remainingDebtTracker);
  }
  //Lastly appends total cost and total interest expenses.
  totalSumOfLoan.textContent =
    "Din totalkostnaden är: " +
    (originalLoanAmount + interestExpense).toFixed(2).toString();
  interestExpenseParagraph.textContent =
    "Din totala räntekostnad är: " + interestExpense.toFixed(2).toString();
}
