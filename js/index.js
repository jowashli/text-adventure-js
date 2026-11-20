import * as Terminal from "./terminal.js";
import * as Player from "./player.js";
import * as Commands from "./commands.js";
import { tokenize } from "./utils/tokenize.js";

Terminal.init(onCommandRecieved);
Player.init();

Commands.CommandRegistry.addCommand("echo", { undefined: undefined })
Commands.CommandRegistry.addCallback("echo", (s="") => {
	Terminal.printLineBuffered(s);
});

Commands.CommandRegistry.addCallback("", (s) => { // no valid command
	if (s === undefined || s === "") {
		Terminal.printLineBuffered("i don't understand what you said because you said nothing", "error");
	} else {
		Terminal.printLineBuffered(`i don't understand what you meant by "${tokenize(s)[0]}"`, "error");
	}
});

function onCommandRecieved (commandRaw) {
	Commands.executeCommand(commandRaw)
}
