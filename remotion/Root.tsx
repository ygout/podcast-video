import { Composition } from "remotion";
import { AudioComposition } from "./AudioComposition";

export const MyVideo = () => {
  return (
    <Composition
      component={AudioComposition}
      durationInFrames={120}
      width={1920}
      height={1080}
      fps={30}
      id="my-comp"
      defaultProps={{ text: "World" }}
    />
  );
};
