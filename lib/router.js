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
<<<<<<< HEAD
    this.route('saves', {
        path: '/saves',
    });
    this.route('profile', {
        path: '/profile',
=======
    this.route('pvptest', {
        path: '/pvptest',
>>>>>>> 30f297cda8a2e8f19d8cdb7aed496b6cffb1d95b
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
