import changeColorScheme, { themes } from './changeColorScheme';

export default function preloadTheme() {
  const colorSchema = JSON.parse(sessionStorage.getItem('colorScheme'));

  if (colorSchema) {
    changeColorScheme(colorSchema);
  } else {
    changeColorScheme(themes.light);
  }
}
