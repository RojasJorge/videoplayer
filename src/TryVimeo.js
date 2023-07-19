import Vimeo from "@u-wave/react-vimeo";
import axios from "axios";

const TryVimeo = () => {
  const onEnd = async (data) => {
    try {
      const req = await axios.post(
        "https://webhook.site/ad4e8c43-f29b-4804-bba8-e811288f9df8",
        JSON.stringify(data)
      );

      // const resp = await req.data();

      console.log("response from webhook on end ==>>", req);
      return;
    } catch (error) {
      console.log("error", new Error(error));
    }
  };
  const onPause = async (data) => {
    try {
      const req = await axios.post(
        "https://webhook.site/ad4e8c43-f29b-4804-bba8-e811288f9df8",
        JSON.stringify(data)
      );

      // const resp = await req.data();

      console.log("response from webhook on pause ==>>", req);
      return;
    } catch (error) {
      console.log("error", new Error(error));
    }
  };
  return (
    <>
      <Vimeo
        width={800}
        video="835921493"
        onEnd={onEnd}
        autoplay={true}
        controls={false}
        onPlaybackRateChange={() => console.log("change playback")}
        onPause={onPause}
        // keyboard={false}
        showPortrait
        showByline
      />
    </>
  );
};

export default TryVimeo;
