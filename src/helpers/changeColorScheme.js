export default function changeColorScheme({
  primaryBg,
  highlightBg,
  darkBg,
  lightBg,
  headerBg,
  commonText,
  lightText,
}) {
  console.log(primaryBg);
  document.documentElement.setAttribute(
    'style',
    `--primary-bg:${primaryBg};--highlight-bg:${highlightBg};--dark-bg:${darkBg};--light-bg:${lightBg};--header-bg:${headerBg};--common-text:${commonText};--light-text:${lightText};`,
  );

  sessionStorage.setItem(
    'colorScheme',
    JSON.stringify({
      primaryBg,
      highlightBg,
      darkBg,
      lightBg,
      headerBg,
      commonText,
      lightText,
    }),
  );
}

const themes = {
  light: {
    primaryBg: '#a5dfae',
    highlightBg: '#6dd37b',
    darkBg: '#57b163',
    lightBg: '#e3ffe7',
    headerBg: '#bbfac396',
    commonText: '#137a21',
    lightText: '#e9ffec',
  },
  dark: {
    primaryBg: '#163819',
    highlightBg: '#123a15',
    darkBg: '#1f5326',
    lightBg: '#1f5326',
    headerBg: '#2e723796',
    commonText: '#8bbb91',
    lightText: '#8bbb91',
  },
};
export { themes };
