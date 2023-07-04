"use client"
import Link from "next/link";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
function Home() {

  const [email , setEmail] = useState("");
  const [avatar , setAvatar] = useState("");
  const [checktoken , setCheckToken] = useState<String | null>("");
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    setCheckToken(token);
    if (checktoken) {

      if(token) {
        
         let me : any = jwtDecode(token);
         setEmail(me.email)
          let aav = `https://firebasestorage.googleapis.com/v0/b/usemaster-2566b.appspot.com/o/avatars%2F${me.avatar}?alt=media`
          setAvatar(aav);
          console.log(me.avatar);
          
          console.log("Yes");
        
        }
      
     
      
      
    }
    else {console.log("No!!");}
  }, [checktoken])

  return ( 
    <>
          <Link href="/pages/Signin">  <button className="border bg-green-500">Sign in</button>           </Link> 
          <Link href="/pages/Signup">    <button className="border bg-orange-500">Sign up</button> </Link>


      {
        checktoken ? <p>{email}</p> : <p>Contact</p> 
      }

      <div className="w-16 h-16 border" style={checktoken ? {backgroundImage: `url(${avatar})` , backgroundSize: "cover"} : {}}></div>
          

    </>
   );
}

export default Home;