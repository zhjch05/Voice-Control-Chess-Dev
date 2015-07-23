errorCorrect = function(str) {
    var basicProc = function(str) {
        var DbasicProc = [
            //Remove Hyphens, for example "F-22 F-35" to "F22 F35", "d-22 H6" to "d22 H6"
            [/-|_/g, ""]
        ];
        _.each(DbasicProc, function(item) {
            str = str.replace(item[0], item[1]);
        });
        return str;
    }
    var wordProc = function(str) {
        var DwordProc = [
            //Replace a starting '9' with 'knight' 	-> Nf6	92 F6.
            [/\bnight/, "knight"],
            [/\b9/, "knight"],
            //Replace 'Fisher' with 'Bishop'		-> Bd3	1 Fisher to DC.
            [/\bfisher/g, "bishop"],
            //Replace 'fondue' and 'voodoo' with 'undo'
            [/\bfondue/g, "undo"],
            [/\bvoodoo/g, "undo"],
            //Replace the word "anyone" with "E1", for example "anyone to see one" goes to "E1 to see one"
            [/\banyone/g, "e1"],
            //Replace the word 'pics' with 'takes'	-> hg6	porn pics G6 (pawn takes g6)
            [/\bpics/g, "takes"],
            //Replace 'Louie' with 'to E'			-> Ke2 King Louie 2.
            [/\blouie/g, "to e"],
            //Replace the word 'porn' with the word 'pawn',
            [/\bporn/g, "pawn"],
            //teen
            [/\bteen/g, "e "],
            //also replace 'pussy' with 'to c' 	-> c4	porn pussy 4.
            [/\bpussy/g, "to c"],
            //Replace the word 'Pontiac' with 'Pawn to' 	-> g6 	Pontiac G6.
            [/\bpontiac/g, "pawn to"],
            //Replace the word 'sex' with the number '6' 	-> g6	porn tube teen sex.
            [/\bsex/g, "6"],
            [/\btube/g, "to"],
            //Replace 'III' with 'E3'			-> Be3 	Bishop to III.
            [/iii/g, "e3"],
            //Replace the word "East" with "E", for example "882 East 7" becomes "882 E 7"
            [/\beast/g, "e"],
            //Replace 'flight' and 'bright' with 'knight'	-> Nd7	Flight 237.
            [/\bflight|\bbright/g, "knight"],
            //Replace the word 'TuTiTu' with 'to D2'	-> Qd2 	Queen TuTiTu.
            [/\btutitu/g, "to d2"],
            //Replace 'see' with 'C' and 'two' with '2'	-> Qc2 Queen to see two.
            [/\btwo/g, "2"],
            //beat
            [/\bbeat/g, "b"],
            //Replace 'eat' with 'E' and 'too' with '2'	-> Ne2 night to eat too.
            [/\beat/g, "e"],
            [/\btoo/g, "2"],
            //Replace the word 'age' with the letter 'H'	-> Qh4 	Queen to age 4.
            [/\bage/g, "h"],
            //Replace the word "before" with "B4", i.e. "83 takes before" -> "83 takes B4".
            [/\bbefore/g, "b4"],
            //Replace the words: 'book', 'look', and
            //'hook' with 'Rook'			-> Rg1  book to G1. look to G1. hook to G1.
            [/\blook|\bhook|\bbook/g, "rook"],
            //Replace "Bee" with "B" and "Tree" with "3". "822 Bee Tree" to "822 B 3"
            [/\bbee/g, "b"],
            [/\btree/g, "3"],
            //Replace "see" with "C" and "one" with "1", for example "D2 to see one" becomes "D2 to C 1"
            [/\bsee/g, "c"],
            [/\bone/g, "1"],
            //Replace the word "be" with B, such as "d8 to be 8" to "d8 to B 8"
            [/\bbe/g, "b"],
            //Replace the word "for" with the number "4", i.e. "C5 takes D for" -> "C5 takes D 4"
            [/\bfor|\bfour/g, "4"],
            //Replace the word "bah" with "B8".  "bah to a 7" -> "B8 to a 7".
            [/bah/g, "b8"],

        //Extras
            //Replace 'punk' with 'pawn' -- punk D 6. 
            [/\bpunk/g, "pawn"],

            //Replace 'defy','decide', 'defies' and 'define' with 'D5' -- defy.
            [/\bdefy/g, "d5"],
            [/\bdecide/g, "d5"],
            [/\bdefies/g, "d5"],
            [/\bdefine/g, "d5"],

            //Replace 'Ponte de' with 'Pawn to D' -- Ponte de 4.
            [/\bpont\sde/g, "pawn to d"],

            //Replace a starting 'on' with 'pawn' -- on TD 4
            [/\bon/g, "pawn"],
            
            //Replace the word 'context' with 'pawn takes' -- context d4.
            [/\bcontext/g, "pawn takes"],
        
            //Replace the word 'Nate' with 'Knight' -- Nate to s3. 
            [/\bnate/g, "knight"],

            //Replace the word 'pontoo' and 'pontoon' with 'Pawn to' -- pontoo III.   -- pontoon d4. 
            [/\bpontoon/g, "pawn to"],
            [/\bpontoo/g, "pawn to"],
        
            //Replace the word 'pontic' with 'Pawn takes' -- pontic 64.
            [/\bpontic/g, "pawn takes"],


        ];
        _.each(DwordProc, function(item) {
            str = str.replace(item[0], item[1]);
        });
        return str;
    };
    var fragWordProc = function(str) {
        var DfragWordProc = [
            //Remove "th" and "nd" that may appear after any number, for example "A82 B 8th" to "A82 B 8"
            //H2 2nh3. -> H2 to H3
            [/(\d)th/g, "$1"],
            [/(\d)n/g, "$1"],
            //Replace a "33" start with "E3", such as "332 D4" to "E32 D4".
            [/33/g, "e3"]
        ];
        _.each(DfragWordProc, function(item) {
            str = str.replace(item[0], item[1]);
        });
        return str;
    };
    var comb = function(str) {
        str = str.replace(/\b([a-z])\s+([1-8])/g, "$1$2 ");
        return str;
    };
    var _2gram = function(str) {
        var D_2gram = [
            [/\b8(\w)\b/g, "a$1"],
            [/\b(\w)a\b/g, "$18"],
            [/\bp([1-8])\b/g, "b$1"],
            [/\bv([1-8])\b/g, "b$1"],
            [/\b([a-h])c\b/g, "$13"],
            [/\b3([1-8])\b/g,"e$1"]//37
        ];
        _.each(D_2gram, function(item) {
            str = str.replace(item[0], item[1]);
        });
        return str;
    };
    var _3gram = function(str) {
        var D_3gram = [
            [/\b([a-h1-8][a-h1-8])2\b/g, "$1 to"],
            [/\b2([a-h1-8][a-h1-8])\b/g, "to $1"],
            [/\b([a-h1-8][a-h1-8])6\b/g, "$1 takes"],
            [/\b(pawn|knight|king|queen|rook|bishop)2/g, "$1 to"],
            [/\b(pawn|knight|king|queen|rook|bishop)6/g, "$1 takes"],
            [/\b([a-h1-8][a-h1-8])\w\b/g, "$1"]
        ];
        _.each(D_3gram, function(item) {
            str = str.replace(item[0], item[1]);
        });
        return str;
    };
    // var _4gram = function(str) {
    //
    // }
    var _5gram = function(str) {
        str = str.replace(/\b(\d{3})(\d{2})/g, "$1 $2");
        return str;
    };
    var add2 = function(str) {
        if (str.search(/to|take/) === -1) {
            str = str.replace(/([a-h][1-8])\s+([a-h][1-8])/, "$1 to $2");
        }
        return str;
    }
    var beautify = function(str) {
        str = str.trim();
        str = str.replace(/\s+/g, " ");
        return str;
    }
    str = str.trim().toLowerCase();
    str = wordProc(basicProc(str));
    //str = str.trim().replace(/\s+/g,"");
    str = fragWordProc(str);
    str = comb(str);
    str = str.trim();

    str = _5gram(str);
    str = _3gram(str);
    str = _2gram(str);
    str = add2(str);
    str = beautify(str);
    return str;
}

CorrectionTest = function() {
    var testdata = [
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
    _.each(testdata, function(data) {
        console.log(data + "  ///  " + errorCorrect(data));
    });
}
