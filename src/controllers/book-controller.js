require('dotenv').config();
const Book = require('../models/book');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const{body,validationResult} = require('express-validator')

const register = async(req,res,next)=>{
    const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error)
  }
}


const login = async(req,res,next)=>{
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.status(200).json({ token , userId: user._id });
  } catch (error) {
    next(error)
  }
}

const getbooks = async(req,res,next) =>{
    try{
        const authorname = req.params.authname;
        const getbook = authorname
        ? await Book.find({authorname})
        : await Book.find();
        res.status(200).send(getbook)
        // console.log(getbook)   
    }
    catch(e){
        next(e)
    }
}

const createbooks = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const { title, authorname, review } = req.body;
        const coverImage = req.file ? req.file.path : null;

        const book = new Book({ title, authorname, review, coverImage });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (e) {
        console.error(e); 
        next(e); 
    }
};

const updatebooks = async(req,res,next)=>{
    try{
        const _id = req.params.id
        const updatebook = await Book.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.status(200).send(updatebook)
    }
    catch(e){
        next(e)
    }
}

const deletebooks = async(req,res,next)=>{
    try{
        const _id = req.params.id
        const deletebook = await Book.findByIdAndDelete(_id,req.body,{
            new:true
        })
        res.status(200).send(deletebook)
    }
    catch(e){
        next(e)
    }
}

const triggerError = (req,res,next)=>{
    const error = new Error('This is a sample error!');
    error.status = 400; // Bad Request
    next(error);
}

module.exports = {getbooks,createbooks,updatebooks,deletebooks,triggerError,register,login}