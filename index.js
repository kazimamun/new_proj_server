const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()


const uri = `mongodb+srv://newUser:pass123@cluster0.g1juc.mongodb.net/newDB?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
  const postCollection = client.db("newDB").collection("post");

  app.post('/createPost',(req,res)=>{
    console.log(req.body);
    const post = req.body;
    postCollection.insertOne(post,function(err, result) {
      if (err){
        console.log('error occurd', err);
      }
      console.log('successfully inserted', result);
    })
  })
  
  console.log('database connected');
  await client.close();
});

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`your server running at port : ${port}`);
})