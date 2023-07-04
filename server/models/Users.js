const {Schema , model} = require("mongoose");
const UserSchema = Schema({
   email: {type : String , require : true},
   password : {type : String , require : true},
   avatar : {type : String , require : true},
   dateCreate: {type: String , require: true}
})
const UserModel = model("accunets",UserSchema);
module.exports = UserModel;
