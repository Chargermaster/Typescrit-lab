"use strict";
const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const monthlyPaymentsInput = document.getElementById("monthlyPayments");
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", calculatePaymentPlan);
const errorMessage = document.getElementById("errorMessage");
const outputContainer = document.getElementById("outputContainer");
const totalSumOfLoan = document.getElementById("totalSumOfLoan");
const interestExpenseParagraph = document.getElementById("interestExpenseParagraph");
const amortizationPlan = document.getElementById("amortizationPlan");
const monthCounter = document.getElementById("monthCounter");
const amortizationPerMonth = document.getElementById("amortizationPerMonth");
const interestExpensePerMonth = document.getElementById("interestExpensePerMonth");
const PaymentPerMonth = document.getElementById("PaymentPerMonth");
const remainingDebt = document.getElementById("remainingDebt");
let monthlyCost = 0;
const loanAmountUpperLimit = 10000000;
const loanAmountLowerLimit = 10000;
const interestRateUpperLimit = 30;
const interestRateLowerLimit = 0.1;
const monthlyPaymentsUpperLimit = 600;
const monthlyPaymentsLowerLimit = 0;
function calculatePaymentPlan() {
    errorMessage.innerHTML = "";
    let resetOutputTags = outputContainer.querySelectorAll("p");
    resetOutputTags.forEach((childElement) => {
        childElement.textContent = "";
    });
    interestRateInput.value = interestRateInput.value.replace(",", ".");
    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value);
    let monthlyInterestRate = interestRate / 1200;
    let monthlyPayments = parseFloat(monthlyPaymentsInput.value);
    if (Number.isNaN(loanAmount) === true) {
        errorMessage.textContent = "Lånemängd måste vara ett nummer.";
        return;
    }
    else if (Number.isNaN(interestRate) === true) {
        errorMessage.textContent = "Räntesatsen måste vara ett nummer.";
        return;
    }
    else if (Number.isNaN(monthlyPayments) === true) {
        errorMessage.textContent = "Månadsbetalningar måste vara ett nummer.";
        return;
    }
    if (loanAmountLowerLimit > loanAmount || loanAmountUpperLimit < loanAmount) {
        if (loanAmountUpperLimit < loanAmount) {
            errorMessage.textContent = "Lånemängden får max vara 10 miljoner.";
            return;
        }
        else {
            errorMessage.textContent = "Lånemängden får minst vara 10000";
            return;
        }
    }
    if (interestRateLowerLimit > interestRate ||
        interestRateUpperLimit < interestRate) {
        if (interestRateUpperLimit < interestRate) {
            errorMessage.textContent = "Räntesatsen får max vara 30% miljoner.";
            return;
        }
        else {
            errorMessage.textContent = "Räntesatsen får minst vara 0.1%";
            return;
        }
    }
    //MAKE IT ONLY ACCEPT FULL YEARS IN MONTHS (12, 24, 36, ETC)
    if (monthlyPaymentsLowerLimit >= monthlyPayments ||
        monthlyPaymentsUpperLimit < monthlyPayments) {
        if (monthlyPaymentsUpperLimit < monthlyPayments) {
            errorMessage.textContent =
                "Låneperioden får max vara 600 månader (50 år).";
            return;
        }
        else {
            errorMessage.textContent = "Låneperioden måste vara över 0";
            return;
        }
    }
    monthlyCost =
        loanAmount *
            (monthlyInterestRate *
                (Math.pow(1 + monthlyInterestRate, monthlyPayments) /
                    (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1)));
    renderPaymentPlan(loanAmount, monthlyInterestRate, monthlyCost, monthlyPayments);
}
function renderPaymentPlan(loanAmount, monthlyInterestRate, monthlyCost, monthlyPayments) {
    console.log(loanAmount);
    let interestExpense = 0;
    let originalLoanAmount = loanAmount;
    interestExpense = 0;
    let payment = 0;
    let monthTracker = document.createElement("p");
    monthTracker.textContent = "Månad";
    monthCounter.appendChild(monthTracker);
    let amortizationTracker = document.createElement("p");
    amortizationTracker.textContent = "Amortering";
    amortizationPerMonth.appendChild(amortizationTracker);
    let interestExpensePerTracker = document.createElement("p");
    interestExpensePerTracker.textContent = "Räntekostnad";
    interestExpensePerMonth.appendChild(interestExpensePerTracker);
    let PaymentTracker = document.createElement("p");
    PaymentTracker.textContent = "Inbetalning";
    PaymentPerMonth.appendChild(PaymentTracker);
    let remainingDebtTracker = document.createElement("p");
    remainingDebtTracker.textContent = "Restskuld";
    remainingDebt.appendChild(remainingDebtTracker);
    for (let i = 0; i < monthlyPayments; i++) {
        let monthTracker = document.createElement("p");
        let amortizationTracker = document.createElement("p");
        let interestExpensePerTracker = document.createElement("p");
        let PaymentTracker = document.createElement("p");
        let remainingDebtTracker = document.createElement("p");
        interestExpense += loanAmount * monthlyInterestRate;
        payment = monthlyCost - loanAmount * monthlyInterestRate;
        loanAmount -= monthlyCost - loanAmount * monthlyInterestRate;
        monthTracker.textContent = (i + 1).toString();
        monthCounter.appendChild(monthTracker);
        amortizationTracker.textContent = monthlyCost.toFixed(2).toString();
        amortizationPerMonth.appendChild(amortizationTracker);
        interestExpensePerTracker.textContent = (monthlyCost - payment)
            .toFixed(2)
            .toString();
        interestExpensePerMonth.appendChild(interestExpensePerTracker);
        PaymentTracker.textContent = payment.toFixed(2).toString();
        PaymentPerMonth.appendChild(PaymentTracker);
        remainingDebtTracker.textContent = loanAmount.toFixed(2).toString();
        remainingDebt.appendChild(remainingDebtTracker);
    }
    totalSumOfLoan.textContent =
        "Din totalkostnaden är: " +
            (originalLoanAmount + interestExpense).toFixed(2).toString();
    interestExpenseParagraph.textContent =
        "Din totala räntekostnad är: " + interestExpense.toFixed(2).toString();
}
