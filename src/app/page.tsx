'use client'
// pages/index.tsx
import Link from 'next/link';  // Import Next.js Link
import { useState } from 'react';

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleKeyDown = (event)=>{
    if(event.key == "Enter"){
      if(username === "admin" && password === "admin123"){
        setIsLogin(true);
      }
      else{
        alert("wrong username or password");
      }
    }
  }

  const handleLogin = () => {
    if(username === "admin" && password === "admin123"){
      setIsLogin(true);
    }
    else{
      alert("wrong username or password");
    }

  }

  return (
    <>
      {isLogin === false ?
        <div className='min-h-screen flex flex-col w-full justify-center items-center bg-gray-50'>
          <div className='shadow-xl rounded-lg p-10 bg-white'>
          <div className='flex flex-col text-gray-600 text-2xl'>
            <label htmlFor="username">Username</label>
            <input onKeyDown={(e)=> handleKeyDown(e)} className='bg-gray-200 p-2' placeholder='Enter your username...' onChange={(e)=> setUsername(e.target.value)} type="text" />
          </div>
          <div className='flex flex-col text-gray-600 text-2xl'>
            <label htmlFor="password">Password</label>
            <input onKeyDown={(e)=> handleKeyDown(e)} className='bg-gray-200 p-2' placeholder='Enter your password...' onChange={(e)=> setPassword(e.target.value)} type="text" />
          </div>
          <div className='w-full h-full mt-4'>
            <button className='text-white bg-red-600 h-full w-full p-2 rounded-md' onClick={() => handleLogin()}>Login</button>
          </div>
          </div>
        </div>
        :

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
          <h1 className="text-3xl font-semibold mb-8 text-gray-800">Welcome to the Invoice System</h1>
          <div className="space-y-4">
            <Link
              href="/manually"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >

              Create Manually

            </Link>
            <Link
              href="/auto"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >

              Upload Excel File

            </Link>
          </div>
        </div>

      }
    </>
  );
};

export default Home;
