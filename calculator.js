let buffer = "0";
let totalResult = 0;
let index = 0;
let holdSymbole = "";

const  screen = document.querySelector(".result-field");

function    mathSymbolsCalc(symbol)
{
    if (buffer === "0")
        return;
    else if (totalResult === 0)
    {
        totalResult = parseInt(buffer);
        holdSymbole = symbol;
        buffer = "0";
        return;
    }
    else if (holdSymbole === "")
            holdSymbole = symbol;
    const intBuffer = parseInt(buffer);
    if (holdSymbole === "÷")
        totalResult /= intBuffer;
    else if (holdSymbole === "×")
        totalResult *= intBuffer;
    else if (holdSymbole === "-")
        totalResult -= intBuffer;
    else if (holdSymbole === "+")
        totalResult += intBuffer;
    buffer = "0";
    holdSymbole = symbol;
}

function handlSymboles(symbol)
{
    switch(symbol)
    {
        case "C":
            buffer = "0";
            totalResult = 0;
            break;
        case "←":
            if (buffer === "0" || buffer.length == 1)
            {
                buffer = "0";
                return;
            }
            buffer = buffer.substring(0, buffer.length - 1);
            break;
        case "=":
            if (totalResult !== 0 && buffer !== "")
            {
                mathSymbolsCalc("");
                buffer = "" + totalResult;
                totalResult = 0;
            }
            break;
        case "÷":
        case "×":
        case "-":
        case "+":
        mathSymbolsCalc(symbol);
        console.log("totalResult:", totalResult);
    }
}


function handlNumbers(number)
{
    if (buffer !== "0")
        buffer +=  number;
    else
        buffer = number;
}

function handlButtons(value)
{
    if (isNaN(value))
        handlSymboles(value);
    else
        handlNumbers(value);

    screenRender(buffer);
}

function screenRender(result)
{
    screen.innerText = result;
}


function init()
{
    const  buttons = document.querySelector(".calc-buttons");
    buttons.addEventListener("click", 
        function(event)
        {
            handlButtons(event.target.innerText);
        }
    );
}

init();