import { Vibrant } from "node-vibrant/browser";

// export class Palette {
//   vibrant: string;
//   muted: string;
//   darkvibrant: string;
//   lightvibrant: string;
//   darkmuted: string;

//   constructor(
//     vibrant: string,
//     muted: string,
//     darkvibrant: string,
//     lightvibrant: string,
//     darkmuted: string
//   ) {
//     this.vibrant = vibrant;
//     this.muted = muted;
//     this.darkvibrant = darkvibrant;
//     this.lightvibrant = lightvibrant;
//     this.darkmuted = darkmuted;
//   }
// }

export const extractPalette = async (imageURL: string): Promise<void> => {
  try {
    const palette = await Vibrant.from(imageURL).getPalette();

    document.documentElement.style.setProperty(
      "--vibrant",
      palette.Vibrant?.hex || "#000000"
    );
    document.documentElement.style.setProperty(
      "--muted",
      palette.Muted?.hex || "#3f3f3f"
    );
    document.documentElement.style.setProperty(
      "--darkvibrant",
      palette.DarkVibrant?.hex || "#7f7f7f"
    );
    document.documentElement.style.setProperty(
      "--lightvibrant",
      palette.LightVibrant?.hex || "#7f7f7f"
    );
    document.documentElement.style.setProperty(
      "--darkmuted",
      palette.DarkMuted?.hex || "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--lightmuted",
      palette.LightMuted?.hex || "#ffffff"
    );
  } catch (error) {
    console.error("Error extracting colors:", error);
    throw new Error(String(error));
  }
};
