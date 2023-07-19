import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './404.styles.css';
import congoImage from "../../assets//404.svg";

const NotFound = () => {

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/feed');
  };

  const handleEmojiClick = (emoji) => {
    if (selectedEmoji === emoji) {
      setSelectedEmoji(null);
    } else {
      setSelectedEmoji(emoji);
    }
  };

  return (
    <div className="congratulations-container">
      <div className="congratulations-rectangle">
        <h1 className="congratulations-main-heading">Caught in the act</h1>
        <h2 className="congratulations-sub-heading">This feature is still under construction :/</h2>
        <img src={congoImage} alt="404" className="congratulations-image scaled-image" />

        <p className="congratulations-description">
          <strong> How excited are you for this feature? </strong>
        </p>

        <div className="emoji-buttons">
          <button
            className={`emoji-button ${selectedEmoji === 'dissapointed' ? 'selected' : ''}`}
            onClick={() => handleEmojiClick('dissapointed')}
          >
            &#128547;
          </button>
          
          <button
            className={`emoji-button ${selectedEmoji === 'neutral' ? 'selected' : ''}`}
            onClick={() => handleEmojiClick('neutral')}
          >
            &#128529;
          </button>
          <button
            className={`emoji-button ${selectedEmoji === 'happy' ? 'selected' : ''}`}
            onClick={() => handleEmojiClick('happy')}
          >
            &#128516;
          </button>
          <button
            className={`emoji-button ${selectedEmoji === 'super-excited' ? 'selected' : ''}`}
            onClick={() => handleEmojiClick('super-excited')}
          >
            &#128522;
          </button>
          <button
            className={`emoji-button ${selectedEmoji === 'sad' ? 'selected' : ''}`}
            onClick={() => handleEmojiClick('sad')}
          >
            &#128525;
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
