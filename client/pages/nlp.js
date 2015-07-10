function testLegal(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });
    if (move === null) return false;
    else {
        game.undo();
        return true;
    }
    return undefined;
}

NLP = function() {
    var env, currentState;
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
    var sysLog = function(outstr){
        env.push(new Sentence(outstr, 'sys'),'reply');
        return outstr;
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
        dialogs = [];
        var getCurDialog = function() {
            return dialogs[dialogs.length - 1];
        };
        var getCurSentence = function() {
            curdialog = getCurDialog();
            return curdialog[curdialog.length - 1];
        };
        var push = function(sentence, state) {
            if (state === 'new') {
                //create new dialog
                var newSentences = [];
                newSentences.push(sentence);
                dialogs.push(newSentences);
            } else {
                //push to current dialog
                var lastDialog = dialogs.pop();
                lastDialog.push(sentence);
                dialogs.push(lastDialog);
            }
        }
        return {
            init: function() {
                var sentences = [];
                var sentence = new Sentence('Hello from the NLP system. Input your command please. The instructions are on the left.', 'sys');
                push(sentence,currentState);
                return getCurSentence();
            },
            getCurDialog: function() {
                return getCurDialog();
            },
            getCurSentence: function() {
                return getCurSentence();
            },
            push: function(sentence,state){
                return push(sentence,state);
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
        env.push(sentence,currentState);
        console.log(dialogs);
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
        var generateOptions = function(pieces) {
            var output = '';
            _.each(pieces, function(piece) {
                output += piece.loc + ' / ';
            });
            output.replace(/\/\s+$/g, '')
                .replace(/\s+$/g, '');
            output += '?';
            return output;
        }
        if (source.search(/[a-h][1-8]/) > -1) {
            onDrop(source, target);
            myboard.position(game.fen());
            return sysLog('Moved from ' + source + ' to ' + target + '.');
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
                return sysLog('Moved ' + dictR[availablePieces[0].piece.type] + ' at ' + availablePieces[0].loc + ' to ' + target + '.');
            } else if (availablePieces.length > 1) {
                currentState = 'moreValidMoves';
                return sysLog('More than one valid move, ' + dictR[availablePieces[0].piece.type] + ' at ' + generateOptions(availablePieces));
            }
        }
    };

    var dispatcher = function(sentence, state, env) {
        switch (state.content) {
            case 'new':
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
                break;
            case 'moreValidMoves':
                var onlypiece = sentence.pieces[0];
                if (onlypiece !== null && onlypiece !== undefined) {

                }
                break;
            default:
                return undefined;
        }
    }

    //public APIs
    return {
        init: function() {
            env = new ENV();
            currentState = 'new';
            return env.init();
        },
        input: function(content) {
            content = beautify(content);
            //content = errorCheck(content);
            var sentence = parseToSentence(content);
            if (sentence.intent !== null || sentence.intent !== undefined) {
                return dispatcher(sentence, {
                    content: currentState
                }, env);
            }
        },
        resetState: function() {
            if (currentState !== 'new') {
                currentState = 'new';
                return sysLog('New dialog begins.');
            }
            return undefined;
        }
    }
}