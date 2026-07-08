import { useImperativeHandle, useRef, type Ref } from "react";
import YouTube, { type YouTubeEvent, type YouTubePlayer } from "react-youtube";
import "./videoPlayer.css";

type videoPlayerProps = {
  videoUrl: string;
  ref?: Ref<VideoPlayerHandle>;
};

export type VideoPlayerHandle = {
  getCurrentTimestamp: () => number; //defines what is publicly exposed outside this comp via ref
};

export default function VideoPlayer({ videoUrl, ref }: videoPlayerProps) {
  const videoId = videoUrl.split("/");
  const playerRef = useRef<YouTubePlayer | null>(null); //creates a ref to hold the ytplayer object once it exists but null to start
  const options = {
    height: "100%",
  };

  const onReady = (event: YouTubeEvent) => {
    //once player has loaded(event) playerRef = ytplayer object
    playerRef.current = event.target;
  };

  useImperativeHandle(ref, () => ({
    //first argument is the ref passed from parent, second is function returning what ref.current should become (getCurrentTimestamp)
    getCurrentTimestamp: () => {
      return playerRef.current?.getCurrentTime() ?? 0; //if the playerRef exists if no then timeStamp = 0
    },
  }));

  console.log(videoId[3]);
  return (
    <div className="videoPlayer">
      <YouTube videoId={videoId[3]} opts={options} onReady={onReady} />
    </div>
  );
}
