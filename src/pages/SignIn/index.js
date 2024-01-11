import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";
import "./style.css"; // Tạo một file CSS riêng cho trang Login
import axios from "axios";

function Login() {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    axios
    .post("https://meowblog.onrender.com/auth/login", user)
    .then((res)=>{
      setPassword("");
      if(res.data.isSuccess === 1){
      const {user, token} = res.data;
			login(user, token);
      console.log(user);
      navigate("/");
      }
    })
    .catch((error)=> {
      console.log(error);
    });
  };

  return (
    <div className="signin-container mt-4 d-flex justify-content-center flex-column">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />        
        </div>
       <div className="d-flex justify-content-center">
        <button className="d-flex justify-content-center" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Wait for a moment..." : "Sign In"}
        </button>
       </div>
        
    </div>
  );
}

export default Login;
