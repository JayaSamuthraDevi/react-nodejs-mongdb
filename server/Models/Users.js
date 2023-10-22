
const mongoose =require('mongoose')


var Schema = mongoose.Schema



var UserSchema =new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
    firstname: {
		type: String,
		required: true,
	},
    lastname: {
		type: String,
		required: true,
	},
    mobile_no: {
        type:String,
        required:true,
        unique:true,
    },
	dob: {
		type: Date,
		required:true,
	},
    address: {
		type: String,
		required: true,
		
	},
	password: {
		type: String,
		required: true,
		
	},
	timestamp:{
		type:Date,
		default:Date.now,
	},
});

//creats collection
const UserModel = mongoose.model('userlists', UserSchema);


module.exports =UserModel