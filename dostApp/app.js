const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const {sendStatus}=require('express/lib/response');

//constants
const app=express();
const MessageStatus=Object.freeze({
    Sending:0,
    Sent:1,
    Read:2,
    Deleted:3
 });

//DB
const dbUrl='mongodb://localhost:27017/test';
const port=process.env.port||4000;
mongoose.connect(dbUrl,(err)=>{
   if(err){
       console.error(`mongo connection error:${err}`);
   }
   console.log(`Mongo connected at: ${dbUrl}`);
});

//app
const messenger=mongoose.model('messages',{sender:String,receiver:String,message:String,time:Date,status:Number});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.listen(port,()=>{
    console.log('app is running');
});
app.get('/messages',(req,res)=>{
    //console.log(req.url);
    messenger.find(req.body,(err,message)=>{
      res.send(message);
    });
});
app.post('/messages',(req,res)=>{
    let message=new messenger(req.body);
    message.save((err)=>{
       if(err)
         sendStatus(500);
       else
         sendStatus(200);
    });
});