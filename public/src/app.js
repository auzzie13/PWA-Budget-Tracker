$(document).ready(function(){

const priceEl = document.getElementById("price");
const balanceEl = document.getElementById("balance");
const expenseEl = document.getElementById("expense");
const expensesListEl = document.getElementById("expenses-list");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

const transaction = {
  name: expenseEl.value,
  value: priceEl.value,
  date: new Date().toISOString()
};

function addToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Name: ${name}
    <span class="ml-4">Price: ${price}</span></li>`;
}

function subtract(a, b) {
  return parseInt(a) - parseInt(b);
}


function submit(e) {
  e.preventDefault();
  const total = subtract(balanceEl.innerHTML, priceEl.value);
  console.log(expenseEl.value);
  console.log(priceEl.value);
  balanceEl.innerHTML = total;
  addToList(expenseEl.value, priceEl.value);

  $.ajax({
    url: "/api/transaction", 
    method: "POST",
    body: JSON.stringify(transaction)
  }).then(function() {
    console.log("working");
  })

};

function reset(e) {
  e.preventDefault();
  const total = 2000;
  balanceEl.innerText = total;
  expensesListEl.innerHTML = "";
}

submitBtn.onclick = submit;


resetBtn.onclick = reset;

});