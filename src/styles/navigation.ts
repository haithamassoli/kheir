import Colors from "./colors";
import { fontConfig } from "./material";

export const LightNavigationColors = {
  colors: {
    background: Colors.lightBackground,
    border: Colors.lightBackground,
    card: Colors.lightBackground,
    notification: "rgb(255, 69, 58)",
    primary: Colors.primary,
    text: Colors.darkText,
  },
  dark: false,
  fonts: fontConfig,
};

export const DarkNavigationColors = {
  colors: {
    background: Colors.darkBackground,
    border: Colors.darkBackground,
    card: Colors.darkBackground,
    notification: "rgb(255, 69, 58)",
    primary: Colors.primary,
    text: Colors.lightText,
  },
  fonts: fontConfig,
  dark: true,
};
