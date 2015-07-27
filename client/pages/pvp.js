moveSound = new buzz.sound('/sounds/moveSound.wav'); // From: https://www.freesound.org/people/KorgMS2000B/sounds/54414/
winSound = new buzz.sound('/sounds/victory.wav'); // From: https://www.freesound.org/people/FoolBoyMedia/sounds/234526/
muted = false;
flipturn = {};
flipturn['white'] = 'black';
flipturn['black'] = 'white';
turn = {};
turn['white'] = 'w';
turn['black'] = 'b';
Template.pvp.rendered = function() {
    gameId = Router.current().params._id;
    $.material.init();
    var post = Games.findOne({
        _id: gameId
    });
    var player1 = Meteor.users.findOne({
        _id: post.player1
    });
    var player2 = Meteor.users.findOne({
        _id: post.player2
    });
    if (player1._id == Meteor.userId()) {
        $('#youremail').append(player1.emails[0].address);
        $('#oppemail').append(player2.emails[0].address);
        orientation = post.startturn;
    } else {
        $('#youremail').append(player2.emails[0].address);
        $('#oppemail').append(player1.emails[0].address);
        orientation = flipturn[post.startturn];
    }
    myturn = turn[orientation];
    game = new Chess(post.fen);
    var removeGreySquares = function() {
        $('#pvpboard .square-55d63').css('background', '');
    };
    greySquare = function(square) {
        var squareEl = $('#pvpboard .square-' + square);
        var background = '#93dbd0';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#86b09b';
        }

        squareEl.css('background', background);
    };
    var onDragStart = function(source, piece, position, orientation) {
        if (game.turn() === myturn) {
            if (game.game_over() === true ||
                (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
        } else {
            return false;
        }
    };
    onDrop = function(source, target) {
        removeGreySquares();
        var sourcepiece = game.get(source);
        var targetpiece = game.get(target);
        if (!muted) {
            moveSound.play();
        }

        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';
        updateStatus();
        Meteor.call('updateGameFen', gameId, game.fen(), function(error, result) {
            if (error) {
                return alert(error.reason);
            }
        });
    };
    var onSnapEnd = function() {
        //myboard.position(game.fen());
    };
    updateStatus = function() {
        // //console.log("updateStatus");
        // var status = '';
        //
        // // checkmate?
        // if (game.in_checkmate() === true) {
        //     winSound.play();
        //     if (!muted) {
        //         var msg = new SpeechSynthesisUtterance('Checkmate');
        //         window.speechSynthesis.speak(msg);
        //     }
        //
        //     status = 'Game over, ' + moveColor + ' is in checkmate.';
        //
        //
        // }
        //
        // // draw?
        // else if (game.in_draw() === true) {
        //     status = 'Game over, drawn position';
        // }
        //
        // // game still on
        // else {
        //     status = moveColor + ' to move';
        //
        //     // check?
        //     if (game.in_check() === true) {
        //         if (!muted) {
        //             var msg = new SpeechSynthesisUtterance('Check');
        //             window.speechSynthesis.speak(msg);
        //         }
        //         status += ', ' + moveColor + ' is in check';
        //     }
        // }
    };
    onMouseoverSquare = function(square, piece) {
        if (game.game_over() === true) {
            return;
        }
        if (game.turn() != myturn) return;
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
        showCoordinate: true,
        orientation: orientation
    };
    //rendering board with cfg
    myboard = new ChessBoard('pvpboard', cfg);
    updateStatus();

    Tracker.autorun(function() {
        var gameObj = Games.findOne({
            _id: gameId
        });
        if (gameObj) {
            game = new Chess(gameObj.fen);
            myboard.position(game.fen());
        } else {
            Router.go('home');
        }
    });
}
Template.pvp.events({
    'click #quitbtn': function() {
        Meteor.call('deleteGame', gameId, function(error, result) {
            if (error) {
                return alert(error.reason);
            }
        });
    }
});