Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {
            to: 'nav'
        },
        footer: {
            to: 'footer'
        },
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

    this.route('profileEdit', {
        path: '/profileEdit',
    });

    // this.route('matching', {
    //     path: '/matching',
    // });

    this.route('matching');

});

Router.route('/pvp/:_id', {
    name: 'pvp',
    data: function(){
        return {
            item: Items.findOne(this.params.query.id),
            itemName: this.params.itemName
        };
    }
);



Router.plugin('ensureSignedIn', {
    only: ['matching']
});
