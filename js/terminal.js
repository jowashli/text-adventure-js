import * as CommandParser from "./command-parser.js";

export const displayContainer = document.querySelector("#terminal-display-container");
export const inputBox = document.querySelector("#terminal-input-box");
let commandRecievedCallback

export function init (onCommandRecievedCallback) {
    commandRecievedCallback = onCommandRecievedCallback
    inputBox.value = "";
    console.log("Terminal initialized");
}

export function printLine (s) {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = `${s}`;
    displayContainer.appendChild(newParagraph);
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
}

inputBox.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const commandRaw = inputBox.value; inputBox.value = "";
        let command = CommandParser.parseCommand(commandRaw);
        if (commandRecievedCallback) { 
            commandRecievedCallback(command); 
        } else { console.log("commandRecievedCallback is null!"); }
        printLine(`>${commandRaw}`); 
    }
});