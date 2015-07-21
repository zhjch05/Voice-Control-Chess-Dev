Template.profileEdit.helpers({
	myEmail: function(){
		return this.emails[0].address},
	photo:function(){ 
		return Gravatar.imageUrl(Gravatar.hash(this.emails[0].address,{secure:true}))}
})

Template.profileEdit.events({
	"submit #profile-edit-form": function(event){
		event.preventDefault();
		var biovar = event.target.bio.value;
		console.log(bio);
		var namevar = event.target.name.value;
		console.log(name);
		if(biovar != ""){
			Profiles.update(Profiles.findOne()._id, { $set: {bio: biovar}});
		}
		if(namevar != ""){
			Profiles.update(Profiles.findOne()._id, { $set: { name: namevar}});
		}
		Router.go("profile")
	},

	"submit #cancel-edit": function(event){
		Router.go("profile")
	}
})

Template.profileEdit.rendered = function() {

if(Profiles.findOne() == undefined){
	Profiles.insert({id: Meteor.userId()});
}

}
