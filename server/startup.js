Meteor.startup(function(){
    if(Fen.find().count() === 0){
        Fen.insert({flag:"only",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"});
    }
    if(personalTheme.find().count() === 0){
        personalTheme.insert({personalTheme.insert({pieceName:"wP", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"wR", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"wN", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"wB", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"wQ", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"wK", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"bP", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"bR", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"bB", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"bN", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"bQ", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        personalTheme.insert({personalTheme.insert({pieceName:"bK", address:"'img/chesspieces/wikipedia/model1/{piece}.png'"});});
        
    }
});