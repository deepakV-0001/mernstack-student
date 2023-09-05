const mongoose=require('mongoose');

const studentSchema =new mongoose.Schema({
    name:String,
    age:String,
    email:String, 
    userId:String,
    mobile:String,
});

module.exports=mongoose.model("students",studentSchema);