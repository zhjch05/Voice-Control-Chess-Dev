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
	BK: function(){return Pieces.find({pieceName:"BK"});}
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
    'click #wpChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"wP"})._id);
        personalTheme.insert({pieceName:"wP", address:wpId});
    },
    'click #wrChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"wR"})._id);
        personalTheme.insert({pieceName:"wR", address:wrId});
    },
    'click #wbChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"wB"})._id);
        personalTheme.insert({pieceName:"wB", address:wbId});
    },
    'click #wnChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"wN"})._id);
        personalTheme.insert({pieceName:"wN", address:wnId});
    },
    'click #wqChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"wK"})._id);
        personalTheme.insert({pieceName:"wQ", address:wqId});
    },
    'click #wkChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"wK"})._id);
        personalTheme.insert({pieceName:"wK", address:wkId});
    },
    'click #bpChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"bP"})._id);
        personalTheme.insert({pieceName:"bP", address:bpId});
    },
    'click #brChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"bR"})._id);
        personalTheme.insert({pieceName:"bR", address:brId});
    },
    'click #bnChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"bN"})._id);
        personalTheme.insert({pieceName:"bN", address:bnId});
    },
    'click #bbChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"bB"})._id);
        personalTheme.insert({pieceName:"bB", address:bbId});
    },
    'click #bqChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"bQ"})._id);
        personalTheme.insert({pieceName:"bQ", address:bqId});
    },
    'click #bkChoose': function(event){
        personalTheme.remove(personalTheme.findOne({pieceName:"bK"})._id);
        personalTheme.insert({pieceName:"bK", address:bkId});
    },
});

function getPicture(cdnUrl,pieceName){
    var piecewb =pieceName;
    if(piecewb=="WP") {
        $('#WP').attr('src',cdnUrl);
    }else if(piecewb=="WR"){
        $('#WR').attr('src',cdnUrl);
    }else if(piecewb=="WB"){
        $('#WB').attr('src',cdnUrl);
    }else if(piecewb=="WN"){
        $('#WN').attr('src',cdnUrl);
    }else if(piecewb=="WQ"){
        $('#WQ').attr('src',cdnUrl);
    }else if(piecewb=="WK"){
        $('#WK').attr('src',cdnUrl);
    }else if(piecewb=="BP"){
        $('#BP').attr('src',cdnUrl);
    }else if(piecewb=="BR"){
        $('#BR').attr('src',cdnUrl);
    }else if(piecewb=="BN"){
        $('#BN').attr('src',cdnUrl);
    }else if(piecewb=="BB"){
        $('#BB').attr('src',cdnUrl);
    }else if(piecewb=="BQ"){
        $('#BQ').attr('src',cdnUrl);
    }else if(piecewb=="BK"){
        $('#BK').attr('src',cdnUrl);
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