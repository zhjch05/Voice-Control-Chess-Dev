Template.pvp.rendered = function() {
    console.log(Router.current().params._id); //good
    var post = Games.findOne({
        _id: Router.current().params._id
    });
    console.log(post);
    var player1 = Meteor.users.findOne({
        _id: post.player1
    });
    var player2 = Meteor.users.findOne({
        _id: post.player2
    });
    console.log(Meteor.userId());
    console.log(player1);
    console.log(player2);
    if (player1._id == Meteor.userId()) {
        $('#youremail').append(player1.emails[0].address);
        $('#oppemail').append(player2.emails[0].address);
    } else {
        $('#youremail').append(player2.emails[0].address);
        $('#oppemail').append(player1.emails[0].address);
    }
}
