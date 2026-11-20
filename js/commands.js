import { tokenize } from "./utils/tokenize.js";
import * as Terminal from "./terminal.js";

export class CommandRegistry {
	static commands = {};
	static callbacks = {};

	static addCallback(commandTreeString, callback) {
		if (typeof callback === "function") {
			this.callbacks[commandTreeString] = callback;
		} else {
			console.warn("callback is not a function!");
		}
	}

	static addCommand(commandName, commandTree) {
		if (Object.keys(this.commands).includes(commandName)) {
			console.warn(`could not register command ${commandName}. command already exists!`)
		} else {
			this.commands[commandName] = commandTree;
		}
	}
}

export function linkCallback(commandName, callback) {
	if (typeof callback !== "function") {
		console.warn("callback is not a function!");
		return;
	} else {
		commandCallbacks[commandName] = callback;
	}
}

export class CommandObject {
	constructor(commandRaw) {
		this.tokens = [];
		this.superTokens = [];
		this.commandTree = [];
		this.superArguments = [];
		this.hasExtraArgs = false;
		this.processRawCommand(commandRaw);
		this.unreadSuperTokens = this.tokens;
		this.readSuperTokens = this.tokens;
		this.callback = CommandRegistry.callbacks[this.commandTree.join(" ")]
	}

	processRawCommand(commandRaw) {
		this.tokens = tokenize(commandRaw);
		let scope = CommandRegistry.commands;
		let newSuperToken = [];
		this.tokens.forEach(token => {
			newSuperToken.push(token);
			if (Object.keys(scope).includes(newSuperToken.join(" "))) {
				scope = scope[token];
				this.superTokens.push(token);
				this.commandTree.push(token);
				newSuperToken = [];

			}
		})
		if (newSuperToken.length > 0) {
			this.superTokens.push(newSuperToken.join(" "));
			this.superArguments.push(newSuperToken.join(" "));
			if (!Object.hasOwn(scope, undefined)) {
				this.hasExtraArgs = true;
			}
		}
	}

	execute () {
		if (!this.getIsCommandNameValid()) {
			if (this.getIsEmpty()) {
				Terminal.printLineBuffered("i didn't understand what you said because you said nothing.", "error");
			} else {
				Terminal.printLineBuffered(`i didn't understand what you meant by ${this.tokens[0]}`, "error");
			}
		} else if (this.getHasExtraArgs()) {
			Terminal.printLineBuffered(`i only understand as far as you wanting to ${this.superTokens.slice(0, -1).join(" ")}`)
		} else {
			this.callback(...this.superArguments);
		}
	}

	getIsEmpty () {
		return !(this.superTokens.length > 0);
	}

	getIsCommandNameValid() {
		return Object.keys(CommandRegistry.commands).includes(this.superTokens[0]);
	}

	getHasExtraArgs() {
		return this.hasExtraArgs;
	}
}

export function executeCommand(commandRaw) {
	new CommandObject(commandRaw).execute();
}
