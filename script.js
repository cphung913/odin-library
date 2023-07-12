const newButton = document.querySelector(".new");
const main = document.querySelector(".main");
const card = document.querySelector(".card");
const children = document.querySelector(".card").childNodes;
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const popupSubmit = document.querySelector(".popup-submit");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const checkBox = document.getElementById("read");

main.removeChild(card);

newButton.addEventListener("click", callForm);
popupSubmit.addEventListener("click", endForm);

function createBook(values) {
    const temp = card.cloneNode();

    children.forEach(x => {
        if (x.nodeName == "#text") return;
        const child = x.cloneNode();
        let value;
        switch(child.classList.value) {
            case "title":
                value = "Title: " + values.title;
                break;
            case "author":
                value = "Author: " + values.author;
                break;
            case "edit":
                value = "Edit";
                break;
            case "delete":
                value = "Delete";
                child.addEventListener("click", removeBook)
                break;
        }
        child.textContent = value;
        temp.appendChild(child);
    })

    main.appendChild(temp);
}

function book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

function callForm() {
    popup.classList.add("active");
    overlay.classList.add("active");   
}

function endForm(e) {
    e.preventDefault();
    authorInput.classList.remove("invalid");
    titleInput.classList.remove("invalid");
    if (e.target.className == "popup-submit") {
        if (titleInput.value == "") {
            titleInput.classList.add("invalid");
            return;
        }
        if (authorInput.value == "") {
            authorInput.classList.add("invalid");
            return;
        }
        const x = new book(titleInput.value.trim(), authorInput.value.trim(), checkBox.value);
        titleInput.value = "";
        authorInput.value = "";
        createBook(x);
    } 
    popup.classList.remove("active");
    overlay.classList.remove("active");
}

function removeBook(e) {
    let c = e.target.parentElement;
    main.removeChild(c);
}