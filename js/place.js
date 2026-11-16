class Buffer {
    static places = {
        "start": {
            "name": "Living Room"
        }
    };

    static hasPlace (id) {
        return Object.hasOwn(Buffer.places, id);
    }

    static loadPlace (id, reload=false) { //
        if (Buffer.hasPlace(id)) {
            if (reload || !placeLoaded(id)) { 
                places[id] = Buffer.places[id];
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
    }

    static createFromObject (obj) {
        return new Place(
            obj.name
        )
    }
}