export function tokenize(s) {
    let sTokenized = s.split(" ").filter(element => element !== "");
    return sTokenized;
}
