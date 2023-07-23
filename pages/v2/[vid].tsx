import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Vimeo from "@u-wave/react-vimeo";
// import Vimeo from "react-vimeo";
import ReactPlayer from "react-player/lazy";

// import { default as _ReactPlayer } from "react-player";
// import { ReactPlayerProps } from "react-player/types/lib";
// const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const SingleVideoPage2 = ({ vid }) => {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  // /6ea8f459-d197aca4.mp4

  return (
    <>
      {loaded ? (
        <>
          <video
            className="native-video"
            playsInline={false}
            onTimeUpdate={handleProgress}
            ref={videoRef}
            width="100%"
            height="100%"
            controlsList="nofullscreen"
            controls
          >
            <source src="/6ea8f459-d197aca4.mp4" />
          </video>
          <div>
            <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <progress value={progress} max="100" />
          </div>
        </>
      ) : (
        "Cargando contenido..."
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      vid: context.params.vid,
    },
  };
};

export default SingleVideoPage2;
