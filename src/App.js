//
// This example assumes you are importing mux-embed from npm
// View this code on codesandbox: https://codesandbox.io/s/mux-data-dash-js-react-irp99
//
import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";
import ControlBar from "./ControlBar";

import "../public/icomoon.ttf";
import "./styles.css";
import "./controlbar.css";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const src =
    //  "https://d39n744uhkvepr.cloudfront.net/localhost/files/video/out.mpd";
    "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd";
  //  "https://dash.akamaized.net/digitalprimates/fraunhofer/480p_video/heaac_2_0_with_video/Sintel/sintel_480p_heaac2_0.mpd"

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      playerRef.current = dashjs.MediaPlayer().create();

      playerRef.current.initialize(video, src, true);
      playerRef.current.attachView(video);

      const controlbar = new ControlBar(playerRef.current);
      //Player is instance of Dash.js MediaPlayer;
      controlbar.initialize();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div class="dash-video-player ">
      <div class="videoContainer" id="videoContainer">
        <video
          slot="media"
          controls={false}
          ref={videoRef}
          style={{ width: "100%" }}
          preload="auto"
          autoplay="true"
        />
        <div id="videoController" class="video-controller unselectable">
          <div id="playPauseBtn" class="btn-play-pause" title="Play/Pause">
            <span id="iconPlayPause" class="icon-play"></span>
          </div>
          <span id="videoTime" class="time-display">
            00:00:00
          </span>
          <div
            id="fullscreenBtn"
            class="btn-fullscreen control-icon-layout"
            title="Fullscreen"
          >
            <span class="icon-fullscreen-enter"></span>
          </div>
          <div
            id="bitrateListBtn"
            class="control-icon-layout"
            title="Bitrate List"
          >
            <span class="icon-bitrate"></span>
          </div>
          <input
            type="range"
            id="volumebar"
            class="volumebar"
            value="0"
            min="0"
            max="1"
            step=".01"
          />
          <div id="muteBtn" class="btn-mute control-icon-layout" title="Mute">
            <span id="iconMute" class="icon-mute-off"></span>
          </div>
          <div
            id="trackSwitchBtn"
            class="control-icon-layout"
            title="A/V Tracks"
          >
            <span class="icon-tracks"></span>
          </div>
          <div
            id="captionBtn"
            class="btn-caption control-icon-layout"
            title="Closed Caption"
          >
            <span class="icon-caption"></span>
          </div>
          <span id="videoDuration" class="duration-display">
            00:00:00
          </span>
          <div class="seekContainer">
            <div id="seekbar" class="seekbar seekbar-complete">
              <div id="seekbar-buffer" class="seekbar seekbar-buffer"></div>
              <div id="seekbar-play" class="seekbar seekbar-play"></div>
            </div>
          </div>
          <div id="thumbnail-container" class="thumbnail-container">
            <div id="thumbnail-elem" class="thumbnail-elem"></div>
            <div id="thumbnail-time-label" class="thumbnail-time-label"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
