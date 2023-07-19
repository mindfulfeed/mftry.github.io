import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.styles.css";

function LogIn() {
  const [data, setData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const rememberMe = localStorage.getItem("rememberMe");

  //   if (token && rememberMe === "true") {
  //     navigate("/");
  //   } else {
  //     localStorage.removeItem("token");
  //   }
  // }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rememberMe = localStorage.getItem("rememberMe");
  
    if (rememberMe !== "true") {
      console.log("hello")
      navigate("/login"); // Redirect to the login page if rememberMe flag is not set
    } else if (token) {
      navigate("/feed"); // Redirect to the home page if the user is already logged in
    }
  }, [navigate]);
  

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const inputValue = type === "checkbox" ? checked : value;

    setData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const url = "http://localhost:8000/auth/signin";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);

      if (data.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/home");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-main-heading">Login to your account</h1>
        <p className="login-sub-heading">
          Welcome back! Select method to log in.
        </p>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input-field"
            value={data.username}
            onChange={handleChange}
            name="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input-field"
            value={data.password}
            onChange={handleChange}
            name="password"
          />
          <div className="login-checkbox-container">
            <input
              type="checkbox"
              checked={data.rememberMe}
              onChange={handleChange}
              name="rememberMe"
            />
            <label>Remember Me</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p className="login-error-message">{error}</p>}
        <p className="login-signup-text">
          Don't have an account? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;