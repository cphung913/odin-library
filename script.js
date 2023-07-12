const newButton = document.querySelector(".new");
const main = document.querySelector(".main");

const card = document.querySelector(".card");
const children = document.querySelector(".card").childNodes;

newButton.addEventListener("click", createBook);

main.removeChild(card);

function createBook() {
    const temp = card.cloneNode();

    children.forEach(x => {
        if (x.nodeName == "#text") return;
        const child = x.cloneNode();
        let value;
        switch(child.classList.value) {
            case "title":
                value = "Title: ";
                break;
            case "author":
                value = "Author: ";
                break;
            case "edit":
                value = "Edit";
                break;
            case "delete":
                value = "Delete";
                break;
        }
        child.textContent = value;
        temp.appendChild(child);
    })

    main.appendChild(temp);
}

function removeBook(e) {
    let c = e.target.parentElement;
    main.removeChild(c);
}