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
    dict['bishop'] = 'b';
    var dictR = {};
    dictR['b'] = 'bishop';
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
    var sysLog = function(outstr) {
        env.push(new Sentence(outstr, 'sys'), 'reply');
        return outstr;
    };
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
        return content.match(/reset|restart|undo|surrender|repeat/g);
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
        var getLastSysSentence = function() {
            for (var k = dialogs.length - 1; k >= 0; k--) {
                var lastDialog = dialogs[k];
                for (var i = lastDialog.length - 1; i >= 0; i--) {
                    if (lastDialog[i].owner === 'sys') {
                        return lastDialog[i];
                    }
                }
            }
        };
        var getLastUsrSentence = function(n) {
            if (n === undefined) {
                for (var k = dialogs.length - 1; k >= 0; k--) {
                    var lastDialog = dialogs[k];
                    for (var i = lastDialog.length - 1; i >= 0; i--) {
                        if (lastDialog[i].owner === 'usr') {
                            return lastDialog[i];
                        }
                    }
                }
            } else {
                for (var k = dialogs.length - 1; k >= 0; k--) {
                    var lastDialog = dialogs[k];
                    for (var i = lastDialog.length - 1; i >= 0; i--) {
                        if (lastDialog[i].owner === 'usr') {
                            n--;
                            if (n === 0) {
                                return lastDialog[i];
                            }
                        }
                    }
                }
            }
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
                push(sentence, currentState);
                return getCurSentence();
            },
            getCurDialog: function() {
                return getCurDialog();
            },
            getCurSentence: function() {
                return getCurSentence();
            },
            push: function(sentence, state) {
                return push(sentence, state);
            },
            getLastSysSentence: function() {
                return getLastSysSentence();
            },
            getLastUsrSentence: function(n) {
                return getLastUsrSentence(n);
            }
        }
    };

    var undoSan = function() {
        if (steps % 2 === 0) {
            $('td:last').remove();
        } else {
            $('td:last').remove();
            $('td:last').remove();
            $('tr:last').remove();
        }
    }

    var parseToSentence = function(content) {
        var owner = 'usr';
        var pieces = getPieces(content);
        var preps = getPreps(content);
        var dets = getDets(content);
        var controlkey = getControlKey(content);
        var sentence = new Sentence(content, owner, pieces, preps, dets, controlkey);
        env.push(sentence, currentState);
        return sentence;
    };

    var getInfo = function(sentence) {
        var pieceLoc = sentence.pieces[0];
        var piece = game.get(pieceLoc);
        var output = '';
        if (piece !== undefined && piece !== null) {
            output = 'There is a ' + dictR[piece.type] + ' on ' + pieceLoc + '.';
        } else {
            output = 'There is no piece on ' + pieceLoc + '.';
        }
        return output;
    }

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
            output = output.replace(/\/\s+$/g, '');
            output = output.replace(/\s+$/g, '');
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

    var decision = function(sentence){
        switch (sentence.intent) {
            case 'control':
                if ($.inArray('repeat', sentence.controlkey) > -1) {
                    return env.getLastSysSentence().content;
                } else if ($.inArray('undo', sentence.controlkey) > -1) {
                    steps -=1;
                    game.undo();
                    myboard.position(game.fen());
                    sidebar.undo();
                    currentState = 'new';
                    undoSan();
                    return sysLog('Undo done.');
                } else if ($.inArray('reset', sentence.controlkey) > -1 || $.inArray('restart', sentence.controlkey) > -1) {
                    steps =0;
                    game.reset();
                    myboard.position(game.fen());
                    sidebar = new Sidebar();
                    $('#sanbody').empty();
                    $('#turnindicator').html('<p><i class="fa fa-circle-o"></i>&nbsp;' + "White's turn</p>");
                    currentState = 'new';
                    return sysLog('Restarted the game.');
                }
                break;
            case 'inquiry':
                if (sentence.dets !== undefined && sentence.dets !== null) {
                    return sysLog(getInfo(sentence));
                }
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
    var dispatcher = function(sentence, state, env) {
        switch (state.content) {
            case 'new':
                return decision(sentence);
                break;
            case 'moreValidMoves':
                if(sentence.pieces !== null && sentence.pieces !== undefined){
                    var onlypiece = sentence.pieces[0];
                    if (onlypiece !== null && onlypiece !== undefined) {
                        var target = env.getLastUsrSentence(2).pieces[1];
                        currentState = 'new';
                        return move(onlypiece, target);
                    };
                }
                else {
                    currentState = 'new';
                    return decision(sentence);
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
