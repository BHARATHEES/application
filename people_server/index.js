const exprss = require('express');

const mongoose= require('mongoose');

const cors=require('cors');
//Cross orgin Resource Sharing.

const app=exprss();

app.use(exprss.json());//tell the app if any request has json format, understand that(command).
//tell the app: "Allow other URL's to interact and share"
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/People_server")


.then(()=> console.log("mongoDB is Connected"))

.catch(err=>console.log("MongoDB erroe",err));

const people=mongoose.model("people",new mongoose.Schema({name:String,age:Number}),"people",{versionkey:false});

app.get("/",async(_req, res)=> {
    try{
        const People = await people.find().sort({name:1});
        res.json(People); //send the list json to browser
    } catch(e){
        res.status(500).json({error: e.message});
    }
});

app.post("/",async (req,res)=>{
    try{
        const People=await people.create(
            {
                name : req.body.name,
                age: Number(req.body.age)
            }
        );
        res.status(201).json(People);
    }
    catch(e){
        res.status(400).json({error: e.message});
    }
});
//start the server
// tell express to start listening on port 4000
app.listen(4000, ()=> console.log("Express API is running in 4000 port"))




