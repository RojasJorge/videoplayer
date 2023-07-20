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

  const playPauseTrigger = useRef<HTMLInputElement>(null);

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
    console.log("IS READY", e, playPauseTrigger);
    setPlaying(true);
    playPauseTrigger.current.click();
  };

  const eventHandler = async (e: any) => {
    // e.type = type;

    console.log("the type is-->>", e);

    // try {
    //   const req = await axios.post(
    //     process.env.NEXT_PUBLIC_WEBHOOK,
    //     JSON.stringify(e)
    //   );
    // } catch (error) {
    //   console.log("error", new Error(error));
    // {
  };

  useEffect(() => {
    setLoaded(true);
    playPauseTrigger.current.click();
  }, []);

  return (
    <>
      {/* <button id="doplay">INICIAR / PAUSAR</button> */}
      {loaded ? (
        <ReactPlayer
          url={`https://player.vimeo.com/video/${vid}`}
          width="100vw"
          height="100vh"
          playing={playing}
          onPause={handlePause}
          onReady={handleReady}
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
          console.log("clicked!!!");
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
