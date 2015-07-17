Template.saves.helpers({
    
    saveFunction: function(){
        {
            return Profiles.find({},{sort:{timestamp:-1}})
        } 
    }
})

Template.saves.events({
	"click .delete-save-icon": function(){Profiles.remove(this._id);}
})
