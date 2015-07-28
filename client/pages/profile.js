Template.profile.helpers({

	myEmail: function(){
		return Meteor.user().emails[0].address;
	},

	myName: function(){
		return Profiles.findOne({id2: Meteor.userId()}).name;
	},

	myBio: function(){
		return Profiles.findOne({id2: Meteor.userId()}).bio;
	},

	photo:function(){ 
		return Gravatar.imageUrl(Gravatar.hash(Meteor.user().emails[0].address,{secure:true}));
	},

	profileFunction: function(){
        {
            return Profiles.find();
        } 
    }

})


Template.profile.rendered = function() {

	if(Profiles.findOne({id2: Meteor.userId()}) == undefined){
		Profiles.insert({id2: Meteor.userId()});
	}

}

