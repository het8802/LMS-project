const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const authorize = require('../middleware/authorize');
const Task = require('../models/Tasks');

//this is a method to destructure the error message out of the error given
//because in the case of validationResult, the error message
//is deep inside the object
const destructureErrorMsg = (error) => {
    return error.errors[0].msg
}

router.post(
    '/createTask',
    authorize,
    [
        body('description', 'minimum length of description is 3').isLength({ min: 3 }),
        body('completed', "Enter a value for completed section").exists()
    ],

    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({error: destructureErrorMsg(error)});
            }
            
            const {description, completed, deadline} = req.body;
            const userID = req.userID;

            const newTask = new Task({userID, description, completed, deadline});
            await newTask.save();
            res.send(newTask);

        } catch {
            return res.status(500).json({error: "Internal error occured"});
        }
    }
)

router.get(
    '/viewTasks',
    authorize,
    async (req, res) => {
        try {
            const userID = req.userID;
            const tasks = await Task.find({userID});
    
            res.json(tasks);
        } catch {
            return res.status(500).json({error: "Internal error occured"});
        }
    }
)

router.put(
    '/updateTask:id',
    authorize,
    [
        body('description', 'minimum length of description is 3').isLength({ min: 3 }),
        body('completed', "Enter a value for completed section").exists()
    ],
    async (req, res) => {
        try{
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({error: destructureErrorMsg(error)});
            }
            
            let newTask = {};
            const {description, completed, deadline} = req.body;
            
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ error: "task not found" });
            }

            if (task.userID != req.userID) {
                return res.status(401).json({ error: "You are not authorized to change the note"});
            }

            if (description) {newTask.description = description}
            if (completed) {newTask.completed = completed}
            if (deadline) {newTask.deadline = deadline}

            const updatedTask = await Task.findByIdAndUpdate(req.params.id, {$set: newTask});
            res.json(updatedTask);
        }
        catch {
            return res.status(500).json({error: "Internal error occured"});
        }
    }
)

router.delete(
    "/deleteTask:id",
    authorize,
    async (req, res) => {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ error: "task not found" });
        }

        if (task.userID != req.userID) {
            return res.status(401).json({ error: "You are not authorized to delete the task" });
        }

        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.json(deletedTask);
    }
)

module.exports = router;