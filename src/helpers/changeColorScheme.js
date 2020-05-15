export default function changeColorScheme({
  name,
  primaryBg,
  highlightBg,
  cardBg,
  darkBg,
  lightBg,
  headerBg,
  commonText,
  lightText,
  mutedText,
}) {
  document.documentElement.setAttribute(
    'style',
    `--primary-bg:${primaryBg};--highlight-bg:${highlightBg};--card-bg:${cardBg};--dark-bg:${darkBg};--light-bg:${lightBg};--header-bg:${headerBg};--common-text:${commonText};--light-text:${lightText};--muted-text:${mutedText};`,
  );

  sessionStorage.setItem(
    'colorScheme',
    JSON.stringify({
      name,
      primaryBg,
      highlightBg,
      cardBg,
      darkBg,
      lightBg,
      headerBg,
      commonText,
      lightText,
      mutedText,
    }),
  );
  changeColorScheme.currentTheme = name;
}

const themes = {
  light: {
    name: 'light',
    primaryBg: '#a5dfae',
    highlightBg: '#6dd37b',
    darkBg: '#57b163',
    cardBg: '#ffffff',
    lightBg: '#fafffb',
    headerBg: '#bbfac396',
    commonText: '#137a21',
    lightText: '#e9ffec',
    mutedText: '#137a2196',
  },
  dark: {
    name: 'dark',
    primaryBg: '#00cfac23',
    highlightBg: '#00cfac54',
    darkBg: '#3fd99c43',
    cardBg: '#2d3b34',
    lightBg: '#282b2a',
    headerBg: '#00cfac14',
    commonText: '#1fab74',
    lightText: '#3fd99c94',
    mutedText: '#3fd99c54',
  },
};
export { themes };
