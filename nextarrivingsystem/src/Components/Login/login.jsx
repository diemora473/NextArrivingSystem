import React from "react";
import FirebaseApp from "../../Firebase/Firebase";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useState } from "react";
import './login.css'
const auth = getAuth(FirebaseApp);
const Login = () => {
const [starting, setStarting] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signInWithEmailAndPassword(auth,email,password)

console.log("funciona", email, password);
}
return(
    <div>
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6  lg:px-8">
            
  <div class="w-full max-w-md space-y-8"> 
        <form onSubmit={handleSubmit} class="mt-8 space-y-6">
            <div class="-space-y-px rounded-md shadow-sm">
            <label className=""> Email</label>
            <input type="email"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="ingresar Email"
            id='email'
            required />
            <label>Password</label>
            <input type="password"
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Ingresar Password"
            id="password"
            required />
            <button
             class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >Inicia Sesion</button>
            </div>
            </form>
       </div>
       <div>
</div>
</div>
</div>
)

}
export default Login;