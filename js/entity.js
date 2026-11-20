import { tokenize } from "./utils/tokenize.js"

export class Entity {
    constructor (displayName) {
        this.displayName = displayName;
        this.aliases = undefined
        this.indefiniteArticle = undefined;
        this.disturbedLookDescription = undefined;
        this.undisturbedLookDescription = undefined;
        this.inspectionDescription = undefined;
        this.fillUndefinedAttributes();

        this.disturbed = false;
    }

    static createFromObject (obj) {
        const newEntity = new Entity("foo");
        newEntity.displayName = obj.displayName;
        newEntity.aliases = obj.aliases
        newEntity.indefiniteArticle = obj.indefiniteArticle;
        newEntity.disturbedLookDescription = obj.disturbedLookDescription;
        newEntity.undisturbedLookDescription = obj.disturbedLookDescription;
        newEntity.inspectionDescription = obj.inspectionDescription;
        newEntity.fillUndefinedAttributes();
        return newEntity
    }

    fillUndefinedAttribute (attributeName, defaultValue) {
        if (this[attributeName] == undefined) {
            this[attributeName] = defaultValue;
        }
    }

    fillUndefinedAttributes () {
        this.fillUndefinedAttribute("displayName", "nameless thing");
        this.fillUndefinedAttribute("aliases", tokenize(this.displayName));
        this.fillUndefinedAttribute("indefiniteArticle", "a");
        this.fillUndefinedAttribute("disturbedLookDescription", `There is ${this.getIndefiniteDeterminer()} here.`);
        this.fillUndefinedAttribute("undisturbedLookDescription", this.disturbedLookDescription);
        this.fillUndefinedAttribute("inspectionDescription", `There is nothing special about this ${this.displayName}.`);
    }

    getIndefiniteDeterminer () {
        return `${this.indefiniteArticle} ${this.displayName}`;
    }

    getLookDescription () {
        return this.disturbed ? this.disturbedLookDescription : this.undisturbedLookDescription;
    }

    getInspectionDescription () {
    	return this.inspectionDescription;
    }
}
