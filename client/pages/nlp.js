NLP = function() {
    //parsing functions
    var getPieces = function(content) {
        return content.match(/([a-h][1-8])|knight|bishop|queen|king|pawn|rook/g);
    };
    var getPreps = function(content) {
        return content.match(/to|take|on|at|in/g);
    };
    var getDets = function(content) {
        return content.match(/what|which|how|when|where/g);
    };

    //the environment object, main data structure
    var ENV = function() {
        var Sentence = function(content, owner) {
            this.content = content;
            this.owner = owner;
            return {
                content: this.content,
                owner: this.owner
            }
        }
        var dialogs = [];
        var getCurDialog = function(){
            return dialogs[dialogs.length - 1];
        }
        var getCurSentence = function(){
            curdialog = getCurDialog();
            return curdialog[curdialog.length - 1];
        }
        return {
            init: function() {
                var sentences = [];
                var sentence = new Sentence('Hello from the NLP system. Input your command please. The instructions are on the left.', 'sys');
                sentences.push(sentence);
                dialogs.push(sentences);
                return getCurSentence();
            }
        }
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

    //public API
    return {
        init: function() {
            env = new ENV();
            return env.init();
        },
        input: function(content) {
            content = beautify(content);
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
