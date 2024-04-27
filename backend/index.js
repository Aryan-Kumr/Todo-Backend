const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors")

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json())

app.post("/todo", async(req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Todo is not created.You sent the wrong imputs"
        })
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async(req, res) => {
    const todos = await todo.find({})

    res.json({
        todos
    })
})

app.put("/completed", async(req, res) => {
    const updatePayload = req.body
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "cant mark as completed"
        })

        return;
    }
    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "Todo marked as completed"
    })

})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  