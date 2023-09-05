const express = require('express');
const cors = require("cors");
require('./db/config');

const User = require('./db/Users');
const Data=require('./db/Students')
const app = express();

const jwt=require('jsonwebtoken');
const jwtkey="crud";


app.use(express.json());
app.use(cors());

app.post("/register",async (req, res) => {


    let user = new User(req.body);
    let result = await user.save();

    result=result.toObject();
    delete result.password;


    jwt.sign({result},jwtkey,(err,token)=>{
        if(err){
            res.send("somthing went Wrong try after some time");
        }

            res.send({result,auth:token})
        
        
    })
});

app.post("/login",async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({user},jwtkey,(err,token)=>{
                if(err){
                    res.send("somthing went Wrong try after some time");
                }

                    res.send({user,auth:token})
                
                
            })
           
        } else {
            res.send("user not found");
        }
    }
})

app.post('/add-student',verifyToken,async (req,res)=>{
let data= new Data(req.body);
let result=await data.save();
res.send(result);
})

app.get("/students",verifyToken,async (req,res)=>{
    let data= await Data.find();
    if(data.length>0){
        res.send(data);
    }else{
        res.send("no products found");
    }

})

app.delete("/student/:id", verifyToken,async (req,res)=>{
    const result= await Data.deleteOne({_id:req.params.id});
    res.send(result)
})


app.get("/student/:id",verifyToken,async (req,res)=>{
  let result= await Data.findOne({_id:req.params.id})
  if(result){
    res.send(result)
  }else{
    res.send("result not found");
  }
})

app.put("/student/:id",verifyToken,async (req,res)=>{
    let result= await Data.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        )
        res.send(result);
})

app.get("/search/:key",verifyToken, async (req,res)=>{
    let result= await Data.find({
        "$or":[
            {name:{$regex :req.params.key}},
            {age:{$regex :req.params.key}},
            {email:{$regex :req.params.key}},
            {mobile:{$regex :req.params.key}}

        ]
    });
    res.send(result)
})


function verifyToken(req,res,next){
    let token=req.headers['authorization'];
    if(token){
       token=token.split(' ')[1];
       jwt.verify(token,jwtkey,(err,valid)=>{
        if(err){
            res.send("please add valid token");
        }
        else{
            next();
        }
       })

    }else{
      res.send("please add token with header");
    }
    
}

app.listen(5000);