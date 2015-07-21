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

Template.matching.rendered = function(){
    Tracker.autorun(function (){
        if (Matchings.findOne({userId: Meteor.userId()})){
            $('#createbtn').toggleClass('disabled');
        }
    });
}
