import * as Places from "./place.js"
import * as CommandParser from "./command-parser.js"
import * as Terminal from "./terminal.js"

let place;

export function init () {
    place = Places.getPlace("start");
    
    CommandParser.registerCommand("look", () => {
        Terminal.printLineBuffered(place.name, "title");
    })
}

export function goToPlace (id) {
    place = Places.getPlace(id);
}