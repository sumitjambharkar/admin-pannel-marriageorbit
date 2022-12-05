import React, { useState } from 'react';
import { auth } from './firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
  
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result);
        
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (

   <>
   <div class="log-w3">
<div class="w3layouts-main">
	<h2>Sign In Now</h2>
		<form onSubmit={handleSubmit}>
			<input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" class="ggg" name="Email" placeholder="E-MAIL" required=""/>
			<input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" class="ggg" name="Password" placeholder="PASSWORD" required=""/>
			<span><input type="checkbox" />Remember Me</span>
			<h6><a href="#">Forgot Password?</a></h6>
				<div class="clearfix"></div>
				<input type="submit" value="Sign In" name="login"/>
		</form>
		<p>Don't Have an Account ?<a href="registration.html">Create an account</a></p>
</div>
</div>
   </>
  )
}

export default Login