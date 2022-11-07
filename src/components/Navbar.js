import React, {useEffect} from 'react'
import {useLocation, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  let location = useLocation();
  
  useEffect(() => {
    
  }, [location]);
  
  const history = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    history("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?'active':""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?'active':""}`} to="/about">About</Link>
            </li>
        </ul>
        {localStorage.getItem('token')?<form className="d-flex">
            <button className="btn btn-outline-warning mx-1" onClick={handleLogout}>Logout</button>
        </form>:<form className="d-flex">
            <Link className="btn btn-outline-success mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-success mx-1" to="/signup" role="button">Sign Up</Link>
        </form>}
        </div>
    </div>
    </nav>
  )
}
