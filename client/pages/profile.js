Template.profile.helpers({

	photo:function(){ // returns the URL of the gravatar photo for this email
		console.log(this.emails[0].address);
		return Gravatar.imageUrl(Gravatar.hash(Meteor.users.findOne().emails[0].address,{secure:true}))
	}

})