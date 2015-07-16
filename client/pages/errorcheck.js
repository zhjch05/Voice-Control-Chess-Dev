testData = function(){
    test=[
        "e22 e4",
        "882 b 8",
        "d8 to be 8",
        "d2 to see one",
        "822 bee tree",
        "332 d4",
        "f-22 f-35",
        "d22 h6",
        "82283",
        "anyone to see one",
        "882 east 7",
        "d7 moves to p6",
        "c82 pa",
        "beat 7288",
        "bah to a 7",
        "v6 takes d5",
        "e4 d5",
        "d16 d4",
        "c5 takes d for",
        "83 takes before",
        "a82 b 8th",
        "h2 2nh3",
        "92 f6",
        "porn pussy 4",
        "pontiac g6",
        "porn tube teen sex",
        "bishop to III",
        "flight 237",
        "queen tutitu",
        "bishop 286",
        "queen to see two",
        "night to eat too",
        "queen to age 4",
        "porn pics g6",
        "king louie 2",
        "book to g1",
        "look to g1",
        "hook to g1",
        "1 fisher to dc",
        "fondue",
        "voodoo"
    ];
    _.each(test,function(data){
        console.log(data+"  ///  "+errorCheck(data));
    });
    return "done";
}
errorCheck = function(content) {;
    content = content.trim();
    Bic = [
        //Remove Hyphens, for example "F-22 F-35" to "F22 F35", "d-22 H6" to "d22 H6"
        [/-|_/g,""],
        [/\b(\d)\d(\d\d)/g,"$1to$2"],
        [/\b2(\w\d)/g,"to $1"],
        [/(\w\d)2\b/g,"$1 to"]
    ];
    _.each(Bic,function(item){
        content = content.replace(item[0],item[1]);
    });
    content = content.trim()
        .toLowerCase()
        .replace(/\s+/g, '');
    Dic = [
        //Replace 'Fisher' with 'Bishop'		-> Bd3	1 Fisher to DC.
        [/fisher/g,"bishop"],
        //Replace 'fondue' and 'voodoo' with 'undo'
        [/fondue/g,"undo"],
        [/voodoo/g,"undo"],
        //Replace the word "anyone" with "E1", for example "anyone to see one" goes to "E1 to see one"
        [/anyone/g,"e1"],
        //Replace 'see' with 'C' and 'two' with '2'	-> Qc2 Queen to see two.
        [/two/g,"2"],
        //Replace 'eat' with 'E' and 'too' with '2'	-> Ne2 night to eat too.
        [/eat/g,"e"],
        [/too/g,"2"],
        //Replace the word 'age' with the letter 'H'	-> Qh4 	Queen to age 4.
        [/age/g,"h"],
        //Replace the word 'pics' with 'takes'	-> hg6	porn pics G6 (pawn takes g6)
        [/pics/g,"takes"],
        //Replace 'Louie' with 'to E'			-> Ke2 King Louie 2.
        [/louie/g,"toe"],
        //Replace the words: 'book', 'look', and
        //'hook' with 'Rook'			-> Rg1  book to G1. look to G1. hook to G1.
        [/look|hook|book/g,"rook"],
        //Replace initial 8 with an A, such as "882 B 8" to A82 B 8
        [/^8/g, "a"],
        //Replace an ending "A" with an "8". "c82 PA" -> "c82 P8".
        [/a$/g,"8"],
        //Must transform strings of the form E22 E4 to: E2 to E4.
        [/(\w[1-8])\d/, "$1to"],
        //Replace "Bee" with "B" and "Tree" with "3". "822 Bee Tree" to "822 B 3"
        [/bee/g, "b"],
        [/tree/g,"3"],
        //Replace "see" with "C" and "one" with "1", for example "D2 to see one" becomes "D2 to C 1"
        [/see/g, "c"],
        [/one/g,"1"],
        //Replace the word "be" with B, such as "d8 to be 8" to "d8 to B 8"
        [/be/g, "b"],
        //Replace a "33" start with "E3", such as "332 D4" to "E32 D4".
        [/33/g,"e3"],
        //Transform length 5 numbers into commands replacing 8s with As if they are at index 0 or 3. Such as,  82283 to "A22A3", then
        [/8(\d)/g, "a$1"],//again
        //Replace the word "East" with "E", for example "882 East 7" becomes "882 E 7"
        [/east/g,"e"],
        //Replace every "P" with a "B" where the "P" is in a position, such as "D7 moves to P6" becomes "D7 moves to B6".
        [/p([1-8])(?!=.+[a-h]\d)/g,"b$1"],
        //Replace the word "bah" with "B8".  "bah to a 7" -> "B8 to a 7".
        [/bah/g,"b8"],
        //Replace every "V" with a "B". "V6 takes D5" -> "B6 takes D5".
        [/v(\d)/g,"b$1"],
        //Add "to" when there's only 2 words in the sentence, i.e. "E4 D5" -> "E4 to D5".
        [/([a-h]\d)([a-h]\d)/,"$1to$2"],
        //Replace an extra "6" with the word "takes", i.e. "D16 D4" -> "D1 takes D4".
        [/(\w\d)6/g,"$1takes"],
        //Replace the word "before" with "B4", i.e. "83 takes before" -> "83 takes B4".
        [/before/g,"b4"],
        //Replace the word "for" with the number "4", i.e. "C5 takes D for" -> "C5 takes D 4"
        [/for|four/g,"4"],
        //Remove "th" and "nd" that may appear after any number, for example "A82 B 8th" to "A82 B 8"
        //H2 2nh3. -> H2 to H3
        [/(\d)th/g,"$1"],
        [/(\d)n/g,"$1"],
        //Replace a starting '9' with 'knight' 	-> Nf6	92 F6.
        [/^night/,"knight"],
        [/^9/,"knight"],
        //Replace the word 'porn' with the word 'pawn',
        [/porn/g,"pawn"],
        //also replace 'pussy' with 'to c' 	-> c4	porn pussy 4.
        [/pussy/g,"toc"],
        //Replace the word 'Pontiac' with 'Pawn to' 	-> g6 	Pontiac G6.
        [/pontiac/g,"pawn to"],
        //Replace the word 'sex' with the number '6' 	-> g6	porn tube teen sex.
        [/sex/g,"6"],
        [/tube/g,"to"],
        //Replace 'III' with 'E3'			-> Be3 	Bishop to III.
        [/iii/g,"e3"],
        //Replace 'flight' and 'bright' with 'knight'	-> Nd7	Flight 237.
        [/flight|bright/g,"knight"],
        //Replace the word 'TuTiTu' with 'to D2'	-> Qd2 	Queen TuTiTu.
        [/tutitu/g,"tod2"],
        //If the second to last char is 8, replace it
        //with an A				-> Bh6 	Bishop 286
        [/8(.)$/,"a$1"],
        //last
        [/([a-h]\d)\d/g,"$1"]
    ];
    _.each(Dic,function(item){
        content = content.replace(item[0],item[1]);
    });
    return content;
}
