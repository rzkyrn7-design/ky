import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HelloWorld"
      component={HelloWorld}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

// Buat jaga-jaga kalau ada file lain yang manggil Root
export const Root = RemotionRoot;
