Template.home.rendered = function() {
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
    var onDrop = function(source, target) {
        removeGreySquares();
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });
        // illegal move
        if (move === null) return 'snapback';
        updateStatus();
        makeLog('Moved with mouse: from ' + source + ' to ' + target);
        makeTurnLog();
    };
    var onSnapEnd = function() {
        myboard.position(game.fen());
    };
    updateStatus = function() {
        console.log("updateStatus");
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
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
                status += ', ' + moveColor + ' is in check';
            }
        }
    };
    onMouseoverSquare = function(square, piece) {
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
    var cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        showCoordinate: true
    };
    //rendering board with cfg
    myboard = new ChessBoard('board', cfg);

    updateStatus();

    //jQuery layout
    $('#leftpanel').height($('#midpanel').height());
    $('#rightpanel').height($('#midpanel').height());
    
    //start log
    makeTurnLog();
}

//@param: content, put the content into the log space.
function makeLog(content) {
    //append content
    $('#logspace').append('<br/><br/>' + content);
    //auto scroll
    $('#scrollpanel').animate({
        scrollTop: $('#logspace').height()
    }, "slow");
};

function makeTurnLog() {
    if (game.game_over() === true) {
        makeLog('Game is over.');
    }
    else if (game.turn() === 'w') {
        makeLog('It is now white\'s turn');
    }
    else if (game.turn() === 'b') {
        makeLog('It is now black\'s turn');
    }
}

function analyzer(MYcmd) {
    var cmd = preProcess(MYcmd);
    if (cmd.indexOf('cancel') > -1) {
        return;
    }
    else if (cmd.indexOf('confirm') > -1) {
        action(cmd);
    }
    else {
        autoSense(cmd);
    }
}

function preProcess(content) {
    content = content.trim();
    content = content.toLowerCase();
    content = content.replace(/\s+/g, ' ');
    return content;
}

function action(MYcmd) {
    if (MYcmd.search(/to|take/) > -1) {
        performMove(MYcmd);
    }
}

function performMove(MYcmd) {
    var results = MYcmd.match(/[a-h]\d/ig);
    if (results.length > 2) {
        makeLog('There seems more pieces than two you typed.');
    }
    else if (results.length === 1) {
        makeLog('There seems only one piece you typed.');
    }
    else if (results.length === 2) {
        var isLegal = testLegal(results[0], results[1]);
    }
    return false;
}

function testLegal(piecefrom, pieceto) {

}