const formElement = document.querySelector("form");
const taskList = document.querySelector("ul");
var savedList = JSON.parse(localStorage.getItem("list")) || [];


for(let i = 0; i < savedList.length; i++) {
    addToList(savedList[i].task, false, savedList[i].done);
}


formElement.addEventListener("submit", function(e) {
    e.preventDefault();
    const input = document.querySelector("#listItem");
    addToList(input.value, true, false);
    formElement.reset();
})

taskList.addEventListener("click", function(e) {
    if(e.target.tagName === "INPUT") {
        if(e.target.checked)
            e.target.parentElement.style.textDecoration = "line-through";
        else
            e.target.parentElement.style.textDecoration = "";
    }
    if(e.target.tagName === "BUTTON") {
        let toDelete;
        for(let i = 0; i < savedList.length; i++) {
            if(savedList[i].task + 'X' === e.target.parentElement.innerText) {
                toDelete = i;
            }
        }
        savedList.splice(toDelete, 1);
        e.target.parentElement.remove();
    }

    doneCheck(e.target);
    localStorage.setItem("list", JSON.stringify(savedList));
})

function addToList(input, save, done) {
    const newLi = document.createElement("li");
    const newButton = document.createElement("button");
    const newCheck = document.createElement("input");
    newCheck.setAttribute("type", "checkbox");

    if(done) {
        newLi.style.textDecoration = "line-through";
        newCheck.checked = true;
    }

    newButton.innerText = "X";
    newLi.innerText = input;
    newLi.append(newButton);
    newLi.prepend(newCheck);
    taskList.append(newLi);

    if(save) {
        savedList.push({task: input, done: done})
        localStorage.setItem("list", JSON.stringify(savedList));
    }
}
// Duplicates don't work with this. But as far as I can tell everything else does.
function doneCheck(input) {
    for(let i = 0; i < savedList.length; i++) {
        if(savedList[i].task + 'X' === input.parentElement.innerText) {
            if(savedList[i].done != input.checked) {
                savedList[i].done = !savedList[i].done;
            }
        }
    }
}