function testLegal(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    if (move === null) return false;
    else {
        game.undo();
        return true;
    }
    return undefined;
}

NLP = function() {
    var dict = {};
    dict['knight'] = 'n';
    dict['king'] = 'k';
    dict['rook'] = 'r';
    dict['pawn'] = 'p';
    dict['queen'] = 'q';
    var dictR = {};
    dictR['n'] = 'knight';
    dictR['k'] = 'king';
    dictR['r'] = 'rook';
    dictR['p'] = 'pawn';
    dictR['q'] = 'queen';
    var Sentence = function(content, owner, pieces, preps, dets, controlkey) {
        this.content = content;
        this.owner = owner;
        this.pieces = pieces;
        this.preps = preps;
        this.dets = dets;
        this.controlkey = controlkey;
        // console.log({
        //     content: this.content,
        //     owner: this.owner,
        //     pieces: this.pieces,
        //     preps: this.preps,
        //     dets: this.dets,
        //     controlkey: this.controlkey,
        //     intent: this.intent
        // });
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
        };
        var getCurSentence = function() {
            curdialog = getCurDialog();
            return curdialog[curdialog.length - 1];
        };
        var startNewDialog = function(){
            dialogs.push([]);
        };
        return {
            init: function() {
                var sentences = [];
                var sentence = new Sentence('Hello from the NLP system. Input your command please. The instructions are on the left.', 'sys' /*, null, null, null, null*/ );
                sentences.push(sentence);
                dialogs.push(sentences);
                return getCurSentence();
            },
            getCurDialog: function(){
                return getCurDialog();
            },
            getCurSentence: function(){
                return getCurSentence();
            },
            startNewDialog: function(){
                return startNewDialog();
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
        // console.log(JSON.stringify(sentence));
        return sentence;
    };

    //format the input
    var beautify = function(content) {
        content = content.trim()
            .toLowerCase()
            .replace(/\s+/g, '');
        return content;
    };

    //chess/chessboard control
    var move = function(source, target) {
        if (source.search(/[a-h][1-8]/) > -1) {
            onDrop(source, target);
            myboard.position(game.fen());
            return 'Moved from ' + source + ' to ' + target + '.';
        } else {
            var availablePieces = [];
            _.each(game.SQUARES, function(piece) {
                var tmp = game.get(piece);
                if (tmp !== null && tmp !== undefined) {
                    if (dictR[tmp.type] === source && game.turn() === tmp.color) {
                        if (testLegal(piece, target) === true) {
                            availablePieces.push({
                                loc: piece,
                                piece: tmp
                            });
                        }
                    }
                }
            });
            if (availablePieces.length === 1) {
                onDrop(availablePieces[0].loc, target);
                myboard.position(game.fen());
                return 'Moved ' + dictR[availablePieces[0].piece.type] + ' at ' + availablePieces[0].loc + ' to ' + target + '.';
            }
        }
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
                        var pieces = sentence.pieces;
                        if (pieces.length === 2) {
                            return move(pieces[0], pieces[1]);
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
