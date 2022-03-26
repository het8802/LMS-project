import React, { useContext, useEffect, useState } from 'react'
import ErrorContext from '../context/error message/ErrorContext.js';
import TaskContext from '../context/tasks/TaskContext'

function Tasks() {
  const [processingTask, setProcessingTask] = useState({
    description: null,
    completed: false,
    deadline: null
  });

  const [updatingTask, setUpdatingTask] = useState({
    id: null,
    description: null,
    completed: false,
    deadline: null
  });

  const taskContext = useContext(TaskContext);
  const {createTask, tasks, viewTasks, updateTask, deleteTask} = taskContext;

  const errorContext = useContext(ErrorContext);
  const {errorMessage} = errorContext;
  
  useEffect(() => {
    viewTasks();
  }, [tasks])


  const addTaskBtn = () => {

    const completed = (processingTask.completed == 'true')
    createTask(processingTask.description, completed, processingTask.deadline);

    setProcessingTask({
      description: null,
      completed: false,
      deadline: null
    })
  }

  const updateModal = document.querySelector('.update-modal');

  const updateModalOpen = (task) => {

    setUpdatingTask({
      id: task._id,
      description: task.description,
      completed: task.completed,
      deadline: task.deadline ?task.deadline.slice(0,10) :null
    });
    updateModal.classList.remove('disabled');
  }
  
  const updateModalClose = () => {
    updateModal.classList.add('disabled');
  }

  const updateTaskHandler = () => {
    const {id, description, completed, deadline} = updatingTask;
    updateTask(id, description, completed, deadline);
    updateModalClose();
  }

  const inputChangeHandler = (event) => {
      setProcessingTask({...processingTask, [event.target.name]: event.target.value});
  }

  const updateChangeHandler = (event) => {
      setUpdatingTask({...updatingTask, [event.target.name]: event.target.value});
  }

  return (
    <>
    <section className='tasks'>
      <h1>Add tasks</h1>
      <div className="add-task-section">
        <div className="description-section">
          <label htmlFor="task-desc">Description</label>
          <textarea name='description' value={processingTask.description? processingTask.description: ""} type="text" onChange={inputChangeHandler} id='task-description' />
        </div>

        <div className="completed-section">
          <label htmlFor="completed" className='completed-label'>Completed</label>
          <select name="completed" onChange={inputChangeHandler} id="completed">
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>

        <div className="deadline-section">
          <label htmlFor="task-deadline" className='deadline-label'>Deadline</label>
          <input name='deadline' value={processingTask.deadline? processingTask.deadline: ""} type="date" onChange={inputChangeHandler} id='task-deadline' />
        </div>

        <button className='add-task-btn' onClick={addTaskBtn}>Add Task</button>
      </div>
      <h1>Your tasks</h1>
      <div className="your-tasks-section">
      {
        tasks.map((task) => {
          const timeDiff = new Date(task.deadline) - Date.now();
          return (
            <div key={task._id} className={`task ${(timeDiff<0 && task.deadline && !task.completed) ?'red' :''} ${task.completed ?'green' :'blue'}`}>
              <div className="task-material">
                <h4>{task.description}</h4>
                <div className="task-tools">
                  <span onClick={() => deleteTask(task._id)} className="material-icons-outlined delete-icon">delete</span>
                  <span onClick={()=>updateModalOpen(task)} className="material-icons-outlined edit-icon">edit</span>
                </div>
              </div>
              <p>{task.deadline ?`Due: ${new Date(task.deadline).toDateString()}` :"No deadline"}</p>
            </div>
          )
        })
      }
      </div>
    </section>


    <section className="update-modal disabled">
      <div className="update-task-section">
      <div className="update-modal-header">
        <h4>Update Task</h4>
        <span onClick={updateModalClose} className="material-icons-outlined close-btn">close</span>
      </div>
      <div className="update-task-main-section">
            <div className="description-section">
              <label htmlFor="task-desc">Description</label>
              <textarea name='description' value={updatingTask.description? updatingTask.description: ""} type="text" onChange={updateChangeHandler} id='task-description' />
            </div>

            <div className="completed-section">
              <label htmlFor="completed" className='completed-label'>Completed</label>
              <select name="completed" onChange={updateChangeHandler} id="completed">
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>

            <div className="deadline-section">
              <label htmlFor="task-deadline" className='deadline-label'>Deadline</label>
              <input name='deadline' value={updatingTask.deadline? updatingTask.deadline: ""} type="date" onChange={updateChangeHandler} id='task-deadline' />
            </div>

            <button className='add-task-btn' onClick={()=>updateTaskHandler()}>Update Task</button>
          </div>
        </div>
    </section>
    </>
  )
}

export default Tasks