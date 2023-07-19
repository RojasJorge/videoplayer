import Vimeo from "@u-wave/react-vimeo";

const TryVimeo = () => {
  const onEnd = async (data) => {
    await fetch("https://webhook.site/ad4e8c43-f29b-4804-bba8-e811288f9df8", {
      method: "POST",
      body: JSON.stringify(data),
    });
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
