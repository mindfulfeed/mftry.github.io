import React from 'react';
import './channels.styles.css';
import logo from "../../assets//websitelogo.svg";
import youtubeLogo from "../../assets//Youtubeyoutubelogo.svg";

const Channels = () => {
  const channels = [
    {
      logo: require("../../assets/3b1blogo.svg").default,
      name: "3Blue1Brown",
      id: "@3Blue1Brown",
      genre: "Education"
    },
    {
      logo: require("../../assets/mblogo.svg").default,
      name: "MrBeast",
      id: "@MrBeast",
      genre: "Entertainment"
    },
    // Add more channel objects here
  ];

  const recommendedChannels = [
    {
      logo: "channel3-logo.svg",
      name: "Channel 3",
      id: "@Channel3",
      genre: "Recommended Genre"
    },
    {
      logo: "channel4-logo.svg",
      name: "Channel 4",
      id: "@Channel4",
      genre: "Recommended Genre"
    },
    // Add more recommended channel objects here
  ];

  return (
    <div className="channel-page-container">
      <div className="logo-container">
        <img src={logo} alt="Website Logo" className="website-logo" />
      </div>
      <div className="youtube-logo-container">
        <img src={youtubeLogo} alt="YouTube Logo" className="youtube-logo" />
        <h1 className="youtube-heading">YouTube</h1>
      </div>
      <div className="div-container">
        {channels.map((channel, index) => (
          <div
            key={index}
            className={`channel-div ${channel.genre === 'Education' ? 'education' : 'entertainment'}`}
          >
            <div className="channel-content">
              <img src={channel.logo} alt={`${channel.name} Logo`} className="channel-logo" />
              <div className="channel-info">
                <h2 className="channel-name">{channel.name}</h2>
                <p className="channel-id">{channel.id}</p>
                <p className="channel-genre">{channel.genre}</p>
              </div>
            </div>
            <div className="button-container">
              <button className="view-button">View</button>
              <button className="manage-button">Manage</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-new-button">+ Add new</button>
      <div className="recommended-channels-container">
        <h1 className="recommended-heading">Recommended channels</h1>
        <div className="recommended-divs">
          {recommendedChannels.map((channel, index) => (
            <div
              key={index}
              className={`recommended-div ${channel.genre === 'Education' ? 'education' : 'entertainment'}`}
            >
              <div className="recommended-content">
                <img src={channel.logo} alt={`${channel.name} Logo`} className="channel-logo" />
                <div className="channel-info">
                  <h2 className="channel-name">{channel.name}</h2>
                  <p className="channel-id">{channel.id}</p>
                  <p className="channel-genre">{channel.genre}</p>
                </div>
              </div>
           
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Channels;
