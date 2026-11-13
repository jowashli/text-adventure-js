const terminalDisplayContainer = document.querySelector("#terminal-display-container");
const terminalInputBox = document.querySelector("#terminal-input-box");

terminalDisplayContainer.style.overflow = "hidden";

function terminalPrintLine (s) {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = `\n\n${s}`;
    terminalDisplayContainer.appendChild(newParagraph);
    terminalDisplayContainer.scrollTo(0, terminalDisplayContainer.scrollHeight);
}

terminalInputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const commandRaw = terminalInputBox.value;
        let command = commandRaw.split(" ");
        let searchIndex = 0;
        for (let i = 0; i < command.length; i++) {
            if (command[searchIndex] === "") {
                command.splice(searchIndex, 1);
                searchIndex -= 1;
            }
            searchIndex++;
        }
        console.log(command);
        terminalInputBox.value = "";
        terminalPrintLine(`>${commandRaw}`);
    }
});
