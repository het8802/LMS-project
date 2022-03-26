import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import MyCourses from "./components/MyCourses"
import Profile from "./components/Profile"
import SignUp from "./components/SignUp"
import Tasks from "./components/Tasks"
import DataState from './context/data/DataState'
import DataContext from './context/data/DataContext'
import {useContext} from 'react'
import Navbar from './components/Navbar';
import TaskState from './context/tasks/TaskState';
import ErrorState from './context/error message/ErrorState';
import {LoginState} from './context/login/LoginContext'

function App() {
  const context = useContext(DataContext);
  const {getCourseData} = context;
  const courseData = getCourseData();

  return (
    <>
    <ErrorState>
    <LoginState>
    <TaskState>
    <DataState>
      <Router>
      <Navbar login={true}/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          {
            Object.keys(courseData).map((course) => {
              return (<Route key={course} exact path={`/my-course/${course}`} element={<MyCourses course={course}/>}></Route>)
            })
          }
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route exact path="/sign-up" element={<SignUp/>}></Route>
          <Route exact path="/tasks" element={<Tasks/>}></Route>

        </Routes>
      </Router>
    </DataState>
    </TaskState>
    </LoginState>
    </ErrorState>
    </>
  );
}

export default App;
