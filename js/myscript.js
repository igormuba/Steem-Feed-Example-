let query = {
    tag: 'igormuba',
    limit: 4
}

let posts;



function getTheFeed(){
    steem.api.getDiscussionsByFeed(query, function (err, result) {
        console.log(err, result);
        posts=result;
        for (let i=0; i<3; i++) {
            let iToString = (i+1).toString();
            let converter = new showdown.Converter()
            let text = result[i].body
            let html = converter.makeHtml(text);
            document.getElementById(iToString).innerHTML = `
            <hr class="horizontal-ruler">
            <h1>`+result[i].title+`</h1>
            <h2 class="post-author"><em>by: @`+result[i].author+`</em></h2>
            <hr class="horizontal-ruler">
            <p>`+html+`</p>
            <hr class="horizontal-ruler">
            `
        }
    });
}

getTheFeed();

function nextPage(){
    query = {
        tag: 'igormuba',
        limit: 4,
        start_author: posts[3].author,
        start_permlink: posts[3].permlink
    }

    getTheFeed();
}
