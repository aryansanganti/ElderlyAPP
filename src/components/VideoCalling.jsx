import React from "react";
import '../components/VideoCalling.css'; // Import the CSS file

const VideoCall = () => {
  const initiateVideoCall = () => {
    window.open("https://video-call-url.com", "_blank"); // Sample URL
  };

  return (
    <div>
      <button className="video-call-button" onClick={initiateVideoCall}>Start Video Call</button>
    </div>
  );
};

export default VideoCall;
