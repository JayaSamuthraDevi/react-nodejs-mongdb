import logo from "../images/divumlogo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formValidate from "../ValidateForm";
import setError from "./setError";
import valid from "./valid";

// import moment from 'moment';
// import 'react-datetime/css/react-datetime.css';
function AddUser() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (valid()) {
      let result = await fetch("http://localhost:5000/getUsers", {
        method: "post",
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          mobile_no,
          dob,
          address,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      try {
        result = await result.json();
        const oldUser = result.emailExists;

        if (oldUser == "true") {
          e.preventDefault();

          let field = document.getElementById("email");
          setError(field, "*Email address already exists");
        } else if (result) {
          alert("Data saved succesfully");
          setEmail("");
          setFirstname("");
          setLastname("");
          setMobile_no("");
          setDob("");
          setAddress("");
          setPassword("");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    return true;
  };

  return (
    <>
      <div className="logo ">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <section>
        <div className="container">
          <form id="form">
            <div className="row100">
              <div className="col">
                <div className="inputBox">
                  <input
                    type="text"
                    value={firstname}
                    id="fname"
                    name="fname"
                    data-testid="input-fname"
                    onChange={(e) => setFirstname(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    autoComplete="off"
                  />
                  <span className="text">First Name</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
              <div className="col">
                <div className="inputBox">
                  <input
                    type="text"
                    value={lastname}
                    id="lname"
                    name="lname"
                    data-testid="input-lname"
                    onChange={(e) => setLastname(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    autoComplete="off"
                  />
                  <span className="text">Last Name</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
              <div className="col">
                <div className="inputBox">
                  <input
                    type="date"
                    value={dob}
                    id="dob"
                    name="dob"
                    data-testid="input-dob"
                    onChange={(e) => setDob(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    max={new Date().toISOString().split("T")[0]}
                    autoComplete="off"
                  />

                  <span className="text">Date Of Birth</span>
                  <span className="line"></span>
                  <div
                    className="errormsg"
                    style={{ position: "relative", top: "2px" }}
                  ></div>
                </div>
              </div>
            </div>

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
                    onBlur={(e) => formValidate(e.target.id)}
                    autoComplete="off"
                  />
                  <span className="text">Email</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>

              <div className="col">
                <div className="inputBox">
                  <input
                    type="password"
                    value={password}
                    id="password"
                    name="password"
                    data-testid="input-dob"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    autoComplete="off"
                  />

                  <span className="text">Password</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
              <div className="col">
                <div className="inputBox">
                  <input
                    type="text"
                    value={mobile_no}
                    id="mobile"
                    name="mobile"
                    data-testid="input-mobile"
                    onChange={(e) => setMobile_no(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    autoComplete="off"
                    maxLength="10"
                  />
                  <span className="text">Mobile</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
            </div>

            <div className="row100">
              <div className="col">
                <div className="inputBox textarea">
                  <textarea
                    value={address}
                    id="address"
                    name="address"
                    maxLength="50"
                    data-testid="input-address"
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    autoComplete="off"
                  ></textarea>
                  <span className="text">Address...</span>
                  <span className="line"></span>

                  <div
                    style={{ position: "relative", top: "88px" }}
                    className="errormsg"
                  ></div>
                </div>
              </div>
            </div>

            <div className="row100">
              <div className="col">
                <Link to="/login">
                  <input
                    type="submit"
                    value="Submit"
                    onClick={handleOnSubmit}
                  />
                </Link>
              </div>
            </div>
            <div className="row100">
              <div className="col">
                <Link to="/login">Already Have an Account Sign Up Now</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddUser;
