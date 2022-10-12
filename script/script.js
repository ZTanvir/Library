// Select table element
const tableEl = document.querySelector(".book-information");
const tblHead = document.createElement("thead");
const tblBody = document.createElement("tbody");

// Selct add new button element
const btnEl = document.querySelector(".add-new-book");

// Select form elements
const bookFormEl = document.querySelector(".book-form");
const submitBtn = document.querySelector(".submit-book-info");
const bNameEl = document.querySelector("#bname");
const bauthorEl = document.querySelector("#bauthor");
const bpagesEl = document.querySelector("#bpages");
const radioBtnEl = document.querySelectorAll("input[name]");

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

// Table head content
let tableHeadContent = ["Title", "Author", "Pages", "Read Status", ""];

// insert item in table head
for (let item of tableHeadContent) {
  let colTbl = document.createElement("th");
  let text = document.createTextNode(item);
  colTbl.appendChild(text);
  tblHead.appendChild(colTbl);
  // Add table head to table
  tableEl.appendChild(tblHead);
}
// Remove row from table when delete btn clicked
function deleteTableRow(e) {
  e.target.parentNode.parentNode.remove();
}
// Change read status from yes/no based on btn clicked
function changeReadStatus(e) {
  //
  let msg = e.target.innerText;
  if (msg == "Yes") {
    e.target.innerText = "No";
  } else if (msg == "No") {
    e.target.innerText = "Yes";
  }
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
        statusBtn.addEventListener("click", changeReadStatus);
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
    btn.addEventListener("click", deleteTableRow);

    // Add row to table body
    tblBody.appendChild(rowTbl);
    // Add table body to table
    tableEl.appendChild(tblBody);
    myLibrary = [];
  }
}
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
  let bookTitle = bNameEl.value;
  let bookAuthor = bauthorEl.value;
  let bookPages = bpagesEl.value;
  let status = readBook();
  // Create Book based on form data
  addBookToLibrary(bookTitle, bookAuthor, bookPages, status);
  // Add Book information to table body
  addTableData();

  // Remove form data
  removeFormData();
}
submitBtn.addEventListener("click", getFormData);
