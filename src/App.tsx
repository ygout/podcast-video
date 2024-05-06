import { Player } from "@remotion/player";
import { AudioComposition } from "../remotion/AudioComposition";
import "./App.css";
import AudioFileUpload from "./AudioFileUpload";
import { useState } from "react";

function App() {
  const [audioUrl, setAudioUrl] = useState<string>("");

  const [durationInFrames, setDurationInFrames] = useState<number>(120);

  const handleStateChange = (audioUrl: string, duration: number) => {
    console.log("duration", duration);
    setAudioUrl(audioUrl);
    setDurationInFrames(duration * 30);
  };

  return (
    <section className="container">
      <h1 style={{ color: "white" }}>
        Génération video podcast <br /> La Petite Histoire Criminelle
      </h1>
      <AudioFileUpload onAudioFileUpload={handleStateChange} />
      <Player
        component={AudioComposition}
        inputProps={{
          audioUrl: audioUrl,
        }}
        durationInFrames={durationInFrames}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: 1280,
          height: 720,
        }}
        controls
      />
    </section>
  );
}

export default App;
