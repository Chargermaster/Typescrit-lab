"use strict";
const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const monthlyPaymentsInput = document.getElementById("monthlyPayments");
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", calculatePaymentPlan);
// let loanAmount: number;
// let interestRate: number;
// let monthlyPayments: number;
let m = 0;
let interestExpense = 0;
function calculatePaymentPlan() {
    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value);
    let monthlyInterestRate = interestRate / 1200;
    let monthlyPayments = parseFloat(monthlyPaymentsInput.value);
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
    console.log((Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1) /
        Math.pow(1 + monthlyInterestRate, monthlyPayments));
}
