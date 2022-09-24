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
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 208, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Moby Dick", "Herman Melville", 635, true);

// Select table element
const tableEl = document.querySelector(".book-information");
console.log(tableEl);

// create table head and body
const tblHead = document.createElement("thead");
const tblBody = document.createElement("tbody");
// insert item in table head
for (let item of myLibrary) {
    let headRow = document.createElement("thead");
    console.log("key");
    for (let key in item) {
        let colTbl = document.createElement("th");
        let text = document.createTextNode(
            `${key[0].toUpperCase()}${key.slice(1)}` //Make the first letter uppercase
        );
        colTbl.appendChild(text);
        headRow.appendChild(colTbl);
        console.log(key);
    }
    // Add table head to table
    tableEl.appendChild(headRow);
    break;
}

// Insert item to table body
for (let item of myLibrary) {
    let rowTbl = document.createElement("tr");
    console.log("Values:");
    for (let key in item) {
        let colTbl = document.createElement("td");
        let text = document.createTextNode(`${item[key]}`);
        colTbl.appendChild(text);
        rowTbl.appendChild(colTbl);
        console.log(item[key]);
    }
    tblBody.appendChild(rowTbl);
    // Add table body to table
    tableEl.appendChild(tblBody);
}
