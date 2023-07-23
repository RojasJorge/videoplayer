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

  const [playing, setPlaying] = useState(true);
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
    // setPlaying(true);
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

  return (
    <>
      {loaded ? (
        <ReactPlayer
          url={`https://player.vimeo.com/video/${vid}?autoplay=1&controls=0&muted=1&playsinline=0`}
          width="100vw"
          height="100vh"
          playsinline={false}
          background={true}
          playing={playing}
          onPause={handlePause}
          onReady={handleReady}
          onEnded={handleEnd}
          onPlay={handlePlay}
          controls={false}
          muted={muted}
          autoPlay={true}
          allow="autoplay"
          config={{
            file: {
              attributes: {
                playsInline: true,
              },
            },
          }}
        />
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
