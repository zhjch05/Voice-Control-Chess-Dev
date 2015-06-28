dialog = [];
dialog[0] = {sentences: []};

function nlp(content,user){
    content = beautify(content);
    modeling(dialog, user,content);
}

function beautify(content){
    content = content.trim();
    content = content.toLowerCase();
    content = content.replace(/\s+/,' ');
    return content;
}

function modeling(env, user, content){
    if(user === 'sys'){
        return;
    }
}