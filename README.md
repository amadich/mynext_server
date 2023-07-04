# Get a login system with NextJS development. In this project, you can connect to databases using cors & routes & MongoDB
###
![image](https://github.com/amadich/mynext_server/assets/74735976/f2a716ab-4689-4c1c-a71b-deb1aea4ae63)

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

# FireBase Deploy Images + Axios to Post Information : 
UUID it's ID or a ( Tag name ) for Image

First Import Packs : 

```tsx
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import Axios from "axios";
import {useCookies} from "react-cookie";
```
# Function -> 
```tsx
const handupload = (e : FormEvent) => {
         e.preventDefault();
         if (avatar == null) return;

         let myUUID = v4();
         const photoRef = ref(storage, `avatars/${myUUID}`);
         uploadBytes(photoRef,avatar)
         .then(() => {
            
            Axios.post("https://mynextservermaster.vercel.app/createone", {email , password , avatar : myUUID})
            .then((response) => {
               alert("Complete Sucssefull : " + myUUID);
               console.log(response.data);
               window.localStorage.setItem("token",response.data.token);
               setCookies("mysystem",response.data.token);
               window.location.href = "/";
               
            }).catch((e) => {console.log(`Axios Error : `,e);
            })

            
         }).catch((e) => {console.log(e);
         })

   }
```

# Thanks , Don't Forget to ADD Star ⭐
