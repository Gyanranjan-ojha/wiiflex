import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Button, Img } from "../../components";

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="relative h-[309px] w-full overflow-hidden rounded-tl-[3px] rounded-tr-[3px] bg-gray-100">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=TMIuybN-XVI"
        playing={playing}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
      />
    </div>
  );
}

export default VideoPlayer;
