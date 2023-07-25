import { useRef, useState, useEffect } from "react";
import axios from "axios";

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

  const notifier = async (e: any) => {
    const data = {
      ...query,
      type: e.type,
      currentTime: videoRef.current.currentTime,
      timeStamp: Date.now(),
    };

    try {
      const req = await axios.post(
        process.env.NEXT_PUBLIC_WEBHOOK,
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
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
        onEnded={notifier}
        onPause={notifier}
        onClick={handleClick}
        playsInline
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
