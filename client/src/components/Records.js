import logo from "../images/divumlogo.png";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";


function Records() {
  const [users, setUsers] = useState([]);

  var sessionstorage =require('sessionstorage');
  useEffect(()=>{
    const checkloginstatus = async () =>
    {
      try{
        const token = await sessionstorage.getItem("token_name");
        if(token){
          setTimeout(()=>{
            navigate("/getUsers");
          },400);
          console.log("console",token);
        }
      }catch(e)
      {
        console.log(e);
      }
    }
    checkloginstatus();
  },[])
  


  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((users) => {
        setUsers(users.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate;

  const addSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  const logoutBtn = async (e) => {
    e.preventDefault();
    // Using Axios for the HTTP request
    axios
      .post("/logout")
      .then((response) => {
        // Handle the response here, e.g., redirect to the login page or show a message.
        console.log(response.data.message); // 'Logout successful'
        // Perform any necessary client-side cleanup or redirection.
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Handle any errors that may occur during logout.
      });
    navigate("/");
  };

  const deleteUser = (id) => {
    axios
      .delete("http://localhost:5000/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })

      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="logo ">
        <img src={logo} alt="logo" className="logo" />
        <Link to="/">
          <button className="customBtn btn" onSubmit={addSubmit}>
            Add
          </button>
        </Link>
        <Link to="/">
          <button className="logoutBtn btn" onSubmit={logoutBtn}>
            Logout
          </button>
        </Link>
      </div>

      <section>
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <div className="dw-50">
            <table className="table ">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Phone_no</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr>
                      <td>{user.email}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.mobile_no}</td>

                      <td>
                        {user.dob.slice(8, 10)}-{user.dob.slice(5, 7)}-
                        {user.dob.slice(0, 4)}
                      </td>
                      <td>
                        <Link to={`/updateUser/${user._id}`}>
                          <button className="btn edit">Edit</button>
                        </Link>
                        <button
                          className="btn delete"
                          onClick={(e) => {
                            deleteUser(user._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Records;
