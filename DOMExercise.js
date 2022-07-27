// 1
const container1 = document.getElementById("container");

// 2
const container2 = document.querySelector("#container");

// 3
const secondList = document.querySelectorAll(".second");

// 4
const third = document.querySelector("ol > .third" );

// 5
container2.innerText = "Hello!";

// 6
const footer = document.querySelector(".footer");
footer.classList.add("main");

// 7
footer.classList.remove("main");

// 8
const newLi = document.createElement("li");

// 9
newLi.innerText = "four";

// 10
const ul = document.querySelector("ul");
ul.append(newLi);

// 11
const ol = document.querySelector("ol");
const olItems = ol.children;
for(let listItems of olItems) {
    listItems.style.backgroundColor = "green";
}

// 12
footer.remove();