Meteor.publish("thePieces",function(){return Pieces.find();});
Meteor.publish("theThemeOfPiece",function(){return themeOfPiece.find();});


