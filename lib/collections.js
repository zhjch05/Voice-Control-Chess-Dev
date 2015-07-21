Fen = new Meteor.Collection('fen');
Profiles = new Meteor.Collection('profiles');
Matchings = new Meteor.Collection("matchings");

Meteor.methods({
    updateUserFen: function(post) {
        check(Meteor.userId(), String);
        check(post, String);
        var exFen = Fen.findOne({
            userId: Meteor.userId()
        });
        if (exFen) {
            Fen.update({
                userId: Meteor.userId()
            }, {
                $set: {
                    fen: post
                }
            });
        } else {
            Fen.insert({
                userId: Meteor.userId(),
                fen: post
            });
        }
    },
    createDesk: function(){
        check(Meteor.userId(), String);
        var exDesk = Matchings.findOne({
            userId: Meteor.userId()
        });
        if (exDesk) {
            return false;
        } else {
            var user = Meteor.user();
            var id = Matchings.insert({
                userId: Meteor.userId(),
                host: user.emails[0].address
            });
            return {
                _id: id
            };
        }
    }
});
