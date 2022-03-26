import React, {useContext, useState} from "react";
import ErrorContext from "../error message/ErrorContext";
import TaskContext from "./TaskContext";

const TaskState = (props) => {
    let url = 'http://localhost:5000/tasks';
    const [tasks, setTasks] = useState([]);

    const context = useContext(ErrorContext);
    const {errorMessage} = context;

    const checkStatusError = (res, json_res) => {
        if (res.status != 200) {
            errorMessage(json_res.error);
        }
    }

    
    const createTask = async (description, completed, deadline) => {
        const authToken = localStorage.getItem('auth-token');

        const res = await fetch(url + '/createTask', {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description, completed, deadline})
        });

        const json_res = await res.json();
        
        checkStatusError(res, json_res);

        setTasks(tasks.concat(json_res));
    }

    const viewTasks = async () => {
        const authToken = localStorage.getItem('auth-token');

        const res = await fetch(url + '/viewTasks', {
            method: 'GET', 
            headers: {
                'auth-token': authToken
                // 'Content-Type': 'application/json'
            }
        })

        const json_res = await res.json();
        checkStatusError(res, json_res);
        setTasks(json_res);
    }

    const updateTask = async(taskId, description, completed, deadline) => {
        const authToken = localStorage.getItem('auth-token');

        const res = await fetch(url + '/updateTask' + taskId, 
        {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : authToken
            },
            body: JSON.stringify({description, completed, deadline})
        });

        const json_res = res.json();
        checkStatusError(res, json_res);
    }
    
    const deleteTask = async (taskId) => {
        const authToken = localStorage.getItem('auth-token');

        const res = fetch(url + '/deleteTask' + taskId, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : authToken
            }
        });

        const json_res = res.json();
        checkStatusError(res, json_res);
    }

    return (
        <TaskContext.Provider value={{tasks, setTasks, createTask, viewTasks, updateTask, deleteTask}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState