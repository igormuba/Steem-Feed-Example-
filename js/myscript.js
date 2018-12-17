let query = {
    tag: 'igormuba',
    limit: 3
}

steem.api.getDiscussionsByFeed(query, function (err, result) {
    console.log(err, result);
    for (let i=0; i<result.length; i++) {
        let iToString = (i+1).toString();
        document.getElementById(iToString).innerHTML = `
        <h1>`+result[i].title+`</h1>
        <h2>`+result[i].author+`</h2>
        <p>`+result[i].body+`</p>
        <hr>
        `
    }
  });

function generatePost(post){
      let author = post.author;
      let title = post.title;
      let body = post.body;
  }
