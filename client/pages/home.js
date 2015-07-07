Template.home.events({
    'submit #formcmd': function(event) {
        event.preventDefault();
        var cmd = event.target.inputCommand.value;
        makeLog(cmd,'usr');
        makeLog(nlp.input(cmd),'sys');
        $('#inputCommand').val('');
    }
});

Template.home.rendered = function() {
    $.material.init();
    game = new Chess();
    steps = 0;
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
        if (targetpiece != null) {
            updatestatistics(targetpiece);
        }
        else {
            updatestatisticsPawn(source, target, sourcepiece, targetpiece);
        }
        updateStatus();
        console.log(move);
        makeIndicator(move);

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
    $('#logspace').height($('#rightpanel').height() - 137);
    $('#inst').height($('#leftpanel').height()-105);


    //start log
    makeTurnLog();

    nlp = new NLP();
    initReturn= nlp.init();
    makeLog(initReturn.content, initReturn.owner);
}

//@param: content, put the content into the log space.
function makeLog(content, user) {
    if (user === 'usr') {
        $('#scrollspace').append('<p class="text-info">User: ' + content + '</p>');
        //auto scroll
        $('#logspace').animate({
            scrollTop: $('#scrollspace').height()
        }, "slow");
    }
    else if (user === 'sys') {
        $('#scrollspace').append('<p class="text-danger">System: ' + content + '</p>');
        //auto scroll
        $('#logspace').animate({
            scrollTop: $('#scrollspace').height()
        }, "slow");

        /*https://tts.neospeech.com/rest_1_1.php?method=ConvertSimple&email=zjc1996@brandeis.edu&accountId=cd95c0b038&loginKey=zhjchloginkey&loginPassword=0b5301479837b0b840a0&voice=TTS_PAUL_DB&outputFormat=FORMAT_WAV&sampleRate=16&text=The+quick+brown+fox+jumps+over+the+lazy+dog*/


    }
};

function makeTurnLog() {
    if (game.game_over() === true) {
        $('#turnindicator').html("<p>Game is over</p>");
    }
    else if (game.turn() === 'w') {
        $('#turnindicator').html('<p><i class="fa fa-circle-o"></i>&nbsp;' + "White's turn</p>");
    }
    else if (game.turn() === 'b') {
        $('#turnindicator').html('<p><i class="fa fa-circle"></i>&nbsp;' + "Black's turn</p>");
    }
}

function updatestatistics(piece) {
    if (piece.color != null) {
        var piecejquery = '#' + piece.color + piece.type;
        $(piecejquery).html(parseInt($(piecejquery).html()) + 1 + '');
    }
}

function updatestatisticsPawn(source, target, sourcepiece, targetpiece) {
    var vertiCoorSrc, vertiCoorTar;
    var piecejquery;
    if (sourcepiece.type === 'p') {
        vertiCoorSrc = source.match(/[a-h]/);
        vertiCoorTar = target.match(/[a-h]/);
        if (vertiCoorSrc[0] !== vertiCoorTar[0]) {
            if (targetpiece === null) {
                if (sourcepiece.color === 'w') {
                    piecejquery = '#' + 'b' + 'p';
                }
                else if (sourcepiece.color === 'b') {
                    piecejquery = '#' + 'w' + 'p';
                }
                $(piecejquery).html(parseInt($(piecejquery).html()) + 1 + '');
            }
        }
    }
}

function makeIndicator(move) {
    steps += 1;
    switch (steps % 2) {
        case 1:
            var title = parseInt(steps / 2) + 1;
            $('#sanbody').append('<tr><td>' + title + '</td><td>' + move.san + '</td>');
            break;
        case 0:
            $('tr:last').append('<td>' + move.san + '</td>');
            break;
        default:
            return -1;
    }
    $('#tablerow').animate({
        scrollTop: $('#leadertable').height()
    }, "slow");
}
