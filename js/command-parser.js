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

export function createCommand(token, callback) {
    commandTypes[token] = {
        "callback": callback
    };
}

export function executeCommand(command) {
    const firstToken = command[0];
    const args = command.splice(1);
    if (Object.hasOwn(commandTypes, firstToken)) {
        commandTypes[firstToken].callback(new CommandObject(firstToken, args)); 
    } else {
        Terminal.printLineBuffered("invalid first token", "error")        
        return -1 // invalid first token
    }
}