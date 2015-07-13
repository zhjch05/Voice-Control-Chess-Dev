moveSound = new buzz.sound('/sounds/moveSound.wav');        // From: https://www.freesound.org/people/KorgMS2000B/sounds/54414/
winSound = new buzz.sound('/sounds/victory.wav');           // From: https://www.freesound.org/people/FoolBoyMedia/sounds/234526/


Template.memory.events({
    'submit #formcmd': function(event) {
        event.preventDefault();
        var cmd = event.target.inputCommand.value;
        makeLog(cmd,'usr');
        makeLog(NLP.input(cmd),'sys');
        $('#inputCommand').val('');
    },

    'click #spbutton': function(event){
        startDictation(event);
    },

    'click #surrenderbtn': function(event){
        game.game_over = true;
        var msg = new SpeechSynthesisUtterance('Player surrendered');
        winSound.play();
        window.speechSynthesis.speak(msg);
    },

    'click #restartbtn': function(event){
        game.game_over = false;
        nlp.input("restart");
        var msg = new SpeechSynthesisUtterance('Restarted the game');
        window.speechSynthesis.speak(msg);
    }
    

});

Template.memory.rendered = function() {
    
    //create dict
    alpha = ['a','b','c','d','e','f','g','h']
    num = ['1', '2' , '3' , '4', '5' , '6' , '7' , '8'];
    result=[],idx=0,dict="",piecefrom='',pieceto='';
    for(var i = 0;i<alpha.length;i++)
    {
        for(var j = 0;j<num.length;j++)
        {
            result[idx++]=alpha[i]+num[j];
        }
    }

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
        moveSound.play();

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
            winSound.play();
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

    NLP = new NLP();
    makeLog(NLP.init(), 'sys');
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
};




///////////////////////////////////////////////////////////////////////////
// VOICE RECOGNITION

    final_transcript = '';
    var recognizing = false;


    if ('webkitSpeechRecognition' in window) {
        console.log("webkit is available!");
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
 
        recognition.onstart = function() {
          recognizing = true;
        };
 
        recognition.onerror = function(event) {
          console.log(event.error);
        };
 
        recognition.onend = function() {
          recognizing = false;
        };
 
        recognition.onresult = function(event) {
            myevent = event;
          var interim_transcript = '';
          for (var i = event.resultIndex; i < event.results.length; ++i) {
              console.log("i="+i);

            //Stops the dictation if it sees the phrase "stop dictation"
            if(event.results[i][0].transcript.includes("stop dictation")){
                recognition.stop();
            }

            if (event.results[i].isFinal) {

              final_transcript += 

              event.results[i][0].transcript.trim() +".\n";
              console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
              var mycmd = final_transcript;
              performMove(mycmd);
            } else {
              interim_transcript += 
     
              event.results[i][0].transcript;
              console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));

            }
          }
          //final_transcript = capitalize(final_transcript);
          final_span.innerHTML = linebreak(final_transcript);
          interim_span.innerHTML = linebreak(interim_transcript);
          
        };
    }
    
    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }
 
    function capitalize(s) {
      return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
    }
 
    startDictation = function(event) {
      if (recognizing) {
        recognition.stop();
        return;
      }
      final_transcript = '';
      recognition.lang = 'en-US';
      recognition.start();
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
    }

    performMove = function(MYcmd){
    makeLog(final_transcript, "usr");
      $('#icommand').val('');
        //parse goes there
        var cmd = MYcmd;
        //split/trim
        cmd = cmd.trim();
        cmd = cmd.toLowerCase();
        cmd = cmd.replace(/\s+/g, '');
        if(cmd.indexOf("to")>-1)
    
        {
            var string1 = cmd.substring(0,cmd.indexOf("to"));
            var string2 = cmd.substring(cmd.indexOf("to")+2);
            for(var i=0;i<result.length;i++)
            {
                if(string1.indexOf(result[i])>-1)
                {
                    dict+=result[i];
                    dict+="-";
                    piecefrom=result[i];
                    break;
                }
            }
            if(dict.indexOf("-")<=-1)
            {
                alert("Failed");
                console.log("Failure. dict="+dict);
            }
            var indicator=false;
            for(var i=0;i<result.length;i++)
            {
                if(string2.indexOf(result[i])>-1)
                {
                    dict+=result[i];
                    indicator = true;
                    pieceto=result[i];
                    break;
                }
            }
            if(indicator === false)
            {
                alert("Failed");
                console.log("Failure. dict="+dict);
            }
        }
        else if(cmd.indexOf("takes")>-1)
        {
            var string1 = cmd.substring(0,cmd.indexOf("takes"));
            var string2 = cmd.substring(cmd.indexOf("takes")+2);
            for(var i=0;i<result.length;i++)
            {
                if(string1.indexOf(result[i])>-1)
                {
                    dict+=result[i];
                    dict+="-";
                    piecefrom=result[i];
                    break;
                }
            }
            if(dict.indexOf("-")<=-1)
            {
                alert("Failed");
                console.log("Failure. dict="+dict);
            }
            var indicator=false;
            for(var i=0;i<result.length;i++)
            {
                if(string2.indexOf(result[i])>-1)
                {
                    dict+=result[i];
                    indicator = true;
                    pieceto=result[i];
                    break;
                }
            }
            if(indicator === false)
            {
                alert("Failed");
                console.log("Failure. dict="+dict);
            }
        }
        else if(cmd.indexOf("take")>-1)
        {
            var string1 = cmd.substring(0,cmd.indexOf("take"));
            var string2 = cmd.substring(cmd.indexOf("take")+4);
            for(var i=0;i<result.length;i++)
            {
                if(string1.indexOf(result[i])>-1)
                {
                    dict+=result[i];
                    dict+="-";
                    piecefrom=result[i];
                    break;
                }
            }
            if(dict.indexOf("-")<=-1)
            {
                alert("Failed");
                console.log("Failure. dict="+dict);
            }
            var indicator=false;
            for(var i=0;i<result.length;i++)
            {
                if(string2.indexOf(result[i])>-1)
                {
                    dict+=result[i];
                    indicator = true;
                    pieceto=result[i];
                    break;
                }
            }
            if(indicator === false)
            {
                alert("Failed");
                console.log("Failure. dict="+dict);
            }
        }
        console.log("Dict is now ->  :"+dict);
        //test if legal
        var piece1=game.get(piecefrom);
        if(piece1 === null)
        {
            var msg = new SpeechSynthesisUtterance('No piece there');
            window.speechSynthesis.speak(msg);
            final_transcript = "";
            return;
        }
        if(game.game_over() === true)
        {
            alert("Illegal move -- game is already over");
            final_transcript = "";
            return;
        }
        else if(piece1.color != game.turn())
        {
            var msg = new SpeechSynthesisUtterance('It is not your turn');
            window.speechSynthesis.speak(msg);  
        }
        else //correct turn
        {
            moveSound.play();
            var move = game.move({
            from: piecefrom,
            to: pieceto,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });
            if (move === null) 
            {
                alert("Illegal move -- no pass");
                return;
            }

            myboard.position(game.fen());
            updateStatus();
            var msg = new SpeechSynthesisUtterance(cmd);
            
            window.speechSynthesis.speak(msg);
                
        }
        final_transcript = "";
    }