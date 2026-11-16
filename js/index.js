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

CommandParser.registerCommand("echo", echo);

function onCommandRecieved (command) {
    console.log(command);
    CommandParser.executeCommand(command);
}