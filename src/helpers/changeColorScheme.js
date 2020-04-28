export default function changeColorScheme({
  name,
  primaryBg,
  highlightBg,
  darkBg,
  lightBg,
  headerBg,
  commonText,
  lightText,
}) {
  document.documentElement.setAttribute(
    'style',
    `--primary-bg:${primaryBg};--highlight-bg:${highlightBg};--dark-bg:${darkBg};--light-bg:${lightBg};--header-bg:${headerBg};--common-text:${commonText};--light-text:${lightText};`,
  );

  sessionStorage.setItem(
    'colorScheme',
    JSON.stringify({
      name,
      primaryBg,
      highlightBg,
      darkBg,
      lightBg,
      headerBg,
      commonText,
      lightText,
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
    lightBg: '#e3ffe7',
    headerBg: '#bbfac396',
    commonText: '#137a21',
    lightText: '#e9ffec',
  },
  dark: {
    name: 'dark',
    primaryBg: '#00695C',
    highlightBg: '#00897b',
    darkBg: '#009688',
    lightBg: '#004D40',
    headerBg: '#00968896',
    commonText: '#8bbb91',
    lightText: '#8bbb91',
  },
};
export { themes };
