const express = require('express')
require('./db/conn')
const path = require('path')

const book_routes = require('./routes/auth')
require('dotenv').config();
const errorMiddleware = require('./middleware/error-middleware')
const authRoutes = require('./routes/auth');

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api',book_routes)

app.use(errorMiddleware)

app.listen(PORT, (error) =>{
    console.log("Connection at port : ",PORT)
});

