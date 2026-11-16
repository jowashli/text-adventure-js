import * as Terminal from "./terminal.js";

export class CommandObject {
    constructor (firstToken, args) {
        this.firstToken = firstToken;
        this.args = args;
    }

    getArgCount () {
        return this.args.length;
    }

    isArgsEmpty () {
        return (this.getArgCount() === 0) ? true : false;
    }
}

export function tokenizeCommand(commandRaw) {
    let command = commandRaw.split(" ");
    let searchIndex = 0;
    for (let i = 0; i < command.length; i++) {
        if (command[searchIndex] === "") {
            command.splice(searchIndex, 1);
            searchIndex--;
        }
        searchIndex++;
    }
    return command;
}

let commandTypes = {};

export function registerCommand(token, callback) {
    if (typeof callback === "function") {
        commandTypes[token] = {
            "callback": callback
        };
    } else { console.warn("Callback is not a function!"); }
}

export function executeCommand(commandRaw) {
    let commandTokenized = tokenizeCommand(commandRaw);
    const firstToken = commandTokenized[0];
    const args = commandTokenized.splice(1);
    const newCommandObject = new CommandObject(firstToken, args);
    if (Object.hasOwn(commandTypes, firstToken)) {
        commandTypes[firstToken].callback(newCommandObject);
    } else {
        Terminal.printLineBuffered("invalid first token.", "error");
    }
    Terminal.flushOutputBuffer();
}