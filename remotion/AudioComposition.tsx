import { Audio, AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { audioVideoSchema } from "./schemas";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

export const AudioComposition: React.FC<z.infer<typeof audioVideoSchema>> = ({
  audioUrl,
}) => {
  return (
    <div>
      {!!audioUrl && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
          }}
        >
          <Audio src={audioUrl} />
          <AudioViz
            waveColor="yelllow"
            numberOfSamples={1024}
            freqRangeStartIndex={100}
            waveLinesToDisplay={100}
            mirrorWave={true}
            audioSrc={audioUrl}
          />
        </AbsoluteFill>
      )}
    </div>
  );
};

const AudioViz: React.FC<{
  waveColor: string;
  numberOfSamples: number;
  freqRangeStartIndex: number;
  waveLinesToDisplay: number;
  mirrorWave: boolean;
  audioSrc: string;
}> = ({
  waveColor,
  numberOfSamples,
  freqRangeStartIndex,
  waveLinesToDisplay,
  mirrorWave,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const audioData = useAudioData(audioSrc);

  if (!audioData) {
    return null;
  }

  const frequencyData = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples, // Use more samples to get a nicer visualisation
  });

  // Pick the low values because they look nicer than high values
  // feel free to play around :)
  const frequencyDataSubset = frequencyData.slice(
    freqRangeStartIndex,
    freqRangeStartIndex +
      (mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay)
  );

  const frequenciesToDisplay = mirrorWave
    ? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
    : frequencyDataSubset;

  return (
    <div className="audio-viz">
      {frequenciesToDisplay.map((v, i) => {
        return (
          <div
            key={i}
            className="bar"
            style={{
              minWidth: "1px",
              backgroundColor: waveColor,
              height: `${500 * Math.sqrt(v)}%`,
            }}
          />
        );
      })}
    </div>
  );
};
