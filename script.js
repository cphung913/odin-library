let myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read
}

Book.prototype.addBookToLibrary = function() {
  myLibrary.push(this);
}

const book1 = new Book("yay", "me", false);
book1.addBookToLibrary();
console.log(myLibrary);