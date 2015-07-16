moveSound = new buzz.sound('/sounds/moveSound.wav');        // From: https://www.freesound.org/people/KorgMS2000B/sounds/54414/
winSound = new buzz.sound('/sounds/victory.wav');           // From: https://www.freesound.org/people/FoolBoyMedia/sounds/234526/
muted = false;
gameRecord = [];
gameRecordIndex = 0;
started=true;
Template.home.events({
    'submit #formcmd': function(event) {
        event.preventDefault();
        var cmd = event.target.inputCommand.value;
        makeLog(cmd,'usr');
        makeLog(nlp.input(cmd),'sys');
        $('#inputCommand').val('');
    },

    'click #spbutton': function(event){
        startDictation(event);
    },

    'click #mutebtn': function(event){
        var elem = document.getElementById("mutebtn");
        console.log('pressed mutebtn');
        if(muted==false){
            muted=true;
            elem.innerHTML = "<i class=\"glyphicon glyphicon-volume-off i-w\" ></i>";
        }
        else{
            muted = false;
            elem.innerHTML = "<i class=\"glyphicon glyphicon-volume-up i-w\"></i>";
        }
    },

    'click #undobtn': function(event){
        nlp.input('undo') 
        if(steps==0){
        stop=false;
        }
    },

    'click #restartbtn': function(event){
            game.game_over = true;
            Session.set('minWhite', 5);
            Session.set('decimalSecondWhite', 0);
            Session.set('unitSecondWhite', 0);
            Session.set('minBlack', 5);
            Session.set('decimalSecondBlack', 0);
            Session.set('unitSecondBlack', 0);
            minWhite =5;
            decimalSecondWhite =0;
            unitSecondWhite =0;
            minBlack =5;
            decimalSecondBlack =0;
            unitSecondBlack =0;
            unitCache=9;
            decimalCache=5;
        console.log('pressed restartbtn');
        nlp.input("restart");
        makeLog('Restarted the game.', 'sys');
        if(!muted){
            var msg = new SpeechSynthesisUtterance('Restarted the game');
            window.speechSynthesis.speak(msg);
        }   
    },


    'click #flipbtn': function(event){
        myboard.flip();   
    },

    'click #surrenderbtn': function(event){
        console.log('pressed surrenderbtn');
        game.game_over = true;
           
        if(game.turn()== 'w'){
            var msg = new SpeechSynthesisUtterance('White surrenders');
            makeLog('White surrendered. Black wins', 'sys');
            if(!muted){
                winSound.play();
                window.speechSynthesis.speak(msg);
            }
        }
        else{
            var msg = new SpeechSynthesisUtterance('Black surrenders');
            makeLog('Black surrendered. White wins', 'sys');
            if(!muted){
                winSound.play();
                window.speechSynthesis.speak(msg);
            }               
        }           
    }  

});
Template.home.helpers({
    minWhite:function(){ return Session.get('minWhite');},
    secondWhite:function(){ return Session.get('decimalSecondWhite');},
    anotherWhite:function(){ return Session.get('unitSecondWhite');},
    minBlack:function(){ return Session.get('minBlack');},
    secondBlack:function(){ return Session.get('decimalSecondBlack');},
    anotherBlack:function(){ return Session.get('unitSecondBlack');}
})
Session.setDefault('minWhite', 5);
Session.setDefault('decimalSecondWhite', 0);
Session.setDefault('unitSecondWhite', 0);
Session.setDefault('minBlack', 5);
Session.setDefault('decimalSecondBlack', 0);
Session.setDefault('unitSecondBlack', 0);
var minWhite =5;
var decimalSecondWhite =0;
var unitSecondWhite =0;
var minBlack =5;
var decimalSecondBlack =0;
var unitSecondBlack =0;
var unitCache=9;
var decimalCache=5;
function timeCountW()
 {  
     if(game.game_over() === false){
    if(game.turn() === 'w')
        if (minWhite==0 && decimalSecondWhite==0 && unitSecondWhite==0){
                alert("good game");
        }else{
                if (unitSecondWhite == 0){
                            unitSecondWhite = unitCache;
                            Session.set('unitSecondWhite',unitSecondWhite);
                        if(decimalSecondWhite == 0){
                            decimalSecondWhite= decimalCache;
                            Session.set('decimalSecondWhite',decimalSecondWhite);
                            minWhite = minWhite-1;
                            Session.set('minWhite',minWhite);
                        }else{
                            decimalSecondWhite=decimalSecondWhite-1;
                            Session.set('decimalSecondWhite',decimalSecondWhite);
                        }
                }else{
                        unitSecondWhite= unitSecondWhite-1;
                        Session.set('unitSecondWhite',unitSecondWhite);
                }
        }
        setTimeout(function(){timeCountW()},1000) ;
     }
}
function timeCountB()
 {
    if(game.game_over() === false){
    if(game.turn() === 'b'&& started===true)
        if (minBlack==0 && decimalSecondBlack==0 && unitSecondBlack==0){
                alert("good game");
        }else{
                if (unitSecondBlack == 0){
                            unitSecondBlack = unitCache;
                            Session.set('unitSecondBlack',unitSecondBlack);
                        if(decimalSecondBlack == 0){
                            decimalSecondBlack= decimalCache;
                            Session.set('decimalSecondBlack',decimalSecondBlack);
                            minBlack = minBlack-1;
                            Session.set('minBlack',minBlack);
                        }else{
                            decimalSecondBlack=decimalSecondBlack-1;
                            Session.set('decimalSecondBlack',decimalSecondBlack);
                        }
                }else{
                        unitSecondBlack= unitSecondBlack-1;
                        Session.set('unitSecondBlack',unitSecondBlack);
                }
        }
        setTimeout(function(){timeCountB()},1000) ;
    }
}

Template.home.rendered = function() {

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
    sidebar = new Sidebar();
    gameStarted= function(){
        if(steps== 0&&started===true){
            timeCountW();
            timeCountB(); 
        }

    }
    makeTurnLog = function() {
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
        var nlpset = nlp.resetState();
        if(nlpset !== undefined){
            makeLog(nlpset,'sys');
        }
        var sourcepiece = game.get(source);
        var targetpiece = game.get(target);
        if(!muted){
            moveSound.play();
        }

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
        //console.log("updateStatus");
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            winSound.play();
            if(!muted){
                var msg = new SpeechSynthesisUtterance('Checkmate');
                window.speechSynthesis.speak(msg);
            }
            
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
                if(!muted){
                    var msg = new SpeechSynthesisUtterance('Check');
                    window.speechSynthesis.speak(msg);
                }
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
        showCoordinate: true,
        themeStyle: "b"
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
        cfg.themeStyle = $('#selectTheme option:selected').val();
    $('#selectTheme').change(function () {
        cfg.themeStyle = $('#selectTheme option:selected').val();
        console.log(cfg);
        myboard = new ChessBoard('board', cfg);
        updateStatus();
        game = new Chess();
        myboard.position(game.fen());

        });
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

function updatestatistics(piece) {
    if (piece.color != null) {
        var piecejquery = '#' + piece.color + piece.type;
        // $(piecejquery).html(parseInt($(piecejquery).html()) + 1 + '');
        sidebar.add(piecejquery);
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
                // $(piecejquery).html(parseInt($(piecejquery).html()) + 1 + '');
                sidebar.add(piecejquery);
            }
        }
    }
}

function makeIndicator(move) {
    
    gameStarted();
    
    steps += 1;
    switch (steps % 2) {
        case 1:
            var title = parseInt(steps / 2) + 1;
            $('#sanbody').append('<tr><td>' + title + '</td><td>' + move.san + '</td>');
            gameRecord[gameRecordIndex] = move.san;
            gameRecordIndex++;
            break;
        case 0:
            $('tr:last').append('<td>' + move.san + '</td>');
            gameRecord[gameRecordIndex] = move.san;
            gameRecordIndex++;
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
              makeLog(mycmd,'usr');
              makeLog(nlp.input(mycmd), 'sys');
              $('#inputCommand').val('');
              final_transcript = '';
              if(!muted){
                  var msg = new SpeechSynthesisUtterance(mycmd);
                  window.speechSynthesis.speak(msg);
              }

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
function changeBackground(color){
   if (game.turn() === 'w'){
         $('html, body').css({
   "background-color": "#ffffff"});
    console.log(document.bgColor);
   }else if (game.turn() === 'b') {
             $('html, body').css({
   "background-color": "#000000"});
   }


}
