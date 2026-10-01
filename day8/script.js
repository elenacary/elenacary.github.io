//Instead of creating a bunch of variables
//We can put multiple pieces of data in one place suing arrays
//Arrays are created using []
const contents = [
    "Health Potion",
    "Sword",
    "Shield",
    "Magic Book",
    "Pet Lizard"
];

function loadInventory () {
    const listElement = document.getElementById("item-list")

    listElement.innerHTML = "";

        for(let i = 0; i < contents.length; i++)
        {
            let currentItem = contents[i];

            let htmlToInject = "<li>" + currentItem + "</li>";

           //listElement = listElement + htmlToInject;
            listElement.innerHTML += htmlToInject;
        }

        document.querySelector("button").disabled = true;
        document.querySelector("button").innerText = "Backpack Full";
}