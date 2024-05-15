import { useEffect, useRef } from "react";
import * as MKPlayerSDK from "@mediakind/mkplayer"
import './App.css';

function App() {
  let vContainerRef = useRef(null);
  let player = null;
  const playerConfig = {
    key: "d0167b1c-9767-4287-9ddc-e0fa09d31e02",
    playback: {
      muted: false,
      autoplay: true,
    },
  };

  const sourceConfig = {
    title: "Title for your source",
    description: "Brief description of your source",
    hls: "https://ep-shraminmkmedia-mediakind-video-staging.japaneast.streaming.mediakind.com/1fa048c5-8546-4d11-862b-df7cd7733221/manifest.ism/manifest(format=m3u8-cmaf)",

    dash: "https://ep-shraminmkmedia-mediakind-video-staging.japaneast.streaming.mediakind.com/1fa048c5-8546-4d11-862b-df7cd7733221/manifest.ism/manifest(format=mpd-time-cmaf)"
  };

  useEffect(() => {
    load();
  })


  const load = async () => {
    if (MKPlayerSDK) {
      if (player) {
        await player?.unload?.();
        player = null;
      }

      player = new MKPlayerSDK.MKPlayer(
        vContainerRef.current,
        playerConfig
      );
      player?.load(sourceConfig).then(() => {
        if (!playerConfig.playback.autoplay) {
          player?.play(); // to start playback when autoplay is disabled
          // you can also start playback from sourceloaded event handler!
        }
      });
    } else {
      console.log("::: MKPlayer SDK not initiated yet :::");
    }
  }

  return (
    <div className="container">
      <div
        ref={vContainerRef}
        className="video-container"
        id="video-container"
      ></div>
    </div>
  );
}
export default App;