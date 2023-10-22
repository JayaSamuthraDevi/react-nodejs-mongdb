import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import setError from "./setError";
import logo from "../images/divumlogo.png";
import axios from "axios";
import setSuccess from "./setSuccess";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  var sessionstorage = require('sessionstorage');


//checks and navigate to home is loginned already
useEffect(()=>{
  const checkloginstatus = async () =>
  {
    try{
      const token = await sessionstorage.getItem("token_name");
      if(token){
        setTimeout(()=>{
          navigate("/getUsers");
        },400);
        console.log("login",token)
      }
    }catch(e)
    {
      console.log(e);
    }
  }
  checkloginstatus();
},[])

  const CheckLogin = async (e) => {
    e.preventDefault();
    let emailField = document.getElementById("email");
    let passwordField = document.getElementById("password");
    setSuccess(emailField);
    setSuccess(passwordField);
    try {
      await axios
        .post("http://localhost:5000/login", {
          email,
          password,
        })
        .then((res) => {

          const status =res.status;
         
          console.log(status);
          if (status === 200) {
            alert("Login success");
            navigate("/getUsers");
          } 
        })
        .catch((e) => {
          
            const status= e.response.status;
            if (status === 404) {
    
                setError(emailField, "Email is not registered");
              } else if (status=== 401) {
    
                setError(passwordField, "Password id wrong");
              }
         
        });
    } catch(e) {
      console.log("---------errorr-----------",e);
    }
  };

  return (
    <>
      <div className="logo ">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <section>
        <div className="container_1">
          <h1 className="center-tag">Login</h1>

          <form id="form">
            <div className="row100">
              <div className="col">
                <div className="inputBox">
                  <input
                    type="text"
                    value={email}
                    id="email"
                    name="email"
                    data-testid="input-email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                  <span className="text">Email</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
            </div>
            <div className="row100">
              <div className="col">
                <div className="inputBox">
                  <input
                    type="password"
                    value={password}
                    id="password"
                    name="password"
                    data-testid="input-password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                  <span className="text">Password</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
            </div>
            <div className="row100">
              <div className="col"></div>
              <div className="col">
                <Link to="/getUsers">
                  <input
                    className="center-tag"
                    type="submit"
                    value="Login"
                    onClick={CheckLogin}
                  />
                </Link>
              </div>
              <div className="col"></div>
            </div>
            <div className="center-tag-a">
              <Link to="/" className="center-tag-a">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
