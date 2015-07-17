Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });
    this.route('useraccounts', {
        path: '/useraccounts',
    });
    this.route('saves', {
        path: '/saves',
    });
    this.route('profile', {
        path: '/profile',
    });

    Router.route('/profileEdit2/:_id',
    {name:'profileEdit',
    data: function(){ return Meteor.users.findOne({_id:this.params._id})}
    });
    //this.route('private');
});

// Router.plugin('ensureSignedIn', {
//   only: ['private']
// });