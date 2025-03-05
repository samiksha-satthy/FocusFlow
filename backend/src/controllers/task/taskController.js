import asyncHandler from "express-async-handler"; 
import TaskMondel from "../../models/tasks/taskModel.js";

//creating a new task 
export const createTasks = asyncHandler(async (req,res) => {
    try {
        const{title, description, dueDate, priority, status} = req.body;

        if (!title || title.trim() === ""){
            res.status(400).json({message: "title is required!"});
        }

        if (!description || description.trim() === ""){
            res.status(400).json({message: "description is required!"});
        }

        const task = new TaskMondel({
            title, 
            description, 
            dueDate, 
            priority, 
            status, 
            user: req.user._id,
        });

        await task.save(); 

        
        res.status(201).json(task);

    } catch (error) {
        console.log("error creating task", error.message);
        res.status(500).json({message: error.message});
    }
});

//getting all of the tasks 
export const getTasks = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; 

        if (!userId){
            res.status(400).json({message: "user not found"});
        }

        const tasks = await TaskMondel.find({user: userId});
        res.status(200).json({
            length: tasks.length, 
            tasks
        });
    } catch (error) {
        console.log("error getting task", error.message);
        res.status(500).json({message: error.message});
    }
}); 

//getting one task 
export const getTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; 

        const {id} = req.params; 

        if (!id){
            res.status(400).json("please provide a task id"); 
        }

        const task = await TaskMondel.findById(id); 

        if (!task){
            res.status(404).json("task not found!"); 
        }

        if (!task.user.equals(userId)){
            res.status(401).json("not authorized!"); 
        }

        res.status(200).json(task); 

    } catch (error) {
        console.log("error getting the specific task", error.message);
        res.status(500).json({message: error.message});
    }
});

//updating a task 
export const updateTask = asyncHandler(async (req, res) =>{
    try {
        const user = req.user._id; 

        const {id} = req.params; 
        const {title, description, dueDate, priority, status, completed} = req.body; 

        if (!id) {
            res.status(400).json("please provide a task id"); 
        }

        const task = await TaskMondel.findById(id); 

        if (!task){
            res.status(400).json("task not found"); 
        }

        //check if user is owner of task
        if (!task.user.equals(user)){
            res.status(401).json("not authorized!"); 
        }


        //update the task with new data 
        task.title = title || task.title; 
        task.description = description || task.description; 
        task.dueDate = dueDate || task.dueDate; 
        task.priority = priority || task.priority;
        task.status = status || task.status; 
        task.completed = completed || task.completed; 

        await task.save(); 

        return res.status(200).json(task); 

    } catch (error) {
        console.log("error in updating the task", error.message);
        res.status(500).json({message: error.message});
    }
});

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; 
        const {id} = req.params; 

        const task = await TaskMondel.findById(id); 

        if (!task){
            res.status(404).json("task not found"); 
        }

        if (!task.user.equals(userId)){
            res.status(401).json("not authorized!"); 
        }

        await TaskMondel.findByIdAndDelete(id);

        return res.status(200).json("task deleted successfully"); 

    } catch (error) {
        console.log("error in deleting the task", error.message);
        res.status(500).json({message: error.message});
    }
})