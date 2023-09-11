import logo from "../images/divumlogo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";


function Records() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/getUsers")
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

  const deleteUser = (id) => {
    axios
      .delete("http://localhost:3002/deleteUser/" + id)
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
          <button className="addbtn btn" onSubmit={addSubmit}>
            Add
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
