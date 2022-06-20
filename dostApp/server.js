
// server for chats
const express=require('express');
const mongoose=require('mongoose');
const http=require('http');
const { sendStatus } = require('express/lib/response');
const bodyParser=require('body-parser');


const port=process.env.PORT||3000;
const dbUrl='mongodb://localhost:27017/test';
const app=express();
mongoose.connect(dbUrl,(err)=>{
  if(err){
    console.err(err);
  }
  else{
    console.log('mongo db connected');  
  }
});
const customerModel=mongoose.model('customers',{id:Number,name:String,surname:String,accounts:Object});
const server=app.listen(port,()=>{
    console.log(` --- server is running ---- \n    - port :${port}`);
 
});
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// GET request
app.get('/customers',(req,res)=>{
  //console.log(req);
  customerModel.find({},(err,customers)=>{
    res.send(customers);
  });
});
/// POST request
app.post('/customers',(req,res)=>{
  let customer=new customerModel(req.body);
  customer.save((err)=>{
      if(err){
        sendStatus(500);
      }
      else{
        sendStatus(200);
      }
  });
});

/// PUT request
app.put('/',async (req,res)=>{
    await customerModel.deleteOne(req.body,(err,data)=>{
      if(err)
        console.log(err);
    });  
     res.sendStatus(200);
     res.send(data);
   //res.sendStatus(200);
});

// const server=http.createServer((req,res)=>{
//    res.statusCode=200;
//    res.setHeader('content-type','text/html');
//    res.end(msg);
// });
// server.listen(port,'localhost',()=>{
//   console.log(` --- server is running ---- \n    - port :${port}`);
// });

//db.customers.update({id:'1'},{$set:{accounts:[{accountNumber:'1',currency:'TRY',balance:'5000'},{accountNumber:'2',currency:'USD',balance:'1000'},{accountNumber:'3',currency:'EUR',balance:'500'}]}});