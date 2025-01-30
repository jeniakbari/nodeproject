const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    // bookname:{
    //     type:String,
    //     required:true
    // },
    title:{
        type:String,
        required:true,
        trim:true
    },
    authorname:{
        type:String,
        required:true,
        trim:true
    },
    review:{
        type:String,
        required:true,
        lowercase:true,
        enum:["poor","bad","good","very good"]
    },
    coverImage:{
        type:String,
        required:false
    }
})

const Book = new mongoose.model('Book',bookSchema)

module.exports = Book;