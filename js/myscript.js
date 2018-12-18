let query = {
    tag: 'igormuba',
    limit: 3
}

let posts;

getTheFeed();

function getTheFeed(){
    steem.api.getDiscussionsByFeed(query, function (err, result) {
        console.log(err, result);
        posts=result;
        for (let i=0; i<result.length; i++) {
            let iToString = (i+1).toString();
            let converter = new showdown.Converter()
            let text = result[i].body
            let html = converter.makeHtml(text);
            document.getElementById(iToString).innerHTML = `
            <h1>`+result[i].title+`</h1>
            <h2>`+result[i].author+`</h2>
            <p>`+html+`</p>
            <hr>
            `
        }
    });
}

function nextPage(){
    query = {
        tag: 'igormuba',
        limit: 3,
        start_author: posts[2].author,
        start_permlink: posts[2].permlink
    }

    getTheFeed();
}
