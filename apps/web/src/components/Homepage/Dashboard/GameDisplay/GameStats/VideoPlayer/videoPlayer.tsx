import YouTube from "react-youtube"
type videoPlayerProps = {
  videoUrl:string
}

export default function VideoPlayer({videoUrl}:videoPlayerProps) {

  const videoId = videoUrl.split("/")
  console.log(videoId[3])
  return( 
    <div className="videoPlayer">
      <YouTube videoId={videoId[3]}/>
    </div>
  )
}
