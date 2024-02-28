const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// PORT
const port = 8080;


// Middleware
app.use(cors());
app.use(express.json()); 

// REST ENDPOINTS

// GET ALL
app.get("/", async function(req,res){
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (error) {
        console.error(error);
    }
});

// GET ONE
app.get("/todo/:id", async function(req,res){
    try {
        const {id} = req.params;
        const getATodo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [id]);
        res.json(getATodo);
        console.log(req.params);
    } catch (error) {
        console.error(error);
    }
});

// POST
app.post("/addtodo", async function(req,res){
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.json(newTodo.rows);
    } catch (error) {
        console.error(error);
    }
});

// PUT
app.put("/todo/:id", async function(req,res){
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = ($1) WHERE todo_id = ($2)", [description, id]);

        res.json(`Todo: ${id} has been successfully updated!`);
    } catch (error) {
        console.error(error);
    }
});

// DELETE
app.delete("/todo/:id", async function(req,res){
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = ($1)", [id]);

        res.json(`Todo: ${id} has been successfully deleted!`);
    } catch (error) {
        console.error(error);
    }
});

// SERVER
app.listen(port, function(){
    console.log(`The server has started on PORT: ${port}`);
});