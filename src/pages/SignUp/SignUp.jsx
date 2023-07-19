import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.styles.css";
import axios from "axios";

function SignUp() {

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    repeatPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    setData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password || !data.repeatPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (data.password !== data.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!data.acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    try {
      const url = "http://localhost:8000/auth/signup";
      const { data: res } = await axios.post(url, data);
      setIsSignUpSuccessful(true);
      navigate("/congratulations");
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
    <div className="signup-container">
      <div className="signup-header">
        <h1 className="signup-main-heading">Create your account</h1>
        <p className="signup-sub-heading">Move towards mindful content consumption!</p>
      </div>
      <div className="signup-form-container">
        <p className="signup-privacy-text">
          Your information remains private! We do not store any personal details
          of our users.
        </p>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            className="signup-input-field"
            value={data.name}
            onChange={handleChange}
            name="name"
          />
          <input
            type="text"
            placeholder="Username"
            className="signup-input-field"
            value={data.username}
            onChange={handleChange}
            name="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-input-field"
            value={data.password}
            onChange={handleChange}
            name="password"
          />

          <input
            type="password"
            placeholder="Repeat Password"
            className="signup-input-field"
            value={data.repeatPassword}
            onChange={handleChange}
            name="repeatPassword"
          />
          <label className="signup-checkbox-container">
            <input
              type="checkbox"
              checked={data.acceptTerms}
              onChange={handleChange}
              name="acceptTerms"
            />
            Accept terms and conditions
          </label>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        {error && <p className="signup-error-message">{error}</p>}
        <p className="signup-login-text">
          Already a user? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
