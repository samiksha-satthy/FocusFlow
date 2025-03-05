import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "please provide a title"], 
        unique: true,
    },
    
    description: {
        type: String, 
        default: "no description",
    }, 

    dueDate: {
        type: String, 
        default: Date.now(),
    },

    status: {
        type: String, 
        enum: ["active", "inactive"], 
        default: "active",
    },

    completed: {
        type: Boolean, 
        default: false,
    },

    priority: {
        type: String, 
        enum: ["low", "medium", "high"], 
        default: "low",
    },

    user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User",
        required: true, 
    }, 
}, {timestamps: true}
);

const TaskMondel = mongoose.model("task", TaskSchema); 

export default TaskMondel; 