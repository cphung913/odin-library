const newButton = document.querySelector(".new");
const main = document.querySelector(".main")

const card = document.createElement("div");
const title = document.createElement("div");
const author = document.createElement("div");
const readStatus = document.createElement("img");
const editButton = document.createElement("button");
const deleteButton = document.createElement("button")

newButton.addEventListener("click", createBook);

readStatus.setAttribute("src", "");
card.classList.add("card");
title.classList.add("title");
author.classList.add("author");
readStatus.classList.add("read-status");
editButton.classList.add("edit");
deleteButton.classList.add("delete");

function createBook() {
    const t = title.cloneNode();
    const a = author.cloneNode();
    const r = readStatus.cloneNode();
    const c = card.cloneNode();
    const e = editButton.cloneNode();
    const d = deleteButton.cloneNode();

    t.textContent = "Title: " + "me";
    a.textContent = "Author: " + "me";
    e.textContent = "Edit";
    d.textContent = "Delete";
    
    c.append(t, a, r, e, d);
    main.appendChild(c);
}