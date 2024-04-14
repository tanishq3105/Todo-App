const {createTodo, updateTodo} =require("./types")
const {todo}=require("./db")
const express=require ('express')
const app=express();
const cors=require("cors")


app.use(express.json());
app.use(cors());


app.post('/todos',async(req,res)=>{
    const createPayLoad=req.body;
    const parsedPayLoad=createTodo.safeParse(createPayLoad);
    if(!parsedPayLoad.success)
    {
        res.status(411).json({
            msg:"You sent the wrong input"
        })
        return;
    }
    await todo.create({
        title:createPayLoad.title,
        description:createPayLoad.description,
        completed:false
    })

    res.json({
        msg:"Todo Created"
    })
})

app.get('/todos',async(req,res)=>{
    //getting it from mongo
    const todos=await todo.find({});
    res.json({
        todos
    })
})

app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong input"
        });
        return;
    }

    try {
        // Find the todo item by ID
        const existingTodo = await todo.findById(req.body.id);

        // If the todo item doesn't exist, return an error
        if (!existingTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        // Toggle the completion status of the todo item
        existingTodo.completed = !existingTodo.completed;

        // Save the updated todo item
        await existingTodo.save();

        // Send a response indicating success
        res.json({
            msg: "Todo status updated"
        });
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating todo status:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.put('/delete',async(req,res)=>{
    
    await todo.deleteOne({_id:req.body.id});
    res.json({
        msg:"Todo deleted"
    })
})


app.listen(3000)