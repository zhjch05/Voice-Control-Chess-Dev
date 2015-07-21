Template.profile.helpers({

	myEmail: function(){
		return Meteor.users.findOne().emails[0].address;
	},

	myName: function(){
		return Profiles.findOne({id: Meteor.userId()}).name;
	},

	myBio: function(){
		return Profiles.findOne({id: Meteor.userId()}).bio;
	},

	photo:function(){ 
		return Gravatar.imageUrl(Gravatar.hash(Meteor.users.findOne().emails[0].address,{secure:true}));
	},

	profileFunction: function(){
        {
            return Profiles.find();
        } 
    }

})


Template.profile.rendered = function() {

if(Profiles.findOne() == undefined){
	Profiles.insert({id: Meteor.userId()});
}

}

