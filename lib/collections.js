Fen = new Meteor.Collection('fen');
Profiles = new Meteor.Collection('profiles');
Saves = new Meteor.Collection('saves');
Errors = new Meteor.Collection('errors');
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
});