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
