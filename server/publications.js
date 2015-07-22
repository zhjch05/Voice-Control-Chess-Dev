Meteor.publish("fen", function() {
    return Fen.find();
});
Meteor.publish("theProfiles", function() {
    return Profiles.find();
});
Meteor.publish("matchings", function() {
    return Matchings.find();
});
Meteor.publish("games", function() {
    return Games.find();
});

Meteor.publish("userData", function() {
    if (this.userId) {
        return Meteor.users.find({}); //, //{_id: this.userId},
        //{fields: {'profile': 1, 'things': 1}});
    } else {
        this.ready();
    }
});