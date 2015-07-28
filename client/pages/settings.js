Template.setting.helpers({
    WP: function(){return Pieces.find({pieceName:"WP"});},
    WR: function(){return Pieces.find({pieceName:"WR"});},
    WN: function(){return Pieces.find({pieceName:"WN"});},
    WB: function(){return Pieces.find({pieceName:"WB"});},
    WQ: function(){return Pieces.find({pieceName:"WQ"});},
	WK: function(){return Pieces.find({pieceName:"WK"});},
    BP: function(){return Pieces.find({pieceName:"BP"});},
    BR: function(){return Pieces.find({pieceName:"BR"});},
    BN: function(){return Pieces.find({pieceName:"BN"});},
    BB: function(){return Pieces.find({pieceName:"BB"});},
    BQ: function(){return Pieces.find({pieceName:"BQ"});},
	BK: function(){return Pieces.find({pieceName:"BK"});},
    wP: function(){return personalTheme.find({pieceName:"wP"});},
    wR: function(){return personalTheme.find({pieceName:"wR"});},
    wN: function(){return personalTheme.find({pieceName:"wN"});},
    wB: function(){return personalTheme.find({pieceName:"wB"});},
    wQ: function(){return personalTheme.find({pieceName:"wQ"});},
    wK: function(){return personalTheme.find({pieceName:"wK"});},
    bP: function(){return personalTheme.find({pieceName:"bP"});},
    bR: function(){return personalTheme.find({pieceName:"bR"});},
    bN: function(){return personalTheme.find({pieceName:"bN"});},
    bB: function(){return personalTheme.find({pieceName:"bB"});},
    bQ: function(){return personalTheme.find({pieceName:"bQ"});},
    bK: function(){return personalTheme.find({pieceName:"bK"});},
    
    
});



Template.setting.rendered= function() {

    
    pieceName = $('#selectPieceName option:selected').val();
    $('#selectPieceName').change(function () {
        pieceName = $('#selectPieceName option:selected').val();
    });
    
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
    'click #theme4': function(event){
        pieceTheme="d";
        themeOfPiece.remove(themeOfPiece.findOne()._id);
        themeOfPiece.insert({pieceTheme:pieceTheme});
        console.log(themeOfPiece.findOne());
    },
    'click #wpChoose': function(event){
        getPicture(wpId,"WP");
    },
    'click #wrChoose': function(event){
        getPicture(wpId,"WR");
    },
    'click #wbChoose': function(event){
        getPicture(wpId,"WB");
    },
    'click #wnChoose': function(event){
        getPicture(wpId,"WN");
    },
    'click #wqChoose': function(event){
        getPicture(wpId,"WQ");
    },
    'click #wkChoose': function(event){
        getPicture(wpId,"WK");
    },
    'click #bpChoose': function(event){
        getPicture(wpId,"BP");
    },
    'click #brChoose': function(event){
        getPicture(wpId,"BR");
    },
    'click #bnChoose': function(event){
        getPicture(wpId,"BN");
    },
    'click #bbChoose': function(event){
        getPicture(wpId,"BB");
    },
    'click #bqChoose': function(event){
        getPicture(wpId,"BQ");
    },
    'click #bkChoose': function(event){
        getPicture(wpId,"BQ");
    },
});



function getPicture(cdnUrl,pieceName){
    var piecewb =pieceName;
    if(piecewb=="WP") {
        personalTheme.remove(personalTheme.findOne({pieceName:"wP"})._id);
        personalTheme.insert({pieceName:"wP", address:cdnUrl});
        $('#kWP').attr('src',cdnUrl);
    }else if(piecewb=="WR"){
        personalTheme.remove(personalTheme.findOne({pieceName:"wR"})._id);
        personalTheme.insert({pieceName:"wR", address:cdnUrl});
        $('#kWR').attr('src',cdnUrl);
    }else if(piecewb=="WB"){
        personalTheme.remove(personalTheme.findOne({pieceName:"wB"})._id);
        personalTheme.insert({pieceName:"wB", address:cdnUrl});
        $('#kWB').attr('src',cdnUrl);
    }else if(piecewb=="WN"){
        personalTheme.remove(personalTheme.findOne({pieceName:"wN"})._id);
        personalTheme.insert({pieceName:"wN", address:cdnUrl});
        $('#kWN').attr('src',cdnUrl);
    }else if(piecewb=="WQ"){
        personalTheme.remove(personalTheme.findOne({pieceName:"wQ"})._id);
        personalTheme.insert({pieceName:"wQ", address:cdnUrl});
        $('#kWQ').attr('src',cdnUrl);
    }else if(piecewb=="WK"){
        personalTheme.remove(personalTheme.findOne({pieceName:"wK"})._id);
        personalTheme.insert({pieceName:"wK", address:cdnUrl});
        $('#kWK').attr('src',cdnUrl);
    }else if(piecewb=="BP"){
        personalTheme.remove(personalTheme.findOne({pieceName:"bP"})._id);
        personalTheme.insert({pieceName:"bP", address:cdnUrl});
        $('#kBP').attr('src',cdnUrl);
    }else if(piecewb=="BR"){
        personalTheme.remove(personalTheme.findOne({pieceName:"bR"})._id);
        personalTheme.insert({pieceName:"bR", address:cdnUrl});
        $('#kBR').attr('src',cdnUrl);
    }else if(piecewb=="BN"){
        personalTheme.remove(personalTheme.findOne({pieceName:"bN"})._id);
        personalTheme.insert({pieceName:"bN", address:cdnUrl});
        $('#kBN').attr('src',cdnUrl);
    }else if(piecewb=="BB"){
        personalTheme.remove(personalTheme.findOne({pieceName:"bB"})._id);
        personalTheme.insert({pieceName:"bB", address:cdnUrl});
        $('#kBB').attr('src',cdnUrl);
    }else if(piecewb=="BQ"){
        personalTheme.remove(personalTheme.findOne({pieceName:"bQ"})._id);
        personalTheme.insert({pieceName:"bQ", address:cdnUrl});
        $('#kBQ').attr('src',cdnUrl);
    }else if(piecewb=="BK"){
        personalTheme.remove(personalTheme.findOne({pieceName:"bK"})._id);
        personalTheme.insert({pieceName:"bK", address:cdnUrl});
        $('#kBK').attr('src',cdnUrl);
    }

        

}


function upLoad(){

    uploadcare.openDialog(null, {
      crop: "80x80 upscale",
      imagesOnly: true
    }).done(function(file) {
    file.promise().done(function(fileInfo){

        console.log(fileInfo.cdnUrl);
        getPicture(fileInfo.cdnUrl,pieceName);  
        addPieces(fileInfo.cdnUrl,pieceName);
      });
    });


}

Template.setting.events({

    'click #upload': function(event){
        upLoad();  
    },



});

function addPieces(cdnUrl,pieceName){
		var address = cdnUrl;
        Pieces.insert({pieceName:pieceName, address:address});
        console.log(Pieces.findOne({pieceName:pieceName}).address);

}