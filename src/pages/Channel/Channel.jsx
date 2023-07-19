import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

import "./channel.styles.css";

const Channel = () => {
  const { id } = useParams();

  const [showVideos, setShowVideos] = useState(true);
  const [showShorts, setShowShorts] = useState(false);
  const [videosWithShorts, setVideosWithShorts] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleShowShorts = () => {
    setShowVideos(false);
    setShowShorts(true);
    setSelectedButton("shorts");
  };

  const handleShowVideos = () => {
    setShowVideos(true);
    setShowShorts(false);
    setSelectedButton("videos");
  };

  const handleSinceLastVisit = () => {
    // Handle logic for showing videos since last visit
    setSelectedButton("sinceLastVisit");
  };

  const handleEngage = () => {
    // Handle logic for engaging with the videos
    setSelectedButton("engage");
  };

  const channelData = [
    {
      id: 1,
      name: "Shawn Mendes",
      profilePicture:
        "https://yt3.googleusercontent.com/QTpsceScLWmzgZXO6lPJo-s0CzCaGoat2S8PZzfdKtvqJTUh7jCLtYvCPH1RbUzVCOz2t_RIqIA=s176-c-k-c0x00ffffff-no-rj-mo",
      videos: [
        {
          id: 1,
          title: "Shawn Mendes - Treat You Better",
          embedUrl: "https://www.youtube.com/embed/xiwk_5fal00",
          isShort: true,
        },
        {
          id: 2,
          title: "Shawn Mendes, Camila Cabello - Señorita",
          embedUrl: "https://www.youtube.com/embed/Pkh8UtuejGw",
          isShort: false,
        },
        {
          id: 3,
          title: "Shawn Mendes - It'll Be Okay",
          embedUrl: "https://www.youtube.com/embed/KrgJp7Z1Hv8",
          isShort: false,
        },
        {
          id: 4,
          title: "xyz",
          embedUrl: "https://www.youtube.com/embed/bEgyagt4_jA",
          isShort: true,
        },
        // Add more videos here
      ],
    },
    {
      id: 2,
      name: "TEDx Talks",
      profilePicture:
        "https://yt3.googleusercontent.com/ytc/AGIKgqPCF-9_D76foguH-RiDlazSY29Lu_51Rr3LrKSn5A=s176-c-k-c0x00ffffff-no-rj",
      videos: [
        {
          id: 1,
          title: "The Power of Vulnerability | Brené Brown",
          embedUrl: "https://www.youtube.com/embed/iCvmsMzlF7o",
          isShort: false,
        },
        {
          id: 2,
          title: "How Great Leaders Inspire Action | Simon Sinek",
          embedUrl: "https://www.youtube.com/embed/qp0HIF3SfI4",
          isShort: false,
        },
        {
          id: 3,
          title: "The Fringe Benefits of Failure | J.K. Rowling",
          embedUrl: "https://www.youtube.com/embed/wHGqp8lz36c",
          isShort: false,
        },
        // Add more videos here
      ],
    },
  ];

  const checkShortStatus = async (videoId) => {
    try {
      const response = await axios.get(`http://localhost:8000/isShort/${videoId}`);
      console.log("hi", response.data.isShort);
      return response.data.isShort;
    } catch (error) {
      console.error(error);
      return false; // Return false in case of an error
    }
  };

  useEffect(() => {
    const fetchVideosWithShorts = async () => {
      const selectedChannel = channelData.find(
        (channel) => channel.id.toString() === id
      );

      if (selectedChannel) {
        const videos = selectedChannel.videos;
        const videosWithShorts = [];

        for (const video of videos) {
          const videoId = video.embedUrl.split("/").pop();
          console.log("videoId:", videoId);

          const isVideoShort = await checkShortStatus(videoId);
          console.log("isVideoShort:", isVideoShort);
          console.log("video.isShort:", video.isShort);

          if (video.isShort !== isVideoShort) {
            videosWithShorts.push(video);
          }
        }
        console.log("videosWithShorts:", videosWithShorts);
        setVideosWithShorts(videosWithShorts);
      }
    };

    fetchVideosWithShorts();
  }, [id]);

  const selectedChannel = channelData.find(
    (channel) => channel.id.toString() === id
  );

  if (!selectedChannel) {
    return <div>Channel not found</div>;
  }

  const handleShowNew = () => {
    // Handle logic for showing new videos
  };

  return (
    <div className="Container">
      <div className="LogoContainer">
        <img
          className="ProfilePicture"
          src={selectedChannel.profilePicture}
          alt={selectedChannel.name}
        />
        <div className="ChannelInfo">
          <h1 className="Title">{selectedChannel.name}</h1>
          <p className="ChannelID">
            {selectedChannel.id ? `Channel ID: ${selectedChannel.id}` : selectedChannel.name}
          </p>
        </div>
      </div>
      <div className="VideosContainer">
        <div className="ButtonContainer">
          <button
            onClick={handleShowShorts}
            className={`Button ${selectedButton === "shorts" ? "active" : ""}`}
          >
            Shorts
          </button>
          <button
            onClick={handleShowVideos}
            className={`Button ${selectedButton === "videos" ? "active" : ""}`}
          >
            Videos
          </button>
          <button
            onClick={handleSinceLastVisit}
            className={`Button ${selectedButton === "sinceLastVisit" ? "active" : ""}`}
          >
            Since Last Visit
          </button>
          <button
            onClick={handleEngage}
            className={`Button ${selectedButton === "engage" ? "active" : ""}`}
          >
            Engage
          </button>
        </div>

        {showVideos && (
          <>
            {selectedChannel.videos.map((video) => {
              return !video.isShort ? (
                <div className="VideoContainer" key={video.id}>
                  <h3 className="VideoTitle">{video.title}</h3>
                  <iframe
                    className="VideoFrame"
                    title={video.title}
                    src={video.embedUrl}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null;
            })}
          </>
        )}

        {showShorts && (
          <>
            <div className="CarouselContainer">
              <Slider infinite={false} slidesToShow={1} className="CustomSlider">
                {selectedChannel.videos.map((video) => {
                  return video.isShort ? (
                    <div className="ShortVideoContainer" key={video.id}>
                      <h3 className="VideoTitle">{video.title}</h3>
                      <iframe
                        className="ShortVideoFrame"
                        title={video.title}
                        src={video.embedUrl}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : null;
                })}
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Channel;
