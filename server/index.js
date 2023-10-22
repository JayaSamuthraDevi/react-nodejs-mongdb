const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require("./Models/Users");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const sessionstorage = require("sessionstorage");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/registeration", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// // Define authentication middleware
//   function isAuthenticated(req, res, next) {
// 	// Check if the user is authenticated based on your authentication logic
// 	const token =req.cookies.token;
// 	console.log("-----------------");
// 	if (token) { // Example for session-based authentication
// 	  return next(); // User is authenticated, proceed to the next middleware or route handler
// 	}
// 	else{
// 		alert("Please Login to Continue...")
// 		res.redirect('/login');
// 	}
// 	// User is not authenticated, redirect to the login page or send an error response
// 	// Redirect to the login page
// 	// Alternatively, you can send an unauthorized response: res.status(401).json({ message: 'Unauthorized' });
//   }

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token, "-------------------");
  if (!token) {
    return res.json({ Message: "provide token" });
  } else {
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authenticate error" });
      } else {
        // req.name = decoded.name;
        next();
        console.log("-----------");
      }
    });
  }
};
// ,verifyUser() ,

app.get("/getUsers", async (req, res) => {
  try {
    const data = await UserModel.find().sort({ timestamp: -1 });
    res.json(data);
    console.log(res);
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
});

app.post("/getUsers", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the username is already taken
    const ExistingUser = await UserModel.findOne({ email });
    if (ExistingUser) {
      return res
        .status(400)
        .json({ message: "Email already Exists", emailExists: "true" });
    }
    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of hashing rounds

    const user = new UserModel({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mobile_no: req.body.mobile_no,
      dob: new Date(req.body.dob),
      address: req.body.address,
      password: hashedPassword,

      timestamp: new Date(),
    });
    let result = await user.save();
    result = result.toObject();
    res.send(req.body);
  } catch (e) {
    //console.log(req.body, e)
    res.send("Something Went Wrong", e);
  }
});

app.get("/getUsers/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mobile_no: req.body.mobile_no,
      dob: new Date(req.body.dob),
      address: req.body.address,

      timestamp: new Date(),
    }
  )

    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// Route for handling user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by their username in the database
    const userExists = await UserModel.findOne({ email });

    // If the user doesn't exist, return an error
    if (!userExists) {
      return res.status(404).json({ message: "User Doesn't Exists" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, userExists.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password is wrong" });
    }

    // If the passwords match, create a JWT token
    const token = jwt.sign(
      { userId: userExists._id, email: userExists.email },
      "your-secret-key",
      {
        expiresIn: "2h", // Token expiration time
      }
    );

    //storing token
    const storage =sessionstorage;
    storage.setItem("token_name", token);

    // Send the token as a response
    res.status(200).json({ token, message: "Exists" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", (req, res) => {
  // Perform logout actions here, such as clearing the session or invalidating the token.
  // For example, if using sessions:
  req.session.destroy((err) => {
    if (err) {
      console.error("Error while logging out:", err);
      res.status(500).json({ message: "Logout failed" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running");
});
