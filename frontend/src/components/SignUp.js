import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import LoginContext from '../context/login/LoginContext';




function SignUp() {

  const context = useContext(LoginContext);
  const {signUp} = context;

  const [image, setImage] = useState('');

  const [preview, setPreview] = useState('');
  

  const fileInputRef = useRef();

  const [creds, setCreds] = useState({
    email: '',
    password: '',
    fullname: '',
    profilePic: preview
  })
 
  const navigate = useNavigate();
  
  const loginClickHandler = () => {
    signUp(creds.email, creds.password, creds.fullname, creds.profilePic);
    if (localStorage.getItem('auth-token')) {
      navigate('/');
    }
  }

  const inputHandler = (event) => {
    setCreds({...creds, [event.target.id] : event.target.value});
  }

  useEffect(()=>{
    setCreds({...creds, ['profilePic']: preview.split(',')[1]});
  }, [preview])

  
  useEffect(() => {
    const defaultImage = document.querySelector('.default-image');
    const uploadedImage = document.querySelector('#uploaded-image');

    if (image) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(image);
      defaultImage.classList.add('disabled');
      uploadedImage.classList.remove('disabled');
    }
  else {

    defaultImage.classList.remove('disabled');
    uploadedImage.classList.add('disabled');
  }
  }, [image])
  

  

  return (
    <div className='login-background'>
      <div className="login-area">
        <h1>Sign Up</h1>
        <div className="input-area">
          <label htmlFor="email">Email</label>
          <input value={creds.email} onChange={inputHandler} type="text" id="email" />

          <label htmlFor="password">Password</label>
          <input value={creds.password} onChange={inputHandler} type="password" id="password" />

          <label htmlFor="fullname">Full name</label>
          <input value={creds.fullname} onChange={inputHandler} type="text" id="fullname" />

          <input type="file" id='profile' className='disabled' accept='image/png, image/jpg' ref={fileInputRef} onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setImage(null);
            }
          }}/>
          
          <label id='label-for-img' htmlFor="uploaded-image">Your uploaded image</label>
          <div className="profile-pic" onClick={()=>{fileInputRef.current.click()}}>
            <img id="uploaded-image" className='disabled' src={preview}></img>
            <div className="default-image"><p>Add image</p></div>
          </div>
          
          <button onClick={loginClickHandler} className="login-btn">Sign Up</button>
        </div>
        <Link to='/login' className='login-option'>Login</Link>
      </div>
    </div>
  )
}

export default SignUp