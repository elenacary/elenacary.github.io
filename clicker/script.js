//Creating variables for our code
let linesOfCode = 0;

let clickPower = 1;
let upgradeCost = 50;

let pinkmouse = 1;
let pinkmouseCost = 50;


let interns = 0;
let internCost = 100;

let coffeebreak = 0;
let coffeebreakCost = 200;

function writeCode() 
{
    linesOfCode = linesOfCode + clickPower;
    updateScreen();
}

function buyKeyboard()
{
    if(linesOfCode >= upgradeCost)
    {
        linesOfCode = linesOfCode - upgradeCost;
        clickPower = clickPower + 1;
        upgradeCost = upgradeCost * 1.5;
        updateScreen();
    }
}

function buyPinkmouse()
{
    if(linesOfCode >= pinkmouseCost)
    {
        linesOfCode = linesOfCode - pinkmouseCost;
        pinkmouse = pinkmouse + 1;
        pinkmouseCost = pinkmouseCost * 1.5;
        updateScreen();
    }
}

function buyIntern()
{
    if(linesOfCode >= internCost)
    {
        linesOfCode = linesOfCode - internCost;
        interns = interns + 1;
        internCost = internCost * 1.5;
        updateScreen();
    }
}

function buyCoffeebreak()
{
    if(linesOfCode >= coffeebreakCost)
    {
        linesOfCode = linesOfCode - coffeebreakCost;
        coffeebreak = coffeebreak + 1;
        coffeebreakCost = coffeebreakCost * 1.5;
        updateScreen();
    }
}

function updateScreen()
{
    document.getElementById("score-display").innerText = linesOfCode + " lines of code";

    document.getElementById("power-display").innerText = clickPower;
    document.getElementById("cost-display").innerText = upgradeCost;

    document.getElementById("intern-display").innerText = interns;
    document.getElementById("intern-display-cost").innerText = internCost;

    document.getElementById("coffebreak-display").innerText = coffeebreak;
    document.getElementById("coffeebreak-display-cost").innerText = coffeebreakCost;
}

setInterval(function() {
    if(interns > 0)
    {
        linesOfCode = linesOfCode + interns;
        updateScreen();
    }
}, 1000);

setInterval(function() {
    if(coffebreak > 0)
    {
        linesOfCode = linesOfCode + coffebreak;
        updateScreen();
    }
}, 1000);


