import * as CommandParser from "./command-parser.js";

export const displayContainer = document.querySelector("#terminal-display-container");
export const inputBox = document.querySelector("#terminal-input-box");
let commandRecievedCallback
let outputBuffer = [];

export function init (onCommandRecievedCallback) {
    commandRecievedCallback = onCommandRecievedCallback;
    inputBox.value = "";
    console.log("Terminal initialized");
}

export function printLineBuffered (s, style="default") {
    const newPre = document.createElement("pre");
    newPre.classList.add(`terminal-display-element-style-${style}`);
    newPre.textContent = `${s}`;
    outputBuffer.push(newPre);
}

export function flushOutputBuffer () {
    const newDisplayBox = document.createElement("div");
    newDisplayBox.classList.add("terminal-display-box");
    outputBuffer.forEach(element => {
        newDisplayBox.appendChild(element);
    })
    outputBuffer = [];
    displayContainer.appendChild(newDisplayBox);
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
}

inputBox.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const commandRaw = inputBox.value; inputBox.value = "";
        printLineBuffered(`>${commandRaw}`);
        let command = CommandParser.tokenizeCommand(commandRaw);
        if (commandRecievedCallback) { 
            commandRecievedCallback(command); 
        } else { console.log("commandRecievedCallback is null!"); }
        flushOutputBuffer();
    }
});