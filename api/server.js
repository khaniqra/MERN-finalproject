const express = require("express");
const app = express();
const cors = require("cors");

const {default: mongoose} = require("mongoose");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Iqra123:imk9766892270@cluster0.s2kt0bm.mongodb.net/mernstack", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
})
    .then(() => console.log("Connected to Db"))
    .catch(console.error);

const Todo = require('./models/Todo')
app.get('/todos', async(req,res) => {
    const todos = await Todo.find();
    res.json(todos); 
});
app.post('/todos/new', (req,res) => {
    const todo =new Todo({
        text:req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async(req , res) =>
{
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});
app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('todo/complete/:id' , async(req, res) => {
    const todo = await Todo.findById(rq.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
});
    app.listen(3001, () => console.log("Server started on the port 3001"));
