Template.pvptest.rendered = function() {
    $.material.init();
    game = new Chess();
    var removeGreySquares = function() {
        $('#board .square-55d63').css('background', '');
    };
    var greySquare = function(square) {
        var squareEl = $('#board .square-' + square);

        var background = '#93dbd0';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#86b09b';
        }

        squareEl.css('background', background);
    };
    var onDragStart = function(source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };
    onDrop = function(source, target) {
        removeGreySquares();
        var sourcepiece = game.get(source);
        var targetpiece = game.get(target);
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';
        updateStatus();
    };
    var onSnapEnd = function() {
        
        myboard.position(game.fen());
    };
    updateStatus = function() {
        //console.log("updateStatus");
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            var msg = new SpeechSynthesisUtterance('Checkmate');
            window.speechSynthesis.speak(msg);
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check() === true) {
                var msg = new SpeechSynthesisUtterance('Check');
                window.speechSynthesis.speak(msg);
                status += ', ' + moveColor + ' is in check';
            }
        }
    };
    onMouseoverSquare = function(square, piece) {
        if (game.game_over() === true) {
            return;
        }
        // get list of possible moves for this square
        var moves = game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        // highlight the square they moused over
        greySquare(square);

        // highlight the possible squares for this piece
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].to);
        }
    };
    var onMouseoutSquare = function(square, piece) {
        removeGreySquares();
    };
    //rendering board with cfg
    myboard = new ChessBoard('board', {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        showCoordinate: true
    });

    updateStatus();
}
