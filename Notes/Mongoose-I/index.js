const mongoose = require("mongoose");

// step 1: connected to db -> const connection = mongoose.connect(`url/db_name`)
const main = async () =>{
    try {
        const connection = await mongoose.connect(`mongodb://127.0.0.1:27017/bookDB`)
        console.log("connected to db");
        // insert some books but await BookModel is async function :-
        // await BookModel.insertMany([{
        //     title : "Harry potr",
        //     author : "Dont't know",
        //     price : 800
        // },{
        //     title : "Ramayan",
        //     author : "Maharshi Valmiki",
        //     price : 900
        // }])

        // insert document using constructor function :-
        // step A : create document 
        let  book = new BookModel({
            title : "mini",
            author : "vasko",
            // price : 200,
            price : "200" // it will work because it type cast implicitly Number("200") -
        })
        
        // step B : save document
        await book.save() // it is a asynchronous func so, we use await

        //disconnect the db
        connection.disconnect()
        console.log("disconnect to db")

    } catch (error) {
        console.log("err",error)
    }
}
main()

// step 2 : create Schema for data -> const bookSchema = mongoose.Schema({name : String, age : Number})
// here we create book data schema
// const bookSchema = mongoose.Schema({
//     title : String,
//     author : String,
//     price : Number,
// },{versionKey : false})

// if i want to take key or value {property} stricly like : price so, we use "required : true" ,
// in this case user have to enter price section
// Suppose I make author , {type : String , required : false} so, user not enter the author it will fine -
const bookSchema = mongoose.Schema({
    title : String , 
    author : String ,
    price : {type : Number, required: true}
})

/*  if you don't want version key __v : 0
    const bookSchema = mongoose.Schema({
    title : String,
    author : String,
    price : Number,
},{ versionKey : false})

*/

// step 3 : create modele for data -> const BookModel = mongoose.model("collection_name",Schema_name);
const BookModel = mongoose.model("book",bookSchema);
