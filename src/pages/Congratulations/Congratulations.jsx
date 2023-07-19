import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './congratulations.styles.css';
import congoImage from "../../assets//congoo.svg";

const Congratulations = () => {

    const navigate = useNavigate();

    const handleContinue = () => {
      navigate('/feed');
    };
  

  return (
    <div className="congratulations-container">
      <div className="congratulations-rectangle">
        <h1 className="congratulations-main-heading">Congratulations</h1>
        <h2 className="congratulations-sub-heading">You have successfully created your account!</h2>
        <img src={congoImage} alt="Congratulations" className="congratulations-image" />
        <p className="congratulations-description">
          Please be <strong>mindful</strong> of your username and password.
          
        </p>
        <button className="congratulations-continue-button" onClick={handleContinue}>Continue to feed</button>
      </div>
    </div>
  );
}

export default Congratulations;
