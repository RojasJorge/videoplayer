import Vimeo from "@u-wave/react-vimeo";

const TryVimeo = () => {
  const onEnd = (data) => {
    console.log("the video ends event -->> ", data);
  };
  return (
    <>
      <Vimeo
        width={800}
        video="846454381"
        onEnd={onEnd}
        autoplay={true}
        controls={false}
        onPlaybackRateChange={() => console.log("change playback")}
        // keyboard={false}
        showPortrait
        showByline
        
      />
    </>
  );
};

export default TryVimeo;
