import logo from "../images/divumlogo.png";
import React,{ useState,useEffect } from "react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import formValidate from "../ValidateForm";
import valid from "./valid";
import setError from "./setError";

function UpdateUser() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers/" + id)
      .then((result) => {
        console.log(result);
        setEmail(result.data.email);
        setFirstname(result.data.firstname);
        setLastname(result.data.lastname);
        setMobile_no(result.data.mobile_no);
        setDob(result.data.dob.slice(0, 10));
        setAddress(result.data.address);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnUpdate = async (e) => {
    e.preventDefault();

    if (valid()) {
      let result = await fetch("http://localhost:5000/updateUser/" + id, {
        method: "PUT",
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          mobile_no,
          dob,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      try {
        result = await result.json();
        console.warn(result);
        if (result) {
          alert("Data Updated succesfully");
          setEmail("");
          setFirstname("");
          setLastname("");
          setMobile_no("");
          setDob("");
          setAddress("");
        }
        navigate("/getUsers");
      } catch (error) {
        let field = document.getElementById("email");
        setError(field, "*Email address already exists");
        console.log(error, result);
      }
    }
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
                <div className="inputBox error">
                  <input
                    type="text"
                    value={firstname}
                    id="fname"
                    name="fname"
                    onChange={(e) => setFirstname(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
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
                    onChange={(e) => setLastname(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                  />
                  <span className="text">Last Name</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
            </div>
            <div className="row100">
              <div className="col">
                <div className="inputBox">
                  <input
                    type="email"
                    value={email}
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                  />
                  <span className="text">Email</span>
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
                    onChange={(e) => setDob(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <span className="text">Date Of Birth</span>
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
                    onChange={(e) => setMobile_no(e.target.value)}
                    onBlur={(e) => formValidate(e.target.id)}
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
                    onBlur={(e) => formValidate(e.target.id)}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                  <span className="text">Address...</span>
                  <span className="line"></span>
                  <div className="errormsg"></div>
                </div>
              </div>
            </div>

            <div className="row100">
              <div className="col">
                <Link to="/getUsers">
                  <input
                    type="submit"
                    value="Update"
                    onClick={handleOnUpdate}
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UpdateUser;
