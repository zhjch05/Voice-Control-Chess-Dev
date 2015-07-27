Fen = new Meteor.Collection('fen');
Profiles = new Meteor.Collection('profiles');
Saves = new Meteor.Collection('saves');
Matchings = new Meteor.Collection("matchings");
Games = new Meteor.Collection("games");
Pieces = new Meteor.Collection('Pieces');
themeOfPiece = new Meteor.Collection('themeOfPiece');
personalTheme = new Meteor.Collection('personalTheme');

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
    createDesk: function() {
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
    },
    removeDesk: function(id) {
        check(Meteor.userId(), String);
        check(id, String);
        var exDesk = Matchings.findOne({
            userId: Meteor.userId()
        });
        var exDesk2 = Matchings.findOne({
            _id: id
        });
        if (exDesk) {
            Matchings.remove({
                userId: Meteor.userId()
            });
        }
        if (exDesk2) {
            Matchings.remove({
                _id: id
            });
        }
    },
    createGame: function(post) {
        check(Meteor.userId(), String);
        check(post, {
            player1: String,
            player2: String,
            startturn: String,
            fen: String
        });
        var id = Games.insert(post);
        return {
            _id: id
        };
    },
    deleteGame: function(gameId){
        check(Meteor.userId(),String);
        check(gameId, String);
        Games.remove({_id: gameId});
    },
    updateGameFen: function(gameId, fen) {
        check(Meteor.userId(), String);
        check(gameId, String);
        check(fen, String);
        Games.update({
            _id: gameId
        }, {
            $set: {
                fen: fen
            }
        });
    }
});