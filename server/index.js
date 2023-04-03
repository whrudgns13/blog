const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
// app.use(express.urlencoded( {extended : false } ));
// app.use(express.json()); 

const posts = [];

app.post("/posts",(req,res)=>{
    console.log(req.body);
    posts.push(req.body);
    res.send("ok");
})

app.get("/searchTag/:search",async (req,res)=>{
    console.log(req.params.search);
    const tags = await (await fetch(`https://tagsuggestion.services.sap.com/api/v1/jwt/users/whrudgns13/combinedTags?searchTerm=${req.params.search}`)).json();
    res.send(tags);
})
app.get("/posts",(req,res)=>{
    res.send(posts);
})

app.listen(3000,()=>{
    console.log("server start");
})