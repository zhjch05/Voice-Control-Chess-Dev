Meteor.startup(function(){
    if(Fen.find().count() === 0){
        Fen.insert({flag:"only",fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"});
    }
});