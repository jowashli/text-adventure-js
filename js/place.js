import { Entity } from "./entity.js";
import * as Terminal from "./terminal.js";

class Buffer {
    static places = {
        "start": {
            "name": "Living Room",
            "entities": [
                {
                    "displayName": "banana"
                }
            ]
        }
    };

    static hasPlace (id) {
        return Object.hasOwn(Buffer.places, id);
    }

    static loadPlace (id, reload=false) { //
        if (Buffer.hasPlace(id)) {
            if (reload || !placeLoaded(id)) { 
                places[id] = Place.createFromObject(Buffer.places[id]);
            }
        } else {
            console.error(`Place ${id} does not exist!`);
        }
    }
}

function placeLoaded (id) {
    if (!Buffer.hasPlace(id)) {
        console.warn("Place does not exist in buffer!");
    }
    return Object.hasOwn(places, id);
}

export function getPlace (id) {
    if (!Buffer.hasPlace(id)) {
        console.warn("Place does not exist in buffer!");
        return undefined;
    }
    if (!placeLoaded(id)) {
        Buffer.loadPlace(id);
    }
    return Place.createFromObject(places[id]);
}

const places = {};

export class Place {
    constructor (name) {
        this.name = name;
        this.entities = [];
    }

    static createFromObject (obj) {
        let newPlace = new Place(obj.name);
        obj.entities.forEach(entitySourceObject => {
            newPlace.entities.push(Entity.createFromObject(entitySourceObject));
        })
        return newPlace;
    }

    printLookDescription () {
        Terminal.printLineBuffered(this.name, "title")
        this.entities.forEach(entity => {
            Terminal.printLineBuffered(entity.getLookDescription())
        })
    }
}