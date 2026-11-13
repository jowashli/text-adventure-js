export const displayContainer = document.querySelector("#terminal-display-container");
export const inputBox = document.querySelector("#terminal-input-box");
let commandRecievedCallback

export function init (onCommandRecievedCallback) {
    commandRecievedCallback = onCommandRecievedCallback
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
        let command = commandRaw.split(" ");
        let searchIndex = 0;
        for (let i = 0; i < command.length; i++) {
            if (command[searchIndex] === "") {
                command.splice(searchIndex, 1);
                searchIndex--;
            }
            searchIndex++;
        }
        console.log(command);
        if (commandRecievedCallback) { 
            commandRecievedCallback(); 
        } else { console.log("commandRecievedCallback is null!"); }
        printLine(`>${commandRaw}`); 
    }
});