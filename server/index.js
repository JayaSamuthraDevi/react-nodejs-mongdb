
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require("./Models/Users")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/registeration")

app.get("/getUsers", async (req, res) => {
	try {
		const data = await UserModel.find().sort({ timestamp: -1 });
		res.json(data)
		console.log(res)
	}
	catch (error) {
		res.status(500).json({ message: error.message })
	}
})


app.post('/getUsers', async (req, res) => {
	try {

		const user = new UserModel(req.body);
		let result = await user.save();
		result = result.toObject();

		res.send(req.body);


	} catch (e) {
		//console.log(req.body, e)
		res.send("Something Went Wrong");
	}
});


app.get('/getUsers/:id', (req, res) => {
	const id = req.params.id;
	UserModel.findById({ _id: id })
		.then(users => res.json(users))
		.catch(err => res.json(err))
})


app.put('/updateUser/:id', (req, res) => {
	const id = req.params.id;
	UserModel.findByIdAndUpdate({ _id: id }, {
		email: req.body.email,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		mobile_no: req.body.mobile_no,
		dob: new Date(req.body.dob),
		address: req.body.address,
		timestamp:new Date()
	}
		)
		
		.then(users => res.json(users))
		.catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {

	const id = req.params.id;
	UserModel.findByIdAndDelete({ _id: id })
		.then(res => res.json(res))
		.catch(err => res.json(err))

})



app.listen(3002, () => {
	console.log("Server is running")



})

