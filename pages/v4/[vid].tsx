import { useState, useEffect, useRef } from "react";
import Head from "next/head";
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
  const videoRef = useRef();

  const playPauseTrigger = useRef<HTMLInputElement>(null);

  const handlePlay = () => {
    setMuted(false);
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

    // videoRef.current.player;
    // console.log("REACT PLAYER REF -->>", videoRef.current);
    console.log("videoRef -->>", videoRef.current);

    // videoRef.current.actions.toggleFullscreen = () => {
    //   console.log("prevent full screen video");
    // };
    // playPauseTrigger.current.click();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {loaded ? (
        <ReactPlayer
          ref={videoRef}
          url={`https://player.vimeo.com/video/${vid}?autoplay=1&controls=0&muted=1&playsinline=0&noallowfullscreen=1&preload=1`}
          width="100vw"
          height="100vh"
          playsinline={true}
          background={true}
          playing={playing}
          onPause={handlePause}
          onReady={handleReady}
          onEnded={handleEnd}
          onPlay={handlePlay}
          controls={false}
          muted={muted}
          // autoPlay={true}
          allow="autoplay; preload"
          config={{
            file: {
              attributes: {
                playsInline: false,
                disablepictureinpicture: true,
              },
            },
            vimeo: {
              playerOptions: {
                allowFullScreen: false,
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
