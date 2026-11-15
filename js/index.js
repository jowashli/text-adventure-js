import * as Terminal from "./terminal.js";
import * as CommandParser from "./command-parser.js"

Terminal.init(onCommandRecieved);

function echo (co) {
    if (!co.isArgsEmpty()) {
        Terminal.printLine(co.args);
    }
}

CommandParser.createCommand("echo", echo);

function onCommandRecieved (command) {
    console.log(command);
    CommandParser.executeCommand(command);
}