# Get a login system with NextJS development. In this project, you can connect to databases using cors & routes & MongoDB
###
![image](https://github.com/amadich/mynext_server/assets/74735976/72f40c90-571f-4804-ade0-64232611e239)
# I also used Jsonwebtoken & Cookies in this project
![image](https://github.com/amadich/mynext_server/assets/74735976/02bff472-5a66-4e2d-9d13-e0468f01fd66)

# Router For Create New Accunet MongoDB
```js

router.post("/" , async (req , res) => {
   const { email , password , avatar } = req.body;
   
   try {
      
      const accunets = await UserModel.findOne({email});
      if (accunets) {return res.json({message: "This User Exist Choise Other One!!"})}

      const hashPwd = bcrypt.hashSync(password, 10);

     
      const newaccunet = new UserModel({email , password : hashPwd , avatar})
      await newaccunet.save();

      const payload = { id: newaccunet._id, email: newaccunet.email , password : hashPwd , avatar };
      const token = jwt.sign(payload,"master");
      return res.json({token});

   } catch (error) {
      console.log(error);
   }
})

```


# Router For Login : 
```js

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

```

After Export The Router dont Forget to use it in Server.js (index.js) : 
```js

app.use("/createone", require("./routes/Register"));

```
# Thanks , Don't Forget to ADD Star ⭐
