// HTML ELEMENTS
const textBox = document.querySelector("div");
const list = document.querySelector("ul");
const clear = document.getElementById("clear");
const main = document.querySelector("body");
const form = document.querySelector("form");



// FUNCTIONS
const addToList = (event) => {
    event.preventDefault(); // prevents page from refreshing when button is pressed
    textBox.classList.remove("hidden");

    const textInput = document.querySelector(".text-input");
    const listContent = document.createElement("li");

    listContent.innerText = `${textInput.value}`;
    list.append(listContent);

    listContent.addEventListener("click", () => { // adds an event listener to the listContent list element that was just created
        listContent.remove();
    });

    textInput.value = ""; // clears the content in the text input box
    textInput.setAttribute("placeholder", "Continue typing to add more, or click on an item to remove it");
};


const clearList = () => {
    const fullList = document.querySelectorAll("li");

    fullList.forEach((listItem) => { // iterates through all of the list elements (fullList), then removes each individual item (listItem)
        listItem.remove();
    })
};



// EVENT LISTENERS
form.addEventListener("submit", addToList);

form.addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
        addToList;
    }
});

clear.addEventListener("click", clearList);
