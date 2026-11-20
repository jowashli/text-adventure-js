import * as Places from "./place.js";
import * as Terminal from "./terminal.js";
import * as Commands from "./commands.js";

let place;

export function init () {
	place = Places.getPlace("start");
	console.log("Player initialized")

	Commands.CommandRegistry.addCommand("look", {
		"at": {
			undefined: undefined
		}
	});
	Commands.CommandRegistry.addCallback("look", () => {
		place.printLookDescription();
	});
	Commands.CommandRegistry.addCallback("look at", (thing) => {
		Terminal.printLineBuffered("i havent made you able to look at things yet");
	});
}

export function goToPlace (id) {
    place = Places.getPlace(id);
}
