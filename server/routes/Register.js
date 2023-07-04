const express = require("express");
const UserModel = require("../models/Users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post("/" , async (req , res) => {
   const { email , password , avatar } = req.body;
   
   try {
      
      const accunets = await UserModel.findOne({email});
      if (accunets) {return res.json({message: "This User Exist Choise Other One!!"})}

      const hashPwd = bcrypt.hashSync(password, 10);

     
      const time = new Date(Date.now()).getMonth() + " / " + new Date(Date.now()).getDate() + " / " + new Date(Date.now()).getFullYear() + " / " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
      const newaccunet = new UserModel({email , password : hashPwd , avatar , dateCreate: time})
      await newaccunet.save();

      const payload = { id: newaccunet._id, email: newaccunet.email , password : hashPwd , avatar };
      const token = jwt.sign(payload,"master");
      return res.json({token});

   } catch (error) {
      console.log(error);
   }
})


router.post("/me", async ( req , res ) => {
   const { email , password } = req.body;
   try {

      const accunets = await UserModel.findOne({email});
      if (!accunets) {return res.json({message: "Not Found This User !!"})}

      const pwdcheck = await bcrypt.compare(password,accunets.password);
      if(!pwdcheck) {return res.json({message: "Email Or Password Incorrect !!"})}

      const payload = { id: accunets._id, email: accunets.email , avatar : accunets.avatar };
      const token = jwt.sign(payload,"master");

      return res.json({token});
      
   } catch (error) {
      console.log(error);
   }
})

module.exports = router;
