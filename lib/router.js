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

    //this.route('private');
});

// Router.plugin('ensureSignedIn', {
//   only: ['private']
// });