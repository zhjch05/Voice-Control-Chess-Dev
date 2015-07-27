Template.setting.rendered= function() {
    if(themeOfPiece.find().fetch().length == 0){
        var pieceTheme="a";
        themeOfPiece.insert({pieceTheme:pieceTheme});
        console.log(themeOfPiece.findOne());
    }
}

Template.setting.events({

    'click #theme1': function(event){
        pieceTheme="a";
        themeOfPiece.remove(themeOfPiece.findOne()._id);
        themeOfPiece.insert({pieceTheme:pieceTheme});
        console.log(themeOfPiece.findOne());
    },    
    'click #theme2': function(event){
        pieceTheme="b";
        themeOfPiece.remove(themeOfPiece.findOne()._id);
        themeOfPiece.insert({pieceTheme:pieceTheme});
        console.log(themeOfPiece.findOne());
    },
    'click #theme3': function(event){
        pieceTheme="c";
        themeOfPiece.remove(themeOfPiece.findOne()._id);
        themeOfPiece.insert({pieceTheme:pieceTheme});
        console.log(themeOfPiece.findOne());
    },



});

function getPicture(cdnUrl){
     $('#picture').attr('src',cdnUrl);
    $('#picture2').attr('src',cdnUrl);
    $('#picture3').attr('src',cdnUrl);
    $('#picture4').attr('src',cdnUrl);

}

function upLoad(){

    uploadcare.openDialog(null, {
      crop: "80x80 upscale",
      imagesOnly: true
    }).done(function(file) {
    file.promise().done(function(fileInfo){

        console.log(fileInfo.cdnUrl);
                getPicture(fileInfo.cdnUrl);  
        addPieces(fileInfo.cdnUrl);
      });
    });


}

Template.setting.events({

    'click #upload': function(event){
        upLoad();  
    },



});

function addPieces(cdnUrl){
		var address = cdnUrl;
        Pieces.insert({pieceName:pieceName, address:address});
        console.log(Pieces.findOne({pieceName:"e"}).address);



}