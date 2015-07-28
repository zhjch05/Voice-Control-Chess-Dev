Meteor.startup(function(){
    if(Fen.find().count() === 0){
        Fen.insert({flag:"only",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"});
    }
    if(personalTheme.find().count() === 0){
        personalTheme.insert({pieceName:"wP", address:"img/chesspieces/wikipedia/model1/wP.png"});
        personalTheme.insert({pieceName:"wR", address:"img/chesspieces/wikipedia/model1/wR.png"});
        personalTheme.insert({pieceName:"wN", address:"img/chesspieces/wikipedia/model1/wN.png"});
        personalTheme.insert({pieceName:"wB", address:"img/chesspieces/wikipedia/model1/wB.png"});
        personalTheme.insert({pieceName:"wQ", address:"img/chesspieces/wikipedia/model1/wQ.png"});
        personalTheme.insert({pieceName:"wK", address:"img/chesspieces/wikipedia/model1/wK.png"});
        personalTheme.insert({pieceName:"bP", address:"img/chesspieces/wikipedia/model1/bP.png"});
        personalTheme.insert({pieceName:"bR", address:"img/chesspieces/wikipedia/model1/bR.png"});
        personalTheme.insert({pieceName:"bB", address:"img/chesspieces/wikipedia/model1/bB.png"});
        personalTheme.insert({pieceName:"bN", address:"img/chesspieces/wikipedia/model1/bN.png"});
        personalTheme.insert({pieceName:"bQ", address:"img/chesspieces/wikipedia/model1/bQ.png"});
        personalTheme.insert({pieceName:"bK", address:"img/chesspieces/wikipedia/model1/bK.png"});
        
    }
    if(themeaaaDecision=null){
        themeaaaDecision="a";   
    }
});