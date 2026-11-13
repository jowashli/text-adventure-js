import * as Terminal from "./terminal.js";

Terminal.init(onCommandRecieved)

function onCommandRecieved () {
    console.log("Command recieved!")
}