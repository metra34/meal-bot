import {
  DEFAULT_THEME,
  createTheme,
  mergeMantineTheme,
  type MantineColorsTuple,
} from "@mantine/core";

const green: MantineColorsTuple = [
  "#e2fff1",
  "#cffce6",
  "#a2f6cc",
  "#72f0b1",
  "#4aeb9a",
  "#39e991",
  "#1be783",
  "#03cd70",
  "#00b662",
  "#009e51",
];

const themeOverride = createTheme({ colors: { green } });
// TODO: this is only needed if access to theme outside of components is needed
const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export default theme;
