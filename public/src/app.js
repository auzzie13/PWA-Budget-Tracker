  
import { useIndexedDb } from "./indexdb.js";

const priceEl = document.getElementById("price");
const balanceEl = document.getElementById("balance");
const expenseEl = document.getElementById("expense");
const expensesListEl = document.getElementById("expenses-list");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const depositBtn = document.getElementById("deposit");


function addToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Name: ${name}
    <span class="ml-4">Price: ${price}</span></li>`;
}

function subtract(a, b) {
  return parseInt(a) - parseInt(b);
}

function add(a, b) {
  return parseInt(a) + parseInt(b);
}

function getTransactions() {
  $.ajax({
    url: "/api/transaction", 
    method: "GET",
  }).then(function(results) {
    console.log("working");
    results.forEach(item => addToList(item.name, item.value));
  })
}

function submit(e) {
  e.preventDefault();
  const total = subtract(balanceEl.innerHTML, priceEl.value);
  console.log(expenseEl.value);
  console.log(priceEl.value);
  balanceEl.innerHTML = total;
  addToList(expenseEl.value, priceEl.value);

  const transaction = {
    name: expenseEl.value,
    value: priceEl.value,
    date: new Date().toISOString()
  };

  $.ajax({
    url: "/api/transaction", 
    method: "POST",
    data: transaction
  }).then(function() {
    console.log("working");
  })

  useIndexedDb("budget", "budgetStore", "put", {
    name: expenseEl.value,
    value: priceEl.value,
  })

};

function deposit(e) {
  e.preventDefault();
  const total = add(balanceEl.innerHTML, priceEl.value);
  console.log(expenseEl.value);
  console.log(priceEl.value);
  balanceEl.innerHTML = total;
  addToList(expenseEl.value, priceEl.value);

  const transaction = {
    name: expenseEl.value,
    value: priceEl.value,
    date: new Date().toISOString()
  };

  $.ajax({
    url: "/api/transaction", 
    method: "POST",
    data: transaction
  }).then(function() {
    console.log("working");
  })

  useIndexedDb("budget", "budgetStore", "put", {
    name: expenseEl.value,
    value: priceEl.value,
  })

};

function reset(e) {
  e.preventDefault();
  const total = 2000;
  balanceEl.innerText = total;
  expensesListEl.innerHTML = "";

  useIndexedDb("budget", "budgetStore", "clear")
  location.reload();
}

submitBtn.onclick = submit;
depositBtn.onclick = deposit;
resetBtn.onclick = reset;

getTransactions();

