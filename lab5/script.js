let playerHealth = 0;
const damageAmount = 100;

function takeWithdraw() {
    playerHealth = playerHealth - damageAmount;

    const healthText = document.getElementById("health-display");
    const statusText = document.getElementById("status-message");

    healthText.innerText = playerHealth;

    if(playerHealth > 0)
    {
        healthText.innerText = playerHealth;
        statusText.innerText = "You've withdraw money!";

    }
    else
    {
        healthText.innerText = 0;
        statusText.innerText = "You're broke!";
        statusText.style.color = "#f9331d";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelection("button").disabled = true;
        document.querySelection("button").innerText = "Broke";
    }
}

function takeDeposit() {
    playerHealth = playerHealth + damageAmount;

    const healthText = document.getElementById("health-display");
    const statusText = document.getElementById("status-message");

    healthText.innerText = playerHealth;

    if(playerHealth < 0)
    {
        healthText.innerText = playerHealth;
        statusText.innerText = "Keep saving up!";

    }
    else
    {
        healthText.innerText = 0;
        statusText.innerText = "Game Over!";
        statusText.style.color = "#f9331d";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelection("button").disabled = true;
        document.querySelection("button").innerText = "Dead";
    }
}