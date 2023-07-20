import axios from "axios";
// import Vimeo from "@u-wave/react-vimeo";
import Vimeo from "react-vimeo";

const doPlay = () => {
  return <button>INICIAR</button>;
};

const SingleVideoPage = ({ vid }) => {
  // const player = new Vimeo.Player();
  const eventHandler = async (e: any, type: string) => {
    e.type = type;

    console.log("event -->>", e);

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
  return (
    <>
      <button id="doplay">INICIAR / PAUSAR</button>
      <Vimeo
        videoId={vid}
        className="vimeo-wrapper"
        loading={<h3>Cargando video...</h3>}
        autoplay={true}
        playButton="doplay"
        playerOptions={{
          controls: false,
          keyboard: false,
          // onP
        }}
        // onPlay={(e) => {
        //   console.log("opPlay", e);
        // }}
        // onEnd={(e) => eventHandler(e, "onEnd")}
        // autoplay
        // onPause={(e) => eventHandler(e, "onPause")}
        // keyboard={false}
        // onReady={(e) => {
        //   console.log("is ready", e.element);
        // }}
        // showPortrait
        // showByline
      />
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
