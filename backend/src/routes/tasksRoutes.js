import express from "express";
import { createTasks, deleteTask, getTask, getTasks, updateTask } from "../controllers/task/taskController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router(); 

router.post("/task/create", protect, createTasks);
router.get("/tasks/get", protect, getTasks);
router.get("/task/get/:id", protect, getTask);
router.patch("/task/update/:id", protect, updateTask);
router.delete("/task/delete/:id", protect, deleteTask);

export default router; 

