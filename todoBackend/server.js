const express = require("express")
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const todoRouter = require('./routes/todos')
app.use(express.json())
app.use("/todo",todoRouter)
app.get('/',(req,res)=>{
  res.send("Hello")
})


mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})


app.listen(3000,()=>{
  console.log("server is running on port number three thousand")
})