import * as Terminal from "./terminal.js";

Terminal.inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const commandRaw = Terminal.inputBox.value;
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
        Terminal.inputBox.value = "";
        Terminal.printLine(`>${commandRaw}`);
    }
});
