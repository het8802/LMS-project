import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar(props) {

  const navigate = useNavigate();

  const logOutClicked = () => {
    localStorage.setItem('auth-token', null);
    navigate('/login');
  }

  return (
    <section className='Navbar'>
        <a href='/'>Think School</a>
        <Link to='/tasks' id='my-tasks'>My Tasks</Link>
        {
            props.login ?
                <div className="login-options"><button onClick={logOutClicked}>Log Out</button></div>
            : <div className='login-options'>
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
        }
    </section>
  )
}

export default Navbar