import { useRef, useState, useEffect } from "react";
import axios from "axios";

const CustomPlayer = ({ vid, query }) => {
  /** Video reference */
  const videoRef = useRef<HTMLVideoElement>(null);

  const [muted, setMuted] = useState(true);

  const parseThisTo = (format: string, value: string | number) => {
    switch (format) {
      case "float":
        if (typeof value === "number") {
          return parseFloat(value.toFixed(2));
        }
        break;

      default:
        return value;
        break;
    }
  };

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
    const currentTime = parseThisTo("float", videoRef.current.currentTime);
    const duration = parseThisTo("float", videoRef.current.duration);

    if (e.type === "pause" && currentTime === duration) return false;

    const data = {
      ...query,
      type: e.type,
      currentTime,
      timeStamp: Date.now(),
    };

    try {
      await axios.post(process.env.NEXT_PUBLIC_WEBHOOK, JSON.stringify(data));

      return;
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
        muted={muted}
        controls={false}
        preload="true"
        autoPlay={true}
        playsInline
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
