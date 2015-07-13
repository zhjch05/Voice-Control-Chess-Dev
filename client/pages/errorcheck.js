String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}
function errorCheck(content) {
    if (content.length === 5) {
        if (content.charAt(3) === '8') {
            content = content.replaceAt(3, 'A');
        }
        if (content.charAt(3) === '3') {
            content = content.replaceAt(3, 'E');
        }
    }
    // Remove Hyphens
    while (content.includes("-")) {
        content = content.replace("-", "");
    }

    // Replace 2 with to
    if (content.charAt(2) == "2") {
        content = content.replaceAt(2, " to");
    }

    // Replace 6 with takes
    if (content.charAt(2) == "6") {
        content = content.replaceAt(2, " takes");
    }

    // Replace starting 8 with A
    if (content.charAt(0) == "8") {
        content = content.replaceAt(0, "A");
    }

    // Replace Bee with B
    while (content.includes("bee")) {
        content = content.replace("bee", "B");
    }

    // Replace be with B
    while (content.includes("be")) {
        content = content.replace("be", "B");
    }

    // Replace see with C
    while (content.includes("see")) {
        content = content.replace("see", "C");
    }

    // Replace the word "anyone" with "E1"
    while (content.includes("anyone")) {
        content = content.replace("anyone", "E1");
    }

    // Replace one with 1
    while (content.includes("one")) {
        content = content.replace("one", "1");
    }

    // Replace Tree with 3
    while (content.includes("tree")) {
        content = content.replace("tree", "3");
    }

    // Replace a "33" start with "E3"
    if (content.substring(0, 2) == "33") {
        content = content.replace("33", "E3");
    }

    // Replace the word "East" with "E"
    while (content.includes("east")) {
        content = content.replace("east", "E");
    }

    // Replace every "P" with a "B"
    while (content.includes("p")) {
        content = content.replace("p", "B");
    }

    // Replace an ending "A" with an "8"
    if (content.charAt(content.length - 1) == "a") {
        content = content.replaceAt((content.length - 1), "8");
    } /* * */
    //C 82 ba
    //content.replace(/\b(?<=[a-h])a\b/g,'8');

    // Replace the word "beat" with "B"
    content = content.replace(/beat/g, 'B');

    // Replace the word "bah" with "B8"
    content = content.replace(/bah/g, 'B8');

    // Replace every "V" with a "B"
    content = content.replace(/v/g, 'B');

    //Replace the word "for" with the number "4"
    content = content.replace(/for/g, '4');

    // Replace the word "before" with "B4"

    content = content.replace(/before/g, 'B4');

    // Remove "th" that may appear after any number
    content = content.replace(/th/g, '');

    content = content.replace(/2nh3/g, 'to H3');
    return content;
}
