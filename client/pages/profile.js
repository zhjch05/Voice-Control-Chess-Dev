Template.profile.helpers({

	myEmail: function(){
		return this.emails[0].address;
	},

	photo:function(){ 
		return Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}));
	},

	profileFunction: function(){
        {
            return Profiles.find();
        } 
    }

})
