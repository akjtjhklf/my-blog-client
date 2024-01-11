import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./style.css"; // Tạo một file CSS riêng cho trang Login
import axios from "axios";

function Register() {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      firstName:firstName,
      lastName:lastName,
      password: password,
      confirmpassword: confirmpassword,
    };
    axios
    .post("https://meowblog.onrender.com/auth/register", user)
    .then((res)=>{
      setPassword("");
      if(res.data.isSuccess === 1){
        navigate("/auth/signin");
      }
    })
    .catch((error)=> {
      console.log(error);
    });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
            <input
              type="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm your password:</label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
        </div>
        <button onClick={handleSignUp} disabled={isLoading}>
          {isLoading ? "Wait for a moment..." : "Sign Up"}
        </button>
    </div>
  );
}

export default Register;
