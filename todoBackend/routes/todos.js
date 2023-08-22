const express = require("express")
const router = express.Router()
const Todo = require("./../models/todo")



router.get('/' ,async (req,res)=>{
  try{
    const todos = await Todo.find()
    res.json(todos)
  }catch(err){
    console.error("Error fetching todos",err)
    res.status(500).json({error : "Error in fetching todos"})
  }
})

router.post('/' , async (req,res)=>{
  try{
    try{
      let existinguser = await Todo.findOne({item: req.body.item})
      if(existinguser){
        res.status(400).json({msg : "This Item has been already included"})
        return
      }
    }catch(error){
      console.log("error encountered" , error)
      res.json({msg: "Dont add the same item"})
    }

    const todoItem = new Todo({
      item: req.body.item
    })
    await todoItem.save()
    const todos = await Todo.find()
    res.json(todos)
  }catch(err){
    console.error("Error fetching todos",err)
    res.status(500).json({error : "Error in posting updated todos"})
  }
 
})
router.delete("/clear" , async(req,res)=>{
  try{
    await Todo.deleteMany({})
    res.json({"message" : "All the files have been cleared"})
  }catch(error){
    console.error("Problem Occured in Deleting your todoCollection .ERROR IS: ",error)
    res.status(500).json({error:"Problem Occured in Deleting your TodoCollection"})
  }
})
router.delete("/:id",async (req,res) =>{
  const todoId = req.params.id
  try{
    await Todo.findByIdAndDelete(todoId)
    const todos = await Todo.find()
    res.json(todos)
  }catch(error){
    console.error("Problem Occured in Deleting your todoItem .ERROR IS: ",error)
    res.status(500).json({error:"Problem Occured in Deleting your TodoItem"})
  }
})

router.put("/:id" , async(req,res)=>{
  const todoId = req.params.id
  const UpdatedFields = req.body
  try{
    await Todo.findByIdAndUpdate(todoId , req.body , {new:true})
    const todos = await Todo.find()
    res.json(todos)
  }catch(err){
    console.error("Problem Occured in Updating your todoItem .ERROR IS: ",error)
    res.status(500).json({error:"Problem Occured in Updating your TodoItem"})
  }
})



module.exports = router