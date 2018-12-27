function clearPosts(){
    for (let i = 1; i<=3;i++){
        document.getElementById(i).innerHTML="";
    }
}

function loadProfile(author){
    clearPosts();
    steem.api.getAccounts([author], function(err, result) {
        console.log(err, result);
        document.getElementById(1).innerHTML=`
        <hr class="horizontal-ruler">
        <h1>@`+result[0].name+`</h1>
        <p>Reputation Level: `+simplifyReputation(result[0].reputation)+`</p>
        <hr class="horizontal-ruler">
        `;
    });
    
    getUserFeed(author);
}

let userPosts;
function getUserFeed(user){
    var query = {
        tag: user,
      limit: 4
    };

    steem.api.getDiscussionsByAuthorBeforeDate(user, "", '2019-05-01T00:00:00', 4, function (err, result) {
        console.log(err, result);
        userPosts=result;
        for (let i=0; i<3; i++) {
            let iToString = (i+1).toString();
            let converter = new showdown.Converter()
            let text = result[i].body
            let html = converter.makeHtml(text);
            
            let newDiv = document.createElement("div");
            
            newDiv.innerHTML = `
            <hr class="horizontal-ruler">
            <h1>`+result[i].title+`</h1>
            <h2 class="post-author"><em><a href="javascript:;" onclick="loadProfile('`+result[i].author+`')">by: @`+result[i].author+`</a></em></h2>
            <hr class="horizontal-ruler">
            <p>`+html+`</p>
            <hr class="horizontal-ruler">
            `;

            document.getElementById(2).appendChild(newDiv);
        }
    });
}

function simplifyReputation(raw) {
    const isNegative = (raw < 0);
    let reputation = Math.log10(Math.abs(raw));

    reputation = Math.max(reputation - 9, 0);
    reputation *= isNegative ? -9 : 9;
    reputation += 25;

    return Math.floor(reputation);
}
