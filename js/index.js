import * as Terminal from "./terminal.js";
import * as CommandParser from "./command-parser.js"

Terminal.init(onCommandRecieved);

function onCommandRecieved (command) {
    console.log(command);
}