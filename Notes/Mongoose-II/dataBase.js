import mongoose from "mongoose";


export const connection = mongoose.connect("mongodb://127.0.0.1:27017/backend_mongoose");

const userShema = mongoose.Schema({
    username : {type : String, required : true},
    password : {type : String, required : true},
    age : {type : Number, required : true}

})

// mongoose.model("collection_name (singular)", Schema_name)
export const userModel = mongoose.model("user",userShema)