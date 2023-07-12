const newButton = document.querySelector(".new");

let myLibrary = [];

newButton.addEventListener("click", makeBook)

function makeBook() {

}

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read
}

Book.prototype.addBookToLibrary = function() {
  myLibrary.push(this);
}

function displayBooks(array) {

}