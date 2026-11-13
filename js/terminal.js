export const displayContainer = document.querySelector("#terminal-display-container");
export const inputBox = document.querySelector("#terminal-input-box");

export function printLine (s) {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = `${s}`;
    this.displayContainer.appendChild(newParagraph);
    this.displayContainer.scrollTo(0, displayContainer.scrollHeight);
}