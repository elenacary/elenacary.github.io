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
        statusText.innerText = "You've withdrawn money!";

    }
    else
    {
        healthText.innerText = 0;
        statusText.innerText = "You're broke!";
        statusText.style.color = "#f9331d";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelector("button").disabled = true;
        button.innerText = "Broke";
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
        healthText.innerText = playerHealth;
        statusText.innerText = "You have saved up!";
        statusText.style.color = "#1df93a";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelection("button").disabled = true;
        document.querySelection("button").innerText = "Success";
    }
}