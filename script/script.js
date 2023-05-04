// Select table element
const tableEl = document.querySelector(".book-information");
const tblHead = document.createElement("thead");
const tblBody = document.createElement("tbody");

// Selct add new button element
const btnEl = document.querySelector(".add-new-book");

// Select form elements
const formEl = document.querySelector("#bookInfo");
const bookFormEl = document.querySelector(".book-form");
const submitBtn = document.querySelector(".submit-book-info");
const bNameEl = document.querySelector("#bname");
const bauthorEl = document.querySelector("#bauthor");
const bpagesEl = document.querySelector("#bpages");
const radioBtnEl = document.querySelectorAll("input[name]");

// Library
let myLibrary = [];

// Book information
// function Book(title, author, pages, status) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.status = status;
// }
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}



function addBookToLibrary(bookTitle, bookAuthor, bookPages, status) {
  // Create book based on Book information
  function makeObject() {
    return new Book(bookTitle, bookAuthor, bookPages, status);
  }
  // Add book to library
  myLibrary.push(makeObject());
}

// insert items in table head
(function insertTableHead() {
  // Table head content
  let tableHeadContent = ["Title", "Author", "Pages", "Read Status", ""];

  for (let item of tableHeadContent) {
    let colTbl = document.createElement("th");
    let text = document.createTextNode(item);
    colTbl.appendChild(text);
    tblHead.appendChild(colTbl);
    // Add table head to table
    tableEl.appendChild(tblHead);
  }
})();

// Remove row from table when delete btn clicked
function deleteTableRow(e) {
  // Select delete btn html content
  const buttonEl = e.target;
  // Get data-row value
  let tbodyIndex = Number(buttonEl.dataset.row);
  // Remove that row form table body
  myLibrary.splice(tbodyIndex, 1);
  // Update table
  addTableData();
}
// Change read status from yes/no based on btn clicked
function changeReadStatus(e) {
  //
  let readStatusBtn = e.target;
  let itemInArray = Number(readStatusBtn.dataset.row);
  if (myLibrary[itemInArray].status === "Yes") {
    myLibrary[itemInArray]["status"] = "No";
  } else if (myLibrary[itemInArray].status === "No") {
    myLibrary[itemInArray]["status"] = "Yes";
  }
  addTableData();
}
// Remove table row form table body
function removeTableBody() {
  if (tblBody.hasChildNodes) {
    while (tblBody.hasChildNodes()) {
      tblBody.removeChild(tblBody.firstChild);
    }
  }
}

// add rowValue to table row
function addTableData() {
  removeTableBody();
  let rowValue = 0;

  // Insert item to table body
  for (let item of myLibrary) {
    let rowTbl = document.createElement("tr");
    // Add attribute to table row
    for (let key in item) {
      let colTbl = document.createElement("td");
      // Show read status based on Book status
      if (key == "status") {
        let statusBtn = document.createElement("button");
        statusBtn.setAttribute("data-row", rowValue);
        // When status value Yes
        if (item[key] == "Yes") {
          let text = document.createTextNode(`Yes`);
          statusBtn.appendChild(text);
        } // When status value No
        else if (item[key] == "No") {
          let text = document.createTextNode(`No`);
          statusBtn.appendChild(text);
        }
        statusBtn.addEventListener("click", changeReadStatus);
        colTbl.appendChild(statusBtn);
      } else {
        let text = document.createTextNode(`${item[key]}`);
        colTbl.appendChild(text);
      }
      rowTbl.appendChild(colTbl);
    }
    // Add delete btn to table row
    let createTableCol = document.createElement("td");
    let btn = document.createElement("button");
    let btnText = document.createTextNode("Delete");
    btn.classList.add("delete-btn");
    // Match data-row value with array index number
    btn.setAttribute("data-row", rowValue);
    rowValue++;
    btn.appendChild(btnText);
    createTableCol.appendChild(btn);
    rowTbl.appendChild(createTableCol);
    btn.addEventListener("click", deleteTableRow);

    // Add row to table body
    tblBody.appendChild(rowTbl);
    // Add table body to table
    tableEl.appendChild(tblBody);
  }
}

// Fire when add new book button clicked
function showForm(e) {
  bookFormEl.classList.toggle("hide-form");
}
btnEl.addEventListener("click", showForm);

// Remove form data
function removeFormData() {
  bNameEl.value = "";
  bauthorEl.value = "";
  bpagesEl.value = "";
  for (let radio of radioBtnEl) {
    radio.checked = false;
  }
}

// read book status - yes,no
function readBook() {
  let bookRead = null;
  for (let radio of radioBtnEl) {
    if (radio.checked) {
      bookRead = radio.value;
      break;
    }
  }
  return bookRead;
}

// Get data from form
function getFormData(e) {
  e.preventDefault();
  let bookTitle = bNameEl.value;
  let bookAuthor = bauthorEl.value;
  let bookPages = bpagesEl.value;
  let status = readBook(); // read book status - yes,no

  // Create Book based on form data
  addBookToLibrary(bookTitle, bookAuthor, bookPages, status);

  // Add Book information to table body
  addTableData();

  // Remove form data
  removeFormData();
  showForm();
}
formEl.addEventListener("submit", getFormData);
