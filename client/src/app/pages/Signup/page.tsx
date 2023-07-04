"use client"
import Image from "next/image";
import Logo from "../../../../public/assets/hornet.png";
import { FormEvent, useState } from "react";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import Axios from "axios";
import {useCookies} from "react-cookie";
function SignUp() {

   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [avatar , setAvatar] = useState<File | null>(null);
   const [_,setCookies] = useCookies(["mysystem"]);

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

   return ( 
      <>
               <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                     <Image
                        className="mx-auto h-16 w-auto"
                        src={Logo}
                        alt="Hornet Logo"
                        width={100}
                        height={100}
                        draggable={false}
                     />
                     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up 
                     </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                     <form className="space-y-6" onSubmit={handupload}>
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                           Email address
                        </label>
                        <div className="mt-2">
                           <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => {setEmail(e.target.value)}}
                           />
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between">
                           <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                              Password
                           </label>
                           <div className="text-sm">
                              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                              Forgot password?
                              </a>
                           </div>
                        </div>
                        <div className="mt-2">
                           <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => {setPassword(e.target.value)}}
                           />
                        </div>
                        </div>

                        <div>
                           <input 
                           type="file" 
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAvatar(e.target.files && e.target.files[0])}}
                           />
                        </div>


                        <div>
                        <button
                           type="submit"
                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           Sign Up
                        </button>
                        </div>
                     </form>

                     <p className="mt-10 text-center text-sm text-gray-500">
                        You are member?{' '}
                        <a href="/pages/Signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                        </a>
                     </p>
                  </div>
            </div>
      </>
    );
}

export default SignUp;