import { useState, useEffect } from "react";
import axios from "axios";
// import Vimeo from "@u-wave/react-vimeo";
// import Vimeo from "react-vimeo";
// import ReactPlayer from "react-player/vimeo";

import { default as _ReactPlayer } from "react-player";
import { ReactPlayerProps } from "react-player/types/lib";
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const SingleVideoPage = ({ vid }) => {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const eventHandler = async (e: any, type: string) => {
    e.type = type;

    // try {
    //   const req = await axios.post(
    //     process.env.NEXT_PUBLIC_WEBHOOK,
    //     JSON.stringify(e)
    //   );

    //   return;
    // } catch (error) {
    //   console.log("error", new Error(error));
    // }
  };

  useEffect(() => {
    setLoaded(true);
    setPlaying(true);
  }, [playing]);
  return (
    <>
      {/* <button id="doplay">INICIAR / PAUSAR</button> */}
      {loaded ? (
        <ReactPlayer
          url={`https://player.vimeo.com/video/${vid}`}
          width="100vw"
          height="100vh"
          controls={false}
          playing={playing}
        />
      ) : (
        "cargando"
      )}

      <button onClick={() => setPlaying(!playing)}>Play/Pause</button>
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
