import axios from "axios";
import Vimeo from "@u-wave/react-vimeo";

const SingleVideoPage = ({ vid }) => {
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
      <Vimeo
        width={`100%`}
        height={`auto`}
        onPlay={(e) => {
          console.log("opPlay", e);
        }}
        video={vid}
        onEnd={(e) => eventHandler(e, "onEnd")}
        autoplay
        controls={false}
        onPause={(e) => eventHandler(e, "onPause")}
        // keyboard={false}
        showPortrait
        showByline
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
