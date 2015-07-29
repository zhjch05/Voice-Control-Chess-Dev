Meteor.startup(function(){
    if(Fen.find().count() === 0){
        Fen.insert({flag:"only",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"});
    }
    if(personalTheme.find().count() === 0){
        personalTheme.insert({pieceName:"wP", address:"img/chesspieces/wikipedia/wP.png"});
        personalTheme.insert({pieceName:"wR", address:"img/chesspieces/wikipedia/wR.png"});
        personalTheme.insert({pieceName:"wN", address:"img/chesspieces/wikipedia/wN.png"});
        personalTheme.insert({pieceName:"wB", address:"img/chesspieces/wikipedia/wB.png"});
        personalTheme.insert({pieceName:"wQ", address:"img/chesspieces/wikipedia/wQ.png"});
        personalTheme.insert({pieceName:"wK", address:"img/chesspieces/wikipedia/wK.png"});
        personalTheme.insert({pieceName:"bP", address:"img/chesspieces/wikipedia/bP.png"});
        personalTheme.insert({pieceName:"bR", address:"img/chesspieces/wikipedia/bR.png"});
        personalTheme.insert({pieceName:"bB", address:"img/chesspieces/wikipedia/bB.png"});
        personalTheme.insert({pieceName:"bN", address:"img/chesspieces/wikipedia/bN.png"});
        personalTheme.insert({pieceName:"bQ", address:"img/chesspieces/wikipedia/bQ.png"});
        personalTheme.insert({pieceName:"bK", address:"img/chesspieces/wikipedia/bK.png"});
        
    }
    if(themeaaaDecision=null){
        themeaaaDecision="a";   
    }
});