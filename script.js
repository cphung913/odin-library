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
const closeButton = document.querySelector(".close-button");

let isInvlaid = false;
let isEditing = false;
let currentBook;

main.removeChild(card);

newButton.addEventListener("click", callForm);
popupSubmit.addEventListener("click", endForm);
closeButton.addEventListener("click", endForm);

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
                child.addEventListener("click", editBook);
                break;
            case "delete":
                value = "Delete";
                child.addEventListener("click", removeBook)
                break;
            case "read-status":
                value = "Finished: " + (values.isRead ? "\u2713" : "X");
                break;
        }
        child.textContent = value;
        temp.appendChild(child);
    })

    main.appendChild(temp);
    return temp;
}

function book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

function callForm(x) {
    if (isEditing) {
        titleInput.value = x.children[0].textContent.slice(7);
        authorInput.value = x.children[1].textContent.slice(8);
        checkBox.checked = (x.children[2].textContent.slice(10) == "X" ? false : true);
        popup.children[0].children[0].textContent = "Edit Book";
    }
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
        const x = new book(titleInput.value.trim(), authorInput.value.trim(), checkBox.checked);
        if (!isEditing) {
            createBook(x);
        } else {
            currentBook = x;
        }
    } else {
        isInvlaid = true;
    }
    popup.classList.remove("active");
    overlay.classList.remove("active");
    titleInput.value = "";
    authorInput.value = "";
    checkBox.checked = false;
    isEditing = false;
    popup.children[0].children[0].textContent = "New Book";
}

function removeBook(e) {
    let c = e.target.parentElement;
    main.removeChild(c);
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function editBook(e) {
    let array = Array.from(e.target.parentNode.parentNode.children)
    let index = array.indexOf(e.target.parentNode);
    isEditing = true;
    callForm(e.target.parentElement);
    
    while (isEditing) {
        await delay(100);
    }

    isEditing = false;
    if (!isInvlaid) {     
        array.forEach(x => {
            main.removeChild(x);
        })
        array[index] = createBook(currentBook);
        array.forEach(x => {
            main.appendChild(x);
        })
    } else if (isInvlaid) {
        isInvlaid = false;
        return;
    }
}