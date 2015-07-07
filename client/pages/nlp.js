NLP = function() {
    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    }
    var errorCheck = function(content) {
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
        content.replace(/\b[a-h]a\b/g,)

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

    var Sentence = function(content, owner, pieces, preps, dets) {
        this.content = content;
        this.owner = owner;
        this.pieces = pieces;
        this.preps = preps;
        this.dets = dets;
        var getIntent = function() {
            return '';
        }
        return {
            content: this.content,
            owner: this.owner,
            pieces: this.pieces,
            preps: this.preps,
            dets: this.dets,
            intent: getIntent()
        }
    }

    //parsing functions
    var getPieces = function(content) {
        return content.match(/([a-h][1-8])|knight|bishop|queen|king|pawn|rook/g);
    };
    var getPreps = function(content) {
        return content.match(/to|take|on|at|in/g);
    };
    var getDets = function(content) {
        return content.match(/what|which|how|when|where|can|could|may/g);
    };

    //the environment object, main data structure
    var ENV = function() {
        var dialogs = [];
        var getCurDialog = function() {
            return dialogs[dialogs.length - 1];
        }
        var getCurSentence = function() {
            curdialog = getCurDialog();
            return curdialog[curdialog.length - 1];
        }
        return {
            init: function() {
                var sentences = [];
                var sentence = new Sentence('Hello from the NLP system. Input your command please. The instructions are on the left.', 'sys', null, null, null);
                sentences.push(sentence);
                dialogs.push(sentences);
                return getCurSentence();
            }
        }
    };

    var parseToSentence = function(content) {
        var owner = 'usr';
        var pieces = getPieces(content);
        var preps = getPreps(content);
        var dets = getDets(content);
        var sentence = new Sentence(content, owner, pieces, preps, dets);
        console.log(sentence);
    };

    //format the input
    var beautify = function(content) {
        content = content.trim()
            .toLowerCase()
            .replace(/\s+/g, ' ');
        return content;
    };

    //chess/chessboard control
    var move = function(source, target) {
        onDrop(source, target);
        myboard.position(game.fen());
    };



    //public APIs
    return {
        init: function() {
            env = new ENV();
            return env.init();
        },
        input: function(content) {
            content = beautify(content);
            content = errorCheck(content);
            parseToSentence(content);
        }
    }
}


/*
if (content.match(/restart|reset/) !== null) {
                game.reset();
                myboard.position(game.fen());
                return 'Reset done.';
            }
            else if (content.match(/undo/) !== null) {
                game.undo();
                myboard.position(game.fen());
                return 'Undo done.';
            }
            else if (content.match(/to|take/) != null) {
                var pieces = content.match(/[a-h]\d/g);
                console.log(pieces);
                if (pieces.length === 2) {
                    move(pieces[0], pieces[1]);
                    return 'Moved from ' + pieces[0] + ' to ' + pieces[1] + '.';
                }
            }
*/
