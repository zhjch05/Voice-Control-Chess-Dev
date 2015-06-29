NLP = function() {
    var ENV = function() {
        var dialogs = [];
        return {
            init: function() {
                dialogs[0].syss["content"] = "Hello from the NLP system. Input your command please. The instructions are on the left.";
                return 0;
            },
            lastIndex: function(){
                return dialogs.length-1;
            },
            newIndex: function(){
                return dialogs.length;
            }
        }
    }
    var beautify = function(content) {
        content = content.trim();
        content = content.toLowerCase();
        content = content.replace(/\s+/, ' ');
        return content;
    }
    var move = function(source, target) {
        onDrop(source, target);
        myboard.position(game.fen());
    }
    return {
        init: function() {
            return 'Hello from the NLP system. Input your command please. The instructions are on the left.';
        },
        input: function(content) {
            content = beautify(content);
            if (content.match(/restart|reset/) != null) {
                game.reset();
                myboard.position(game.fen());
                return 'Reset done.';
            }
            else if (content.match(/undo/) != null) {
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
        }
    }
}