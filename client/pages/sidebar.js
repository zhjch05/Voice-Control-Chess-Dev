Sidebar = function() {
    collection = {};
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
    var update = function(){
        _.each(Object.keys(collection), function(key) {
            $(key).html(collection[key][collection[key].length -1]);
        });
        console.log("Updating done.");
    }
    update();
    return {
        add: function(key) {
            collection[key].push(collection[key][collection[key].length - 1] + 1);
            update();
        },
        getCollection: function() {
            return collection;
        },
        undo: function() {
            _.each(Object.keys(collection), function(key) {
                if(collection[key].length > 1){
                    collection[key].pop();
                }
            });
            update();
        }
    }
}
