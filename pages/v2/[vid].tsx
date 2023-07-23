import { useState, useEffect, useRef } from "react";
// import axios from "axios";

const SingleVideoPage2 = ({ vid }) => {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // const togglePlay = () => {
  //   if (isPlaying) {
  //     videoRef.current.pause();
  //   } else {
  //     videoRef.current.play();
  //     setMuted(true);
  //   }
  //   setIsPlaying(!isPlaying);
  // };

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
          <embed
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              border: 0,
            }}
            type="text/html"
            src={`/v/${vid}`}
          />
          {/* <video
            className="native-video"
            playsInline={false}
            onTimeUpdate={handleProgress}
            ref={videoRef}
            width="100%"
            height="100%"
            is="x-muted"
            controlsList="nofullscreen"
            muted={muted}
            controls
          >
            <source src="/6ea8f459-d197aca4.mp4" />
          </video> */}
          {/* <div>
            <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <progress value={progress} max="100" />
          </div> */}
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
