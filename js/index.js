import * as Terminal from "./terminal.js";
import * as CommandParser from "./command-parser.js";
import * as Player from "./player.js";

Terminal.init(onCommandRecieved);
Player.init();

function echo (co) {
    if (!co.isArgsEmpty()) {
        Terminal.printLineBuffered(co.args.join(" "));
    }
}

function nothing () {
    Terminal.printLineBuffered("i dont understand what you said because you said nothing", "error");
}

CommandParser.registerCommand("echo", echo);
CommandParser.registerCommand(undefined, nothing);

function onCommandRecieved (command) {
    console.log(command);
    CommandParser.executeCommand(command);
}