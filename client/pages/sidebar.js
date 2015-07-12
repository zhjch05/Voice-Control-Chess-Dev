Sidebar = function() {
    var collection = {};
    collection['#bp'] = [0];
    collection['#bb'] = [0];
    collection['#bk'] = [0];
    collection['#bn'] = [0];
    collection['#bq'] = [0];
    collection['#br'] = [0];
    collection['#wp'] = [0];
    collection['#wb'] = [0];
    collection['#wk'] = [0];
    collection['#wn'] = [0];
    collection['#wq'] = [0];
    collection['#wr'] = [0];
    var sidebarDep = new Deps.Dependency;
    Deps.autorun(function() {
        console.log("Updating");
    });
    return {
        add: function(key) {
            collection[key].push(collection[key][collection[key].length - 1] + 1);
            sidebarDep.changed();
        },
        getCollection: function() {
            sidebarDep.depend();
            return collection;
        },
        undo: function() {
            _.each(collection.keys(), function(key) {
                collection[key].pop();
            });
            sidebarDep.changed();
        }
    }
}
