import axios from "axios";
import React, { useState,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  //Two hooks gor login and showRegisterForm
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //This does the login work
  // /users is a custom api which I have created.
  const login = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
      };
      const result = await axios.post("/api/users/login", payload);
      console.log(result.data);
      toast("Login Successfull");
      localStorage.setItem("users-pro", JSON.stringify(result.data));
      navigate("/home");
      setLoading(false);
    } catch (error) {
      toast("Invalid Credentials");
      setLoading(false);
    }
  };
  //This does the register work
  //Payload is the data which is being passed to the api to make the DB
  // /api is used for proxying i.e going from frontend server to backend server 3000 - 5000
  const register = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
        name,
      };
      await axios.post('/api/users/register', payload);
      toast("Registration successfull , Now please login");
      //On login again empty the fields of the textbox.
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setShowRegisterForm(false);
      setShowLoginForm(true);
    } catch (error) {
      toast("Something went Wrong or User might already exist");
      setLoading(false);
    }
  };
  //This is used to check if the user is already logged in 
  useEffect(()=>{
    if(localStorage.getItem('users-pro'))
    navigate('/home')
  },[])
  return (
    <div className='h-screen flex items-center sm:flex-col'>
      {loading && <Spinner />}
      <div className={`w-1/2 px-10 space-y-5 sm:w-screen ${ (showLoginForm || showRegisterForm) && 'sm:hidden'}`}>
        <h1>
          <b className='text-[#2B8F74]  text-8xl'>Finger</b>
          <b className="text-8xl text-gray-700">Tips</b>
        </h1>
        <p className="text-lg">
        A web application to post important news. 
        The application can be used by various organizations for spreading important notices or updates across departments.
        </p>
        <div className="space-x-5">
          <button
            className="bg-gray-300 px-10 py-3 font-bold"
            onClick={() => {
              setShowRegisterForm(false);
              setShowLoginForm(true);
            }}
          >
            LOGIN
          </button>
          <button
            className="bg-[#2B8F74] px-10 py-3 text-white"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(true);
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
      <div className='w-1/2 sm:w-screen'>
        {!showLoginForm && !showRegisterForm && (
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_qmfs6c3i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        )}
        {showLoginForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-400 text-left w-full font-semibold my-5">
                LOGIN
              </h1>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="Email"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black font-extrabold"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-400 text-left w-full font-semibold my-5">
                REGISTER
              </h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="Name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="Email"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black font-extrabold"
                  onClick={register}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        )}

        {(showLoginForm || showRegisterForm) && (
          <AiOutlineClose
            className="absolute top-5 right-5 z-10 cursor-pointer hover:bg-gray-100 hover:rounded-full hover:p-2 hover:text-white"
            size={30}
            color="gray"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(false);
            }}
          />
        )}
      </div>
    </div>

  )
}

export default LandingPage