import YouTube from "react-youtube";
import "./videoPlayer.css";

type videoPlayerProps = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: videoPlayerProps) {
  const videoId = videoUrl.split("/");
  const options = {
    height: '100%'
  }
  console.log(videoId[3]);
  return (
    <div className="videoPlayer">
      <YouTube videoId={videoId[3]} opts={options}/>
    </div>
  );
}
