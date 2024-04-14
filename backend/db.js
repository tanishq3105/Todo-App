const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://tanishqkandpal:fbGn78is7UMatMsa@basicdev04.5t7fdio.mongodb.net/todos")
const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo=mongoose.model('todos',todoSchema);

module.exports={
    todo
}
