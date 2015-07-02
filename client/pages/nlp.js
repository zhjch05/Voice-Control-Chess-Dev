NLP = function() {
    var ENV = function() {
        var dialogs = [];
        return {
            init: function() {
                return 0;
            },
            lastIndex: function() {
                return dialogs.length - 1;
            },
            newIndex: function() {
                return dialogs.length;
            }
        }
    }
    var maindecision = function(content) {
        return {
            commandcontrol: function() {
                if (content.search(/restart|pause|reset|undo/) > -1) return true;
                return false;
            },
            commandinquiry: function() {
                return;
            }
        }
    }
    var analyzecontrol = function() {

    }
    var beautify = function(content) {
        content = content
                .trim()
                .toLowerCase()
                .replace(/\s+/, ' ');
        return content;
    }
    var move = function(source, target) {
        onDrop(source, target);
        myboard.position(game.fen());
    }
    var mainTree = function(content) {
        if (maindecision(content).commandcontrol() === true) {
            analyzecontrol(content);
        }
        else if (content.search(dictionary().commandinquiry()) > -1) {

        }
        else if (content.search(dictionary().commandmove()) > -1) {

        }
        else if (content.search(dictionary().commandother()) > -1) {

        }
        else return -1;
    }
    return {
        init: function() {
            env = new ENV();
            env.init();
            return 'Hello from the NLP system. Input your command please. The instructions are on the left.';
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
