const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

function getPosts(){
    const json = JSON.parse(fs.readFileSync("posts.json").toString());
    const id = json.id;
    const posts = json.posts;
    return [posts,id];
}

function savePosts(posts,id){
    fs.writeFileSync("posts.json",JSON.stringify({id,posts}));
}

function getComments(){
    const json = JSON.parse(fs.readFileSync("comments.json").toString());
    const id = json.id;
    const comments = json.comments;
    return [comments,id];
}

function saveCommnets(comments,id){
    fs.writeFileSync("comments.json",JSON.stringify({comments,id}));
}

app.get("/posts/search/:query/category/:category",(req,res)=>{
    const query = req.params.query;
    const category = req.params.category;
    const [posts] = getPosts();
    if(category==="tags") res.send(posts.filter(post=>post[category].some(tag=>tag.value.includes(query))));
    res.send(posts.filter(post=>post[category].includes(query)));
});


app.get("/searchTag/:search",async (req,res)=>{
    const tags = await (await fetch(`https://tagsuggestion.services.sap.com/api/v1/jwt/users/whrudgns13/combinedTags?searchTerm=${req.params.search}`)).json();
    res.send(tags);
});

app.post("/posts",(req,res)=>{
    let [posts,id] = getPosts();
    req.body.id = ++id;
    posts.push(req.body);    
    savePosts(posts,id);
    res.send(req.body);
});

app.get("/posts",(req,res)=>{
    const [posts] = getPosts();
    res.send(posts);
});

app.get("/posts/id/:id",(req,res)=>{
    const id = req.params.id;
    const [posts] = getPosts();
    const [comments] = getComments();
    const findPost = posts.find(post=>post.id===Number(id));
    findPost.comments = comments.filter(comment=>comment.postId===Number(id));

    res.send(findPost);
});

app.post("/comment",(req,res)=>{
    let body = req.body;
    let [comments,id] = getComments();a
    body.id = ++id;
    console.log(comments,body);
    comments.push(body);
    saveCommnets(comments,id);
    res.send("ok");
});


app.listen(3000,()=>{
    console.log("server start");
})