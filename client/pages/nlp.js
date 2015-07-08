NLP = function() {
    var Sentence = function(content, owner, pieces, preps, dets, controlkey) {
        this.content = content;
        this.owner = owner;
        this.pieces = pieces;
        this.preps = preps;
        this.dets = dets;
        this.controlkey = controlkey;
        console.log({
            content: this.content,
            owner: this.owner,
            pieces: this.pieces,
            preps: this.preps,
            dets: this.dets,
            controlkey: this.controlkey,
            intent: this.intent
        });
        if (owner === 'usr') {
            if (controlkey !== null) {
                this.intent = 'control';
            } else if (dets !== null) {
                this.intent = 'inquiry';
            } else if ($.inArray('to', preps) > -1 || $.inArray('take', preps) > -1) {
                this.intent = 'move';
            } else if ($.inArray('at', preps) > -1 || $.inArray('on', preps) > -1 || $.inArray('in', preps) > -1) {
                this.intent = 'inquiry';
            } else this.intent = 'other';
        }
        return {
            content: this.content,
            owner: this.owner,
            pieces: this.pieces,
            preps: this.preps,
            dets: this.dets,
            controlkey: this.controlkey,
            intent: this.intent
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
        return content.match(/what|who|which|how|when|where|can|could|may/g);
    };
    var getControlKey = function(content) {
        return content.match(/reset|restart|undo|surrender/g);
    }

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
                var sentence = new Sentence('Hello from the NLP system. Input your command please. The instructions are on the left.', 'sys', null, null, null, null);
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
        var controlkey = getControlKey(content);
        var sentence = new Sentence(content, owner, pieces, preps, dets, controlkey);
        console.log(JSON.stringify(sentence));
        return sentence;
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
        if (source.search(/[a-h][1-8]/) > -1) {
            onDrop(source, target);
        }
        else {
            
        }
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
            //content = errorCheck(content);
            var sentence = parseToSentence(content);
            if (sentence.intent !== null || sentence.intent !== undefined) {
                switch (sentence.intent) {
                    case 'control':

                        break;
                    case 'inquiry':

                        break;
                    case 'move':
                        // corPieces = [];
                        // _.each(sentence.pieces, function(piece) {
                        //     if (piece.search(/[a-h][1-8]/) > -1) {
                        //         corPieces.push(piece);
                        //     }
                        // });
                        // switch (corPieces.length) {
                        //     case 0:
                        //         return -1;
                        //         break;
                        //     case 1:
                        //
                        //         break;
                        //     case 1:
                        //
                        //         break;
                        //     default:
                        //         return -1;
                        // }
                        var pieces = sentence.pieces;
                        if (pieces.length === 2) {
                            move(pieces[0], pieces[1]);
                            return 'Moved from ' + pieces[0] + ' to ' + pieces[1] + '.';
                        }
                        break;
                    case 'other':

                        break;
                    default:
                        console.log('bad switch intent');
                        return;
                }
            }
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
