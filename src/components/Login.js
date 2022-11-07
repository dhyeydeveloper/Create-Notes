import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const history = useNavigate();
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({email:"",password:""})
    const [showPassBol, setShowPassBol] = useState(false)

    const showPassword = () =>{
        if (showPassBol === false){
            setShowPassBol(true)
        }
        else{
            setShowPassBol(false)
        }
    }

    const onChangeHandler = (e) =>{
      // console.log(e.target.name,"____________name");
      // console.log(e.target.value,"____________value");
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

    const handleSubmit = async(e) =>{
      e.preventDefault();
      // API CALL
      const url = `${host}/api/auth/login`
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email,password: credentials.password})
      });
      const json = await response.json();
      if (json.success){
        // SAVE THE TOKEN AND REDIRECT 
        localStorage.setItem('token',json.authtoken)
        history('/')
        props.showAlert("Login Successfully","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
    }

  return (
    <div className='mt-3 container'>
      <h2>Login to Access iNotebook</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' onChange={onChangeHandler} aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type={!showPassBol? 'password':'text'} className="form-control" onChange={onChangeHandler} name="password" id="password"/>
    </div>
    <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="check" onClick={showPassword}/>
    <label className="form-check-label" htmlFor="check">Show Password</label>
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    </div>
  )
}
