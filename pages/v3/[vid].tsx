import { useRef, useState, useEffect } from "react";

const CustomPlayer = ({ vid, query }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [muted, setMuted] = useState(true);

  const handleClick = () => {
    const video = videoRef.current;

    if (!video.paused && muted) {
      video.currentTime = 0;
      setMuted(false);
      video.play();
    } else if (!video.paused && !muted) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handlePauseEvent = (e: any) => {
    const data = {
      ...query,
      type: e.type,
      currentTime: videoRef.current.currentTime,
    };

    console.log("ON PAUSE -->>", data);
  };

  const handleEndEvent = (e: any) => {
    const data = {
      ...query,
      type: e.type,
      currentTime: videoRef.current.currentTime,
    };

    console.log("ON ENDED -->>", data);
  };

  useEffect(() => {
    const video = videoRef.current;

    video.play();
  }, [muted]);

  return (
    <>
      <video
        className="native-video"
        ref={videoRef}
        onEnded={handleEndEvent}
        onPause={handlePauseEvent}
        onClick={handleClick}
        playsInline
        onTouchStart={(e) => {
          console.log("onTouchStart() -->>", e);
        }}
        muted={muted}
        controls={false}
        preload="true"
        autoPlay={true}
      >
        <source src={`/${vid}.mp4`} type="video/mp4" />
      </video>
    </>
  );
};

export const getServerSideProps = (ctx) => {
  return {
    props: {
      vid: ctx.params.vid,
      query: ctx.query,
    },
  };
};

export default CustomPlayer;
