// Library
let myLibrary = [];

// Book information
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, status) {
  // Create book based on Book information
  function makeObject() {
    return new Book(bookTitle, bookAuthor, bookPages, status);
  }
  // Add book to library
  myLibrary.push(makeObject());
}

// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 208, true);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
// addBookToLibrary("Moby Dick", "Herman Melville", 635, true);

// Select table element
const tableEl = document.querySelector(".book-information");
console.log(tableEl);

// create table head and body
const tblHead = document.createElement("thead");
const tblBody = document.createElement("tbody");
// Table head content
let tableHeadContent = ["Title", "Author", "Pages", "Read Status", ""];
// insert item in table head
let headRow = document.createElement("thead");
for (let item of tableHeadContent) {
  let colTbl = document.createElement("th");
  let text = document.createTextNode(item);
  colTbl.appendChild(text);
  headRow.appendChild(colTbl);
  // Add table head to table
  tableEl.appendChild(headRow);
}
function deleteBtnFun(e) {
  e.target.parentNode.parentNode.remove();
  console.log("Table row removed");
}
// add rowValue to table row
let rowValue = 0;
function addTableData() {
  // Insert item to table body
  for (let item of myLibrary) {
    let rowTbl = document.createElement("tr");
    // Add attribute to table row
    rowTbl.setAttribute("data-row", rowValue);
    rowValue++;
    console.log("Table Values:");
    for (let key in item) {
      let colTbl = document.createElement("td");
      // Show read status based on Book status
      if (key == "status") {
        let statusBtn = document.createElement("button");
        // When status value Yes
        if (item[key] == "Yes") {
          let text = document.createTextNode(`Yes`);
          statusBtn.appendChild(text);
        } // When status value No
        else if (item[key] == "No") {
          let text = document.createTextNode(`No`);
          statusBtn.appendChild(text);
        }
        colTbl.appendChild(statusBtn);
      } else {
        let text = document.createTextNode(`${item[key]}`);
        colTbl.appendChild(text);
      }
      rowTbl.appendChild(colTbl);
      console.log(item[key]);
    }
    // Add delete btn to table row
    let createTableCol = document.createElement("td");
    let btn = document.createElement("button");
    let btnText = document.createTextNode("Delete");
    btn.classList.add("delete-btn");
    btn.appendChild(btnText);
    createTableCol.appendChild(btn);
    rowTbl.appendChild(createTableCol);
    btn.addEventListener("click", deleteBtnFun);

    // Add row to table body
    tblBody.appendChild(rowTbl);
    // Add table body to table
    tableEl.appendChild(tblBody);
    myLibrary = [];
  }
}
const btnEl = document.querySelector(".add-new-book");
function showForm(e) {
  bookFormEl.classList.toggle("hide-form");
}
btnEl.addEventListener("click", showForm);
// Select form elements
let bookFormEl = document.querySelector(".book-form");
let submitBtn = document.querySelector(".submit-book-info");
let bNameEl = document.querySelector("#bname");
let bauthorEl = document.querySelector("#bauthor");
let bpagesEl = document.querySelector("#bpages");
let radioBtnEl = document.querySelectorAll("input[name]");
// Get data from form
function getFormData(e) {
  let bookRead;
  for (let radio of radioBtnEl) {
    if (radio.checked) {
      bookRead = radio.value;
      break;
    }
  }
  console.log("User Inputs:");
  console.log(bNameEl.value);
  console.log(bauthorEl.value);
  console.log(bpagesEl.value);
  console.log(bookRead);
  let bookTitle = bNameEl.value;
  let bookAuthor = bauthorEl.value;
  let bookPages = bpagesEl.value;
  let status = bookRead;
  // Create Book based on form data
  addBookToLibrary(bookTitle, bookAuthor, bookPages, status);
  // Add Book information to table body
  addTableData();
}
submitBtn.addEventListener("click", getFormData);
// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 208, true);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
// addBookToLibrary("Moby Dick", "Herman Melville", 635, true);
