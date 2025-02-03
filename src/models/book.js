const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    authorname:{
        type:String,
        required:true,
        trim:true,
        index:true
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

bookSchema.index({authorname:1,title:1})

const Book = new mongoose.model('Book',bookSchema)

module.exports = Book;