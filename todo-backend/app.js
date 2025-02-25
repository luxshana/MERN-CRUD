const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

mongoose
  .connect("mongodb://localhost:27017/mern-app")
  .then(() => {
    console.log("DB conected");
  })
  .catch((err) => {
    console.log(err);
  });
const todoSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: { required: true, type: String },
});
const todoModel = mongoose.model("TODO", todoSchema);
//add
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body, "title");

  // const newTodos ={
  //     id:todos.length+1,
  //     title,
  //     description
  // };
  // todos.push(newTodos);
  try {
    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//Get
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//update
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//delete
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
app.use((req, res, next) => {
  res.status(404).send("<h1>404 page not found </h1>");
});
app.listen(3000);
