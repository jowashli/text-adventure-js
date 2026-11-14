export function parseCommand(commandRaw) {
    let command = commandRaw.split(" ");
    let searchIndex = 0;
    for (let i = 0; i < command.length; i++) {
        if (command[searchIndex] === "") {
            command.splice(searchIndex, 1);
            searchIndex--;
        }
        searchIndex++;
    }
    return command
}