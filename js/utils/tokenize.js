export function tokenize(s) {
    let sTokenized = s.split(" ");
    let searchIndex = 0;
    for (let i = 0; i < sTokenized.length; i++) {
        if (sTokenized[searchIndex] === "") {
            sTokenized.splice(searchIndex, 1);
            searchIndex--;
        }
        searchIndex++;
    }
    return sTokenized;
}