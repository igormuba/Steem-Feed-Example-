let query = {
    tag: 'igormuba',
    limit: 3
}

steem.api.getDiscussionsByFeed(query, function (err, result) {
    console.log(err, result);
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

function generatePost(post){
      let author = post.author;
      let title = post.title;
      let body = post.body;
  }
