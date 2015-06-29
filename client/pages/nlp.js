NLP = function(){
    var beautify = function(content){
        content = content.trim();
        content = content.toLowerCase();
        content = content.replace(/\s+/,' ');
        return content;
    }
    var move = function(source,target){
        onDrop(source,target);
        myboard.position(game.fen());
    }
    return {
        init: function(){
            return 'Hello from the NLP system. Input your command please. The instructions are on the left.';
        },
        input: function(content){
            content = beautify(content);
            if(content.match(/restart|reset/)!=null)
            {
                game.reset();
                myboard.position(game.fen());
                //makeLog('Reset.','sys');
            }
            else if(content.match(/undo/)!=null)
            {
                game.undo();
                myboard.position(game.fen());
                //makeLog('Undo.','sys');
            }
            else if(content.match(/to|take/)!=null){
                var pieces = content.match(/[a-h]\d/g);
                console.log(pieces);
                if(pieces.length === 2){
                    move(pieces[0],pieces[1]);
                }
            }
        }
    }
}