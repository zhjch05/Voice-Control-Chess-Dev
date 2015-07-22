Template.matching.helpers({
    desk: function() {
        return Matchings.find();
    }
});

Template.matching.events({
    'click #createbtn': function() {
        var exDesk = Matchings.findOne({
            userId: Meteor.userId()
        });
        if (exDesk) {
            alert('Already in desk!');
        } else {
            Meteor.call('createDesk', function(error, result) {
                if (error) {
                    return alert(error.reason);
                }
            });
        }
    }
});

Template.matching.rendered = function() {
    Tracker.autorun(function() {
        if (Matchings.findOne({
                userId: Meteor.userId()
            })) {
            $('#createbtn').addClass('disabled');
            $('#infotag').html('Waiting for the other player...');
        } else {
            $('#createbtn').removeClass('disabled');
            $('#infotag').html('Create a desk or join someone');
        }
    });
    Tracker.autorun(function() {
        var mygame = Games.findOne({player1: Meteor.userId()});
        if(mygame){
            Router.go('pvp.show', {
                _id: mygame._id
            });
        }
    });
}

Template.mcard.helpers({
    ismycard: function() {
        return Meteor.userId() == this.userId;
    }
});

Template.mcard.events({
    'click .delbtn': function() {
        Matchings.remove(this._id);
    },
    'click .joinbtn': function() {
        var info = Matchings.findOne(this._id);
        Meteor.call('removeDesk', this._id, function(error, result) {
            if (error) {
                return alert(error.reason);
            }
        });
        //console.log(Matchings.findOne(this._id));
        var post = {
            player1: info.userId,
            player2: Meteor.userId(),
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        };
        //console.log(post);
        Meteor.call('createGame', post, function(error, result) {
            if (error) {
                return alert(error.reason);
            }
            //console.log(result._id);
            Router.go('pvp.show', {
                _id: result._id
            });
        });
    }
});
