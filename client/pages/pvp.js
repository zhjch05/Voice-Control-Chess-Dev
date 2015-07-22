Template.pvp.rendered = function() {
    console.log(Router.current().params._id); //good
    var post = Games.findOne({
        _id: Router.current().params._id
    });
    console.log(post);
    var playeremail1 = Meteor.users.findOne({
        _id: post.player1
    }).emails[0].address;
    $('#youremail').append(playeremail1);
}
