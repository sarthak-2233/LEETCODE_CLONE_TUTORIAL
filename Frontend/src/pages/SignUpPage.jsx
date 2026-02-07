import React from 'react'
import {useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';

const SignUpPage = () => {

  const {
    register,handleSubmit,formState: { errors },} = useForm();
      
    // const submittedData= (data)=>{
    //   console.log(data);
    // }
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('firstName')} 
        placeholder='Enter First Name'
      />   
      <input {...register('email')}
        placeholder='Enter Email'
      />
      <input {...register('password')}
        placeholder='Enter Password'
      />
      <button type='submit' className='btn'>Sign Up</button>
    </form>   
    
  )
}

export default SignUpPage


  // const [name,setName] = useState(""); 
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
  
  


  // function handleSubmit(e)
  // {
  //   e.preventDefault();
  //   console.log(name,email,password)
  // }

  // <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-4 mt-10'>
  //     <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
  //     <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
  //     <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
  //     <button type='submit'>Sign Up</button>
  //   </form>

  // <input {...register('firstName')} />  TO TAKE INPUT 