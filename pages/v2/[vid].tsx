import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Vimeo from "@u-wave/react-vimeo";
// import Vimeo from "react-vimeo";
import ReactPlayer from "react-player/lazy";

// import { default as _ReactPlayer } from "react-player";
// import { ReactPlayerProps } from "react-player/types/lib";
// const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const SingleVideoPage = ({ vid }) => {
  const [loaded, setLoaded] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const playPauseTrigger = useRef<HTMLInputElement>(null);

  const handlePlay = () => {
    // setMuted(false);
  };

  const handlePause = async (e: void) => {
    // e.type = "onPause";

    try {
      const req = await axios.post(
        process.env.NEXT_PUBLIC_WEBHOOK,
        JSON.stringify({ type: "onPause", data: e })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReady = (e: any) => {
    setPlaying(true);
    playPauseTrigger.current.click();
  };

  const handleEnd = async (e: void) => {
    try {
      const req = await axios.post(
        process.env.NEXT_PUBLIC_WEBHOOK,
        JSON.stringify({ type: "onEnd", data: e })
      );
    } catch (error) {
      console.log("error", new Error(error));
    }
  };

  useEffect(() => {
    setLoaded(true);
    playPauseTrigger.current.click();
  }, []);

  // /6ea8f459-d197aca4.mp4

  return (
    <>
      {loaded ? (
        <video>
          <source src="/6ea8f459-d197aca4.mp4" />
        </video>
      ) : (
        // <Vimeo
        //   video={vid}
        //   // videoId={vid}
        //   width="100%"
        //   height="100vh"
        //   controls={false}
        //   playsInline
        //   autoplay
        //   responsive
        // />
        "Cargando contenido..."
      )}

      <div
        ref={playPauseTrigger}
        className="play-pause-custom"
        onClick={() => {
          setMuted(true);
          setPlaying(!playing);
        }}
      ></div>
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

export default SingleVideoPage;
