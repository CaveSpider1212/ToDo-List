// HTML ELEMENTS
const textBox = document.querySelector("div");
const list = document.querySelector("ul");
const clear = document.getElementById("clear");
const main = document.querySelector("body");
const form = document.querySelector("form");



// LOCAL STORAGE CODE ---- ADDING TO THE LIST FROM THE LOCAL STORAGE
if (localStorage.getItem("maxItemNumber") == null) { // if there is no maxItemNumber key in the local storage already, set maxItemNumber to 0, otherwise set it to what the maxItemNumber is and add local storage items
    var maxItemNumber = 0;
}
else {
    var maxItemNumber = localStorage.getItem("maxItemNumber");
    textBox.classList.remove("hidden");

    for (let currentItemNum = 1; currentItemNum <= maxItemNumber; currentItemNum++) { // loops through local storage items
        if (localStorage.getItem(`item${currentItemNum}`) != null) { // adds to the list only if there is actually an item at the current item number
            const listContent = document.createElement("li");
            listContent.innerText = localStorage.getItem(`item${currentItemNum}`);
            list.append(listContent);

            listContent.setAttribute("id", currentItemNum);

            listContent.addEventListener("click", () => { // adds an event listener to the listContent list element that was just created
                let removeId = listContent.getAttribute("id");
                listContent.remove();
                localStorage.removeItem(`item${removeId}`);
            });
        }
    }
}



// FUNCTIONS
const addToList = (event) => {
    event.preventDefault(); // prevents page from refreshing when button is pressed
    textBox.classList.remove("hidden");

    const textInput = document.querySelector(".text-input");
    const listContent = document.createElement("li");

    listContent.innerText = `${textInput.value}`;
    list.append(listContent);

    // adds the added list items to the local storage and increases item number by 1
    localStorage.setItem(`item${++maxItemNumber}`, listContent.innerText);
    localStorage.setItem("maxItemNumber", maxItemNumber);

    listContent.setAttribute("id", maxItemNumber); // sets the ID of the item just added to the list (so that it can be removed from local storage when removed from the list)

    listContent.addEventListener("click", () => { // adds an event listener to the listContent list element that was just created, and when clicked, removes it from the list and local storage

        let removeId = listContent.getAttribute("id"); // gets the ID of the removed list element
        listContent.remove(); // removes the list item from the list
        localStorage.removeItem(`item${removeId}`); // removes the list item from the local storage based on the corresponding ID

    });

    textInput.value = ""; // clears the content in the text input box
    textInput.setAttribute("placeholder", "Continue typing to add more, or click on an item to remove it");
};


const clearList = () => {
    const fullList = document.querySelectorAll("li");

    fullList.forEach((listItem) => { // iterates through all of the list elements (fullList), then removes each individual item (listItem)
        listItem.remove();
    })

    localStorage.clear(); // removes everything from the local storage
    maxItemNumber = 0;
};



// EVENT LISTENERS
form.addEventListener("submit", addToList);

form.addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
        addToList;
    }
});

clear.addEventListener("click", clearList);