class Buffer {
    static places = {
        "start": {
            "name": "Living Room"
        }
    };

    static hasPlace (id) {
        return Object.hasOwn(Buffer.places, id)  
    }

    static loadPlace (id, reload=false) { //
        if (Buffer.hasPlace(id)) {
            if (reload || !placeLoaded(id)) { 
                places[id] = Buffer.places[id];
            }
        } else {
            console.log("[WARNING] Cannot load Place: does not exist");
        }
    }
}

function placeLoaded (id) {
    return Object.hasOwn(places, id);
}

export function getPlace (id) {
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

    getLookDescription() {
        return this.name;
    }
}