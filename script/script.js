// Library
let myLibrary = [];

// Book information
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead) {
    // Create book based on information
    function makeObject() {
        return new Book(bookTitle, bookAuthor, bookPages, bookRead);
    }
    // Add book to library
    myLibrary.push(makeObject());
}
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 208, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Moby Dick", "Herman Melville", 635, true);
