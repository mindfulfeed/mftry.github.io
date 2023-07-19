import React from "react";
import "./feed.styles.css";
import logo from "../../assets//logo2.svg";
import youtubeLogo from "../../assets//Youtubeyoutubelogo.svg";

function Feed({ username }) {
  return (
    <div className="feed-container">
      <div className="feed-top-section">
        <img src={logo} alt="Logo" className="feed-logo" />
        <div className="feed-welcome-message">
          <h2 className="feed-username">Hi {username},</h2>
          <h1 className="feed-welcome">Welcome back!</h1>
        </div>
      </div>
      <div className="feed-bottom-section">
        <h2 className="feed-heading">My Feed</h2>
        {/* Add your carousel component here */}
        <button className="feed-go-to-feed-button">Go to Feed</button>
        <h2 className="feed-channels-heading">Manage Channels</h2>
        <p className="feed-channels-subheading">Pick the channels you want to view mindfully.</p>
        <div className="feed-manage-channels">
          <img src={youtubeLogo} alt="YouTube Logo" className="feed-youtube-logo" />
          <button className="feed-manage-button">Manage</button>
        </div>
      </div>
    </div>
  );
}

export default Feed;
