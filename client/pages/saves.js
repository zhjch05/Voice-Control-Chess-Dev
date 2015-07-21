Template.saves.helpers({
    
    saveFunction: function(){
        {
            return Saves.find({id: Meteor.userId()},{sort:{timestamp:-1}})
        } 
    }
})

Template.saves.events({
	"click .delete-save-icon": function(){
		Saves.remove(this._id);}

})
