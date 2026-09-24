let playerMoney = 0;
const addedAmount = 100;

function Deposit() {
    playerMoney = playerMoney + addedAmount;

    const cashText = document.getElementById("cash-display");
    const statusText = document.getElementById("status-message");

    healthText.innerText = playerMoney;

    if(playerMoney > 0)
    {
        healthText.innerText = playerMoney;
        statusText.innerText = "You have deposited money!";

    }
    else
    {
        healthText.innerText = 0;
        statusText.innerText = "Don't spend any money!";
        statusText.style.color = "#1df98b";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelection("button").disabled = true;
        document.querySelection("button").innerText = "Broke";
    }
}

let playerMoney = 0;
const removedAmount = 20;

function Withdraw() {
    playerMoney = playerMoney - removedAmount;

    const cashText = document.getElementById("cash-display");
    const statusText = document.getElementById("status-message");

    healthText.innerText = playerMoney;

    if(playerMoney < 0)
    {
        healthText.innerText = playerMoney;
        statusText.innerText = "You have overdrawn!";

    }
    else
    {
        healthText.innerText = 0;
        statusText.innerText = "Great work saving!";
        statusText.style.color = "#1df98b";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelection("button").disabled = true;
        document.querySelection("button").innerText = "Savings";
    }
}
