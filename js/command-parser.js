import * as Terminal from "./terminal.js";
import { tokenize } from "./utils/tokenize.js"

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

let commandTypes = {};

export function registerCommand(token, callback) {
    if (typeof callback === "function") {
        commandTypes[token] = {
            "callback": callback
        };
    } else { console.warn("Callback is not a function!"); }
}

export function executeCommand(commandRaw) {
    let commandTokenized = tokenize(commandRaw);
    const firstToken = commandTokenized[0];
    let args = commandTokenized.toSpliced(0, 1);
    console.log(args)
    const newCommandObject = new CommandObject(firstToken, args);
    if (Object.hasOwn(commandTypes, firstToken)) {
        commandTypes[firstToken].callback(newCommandObject);
    } else {
        Terminal.printLineBuffered("invalid first token.", "error");
    }
    Terminal.flushOutputBuffer();
}