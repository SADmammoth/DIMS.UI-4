import React from 'react';
import changeColorScheme, { themes } from './helpers/changeColorScheme';

export default function ThemePreloader({ children }) {
  const colorSchema = JSON.parse(sessionStorage.getItem('colorScheme'));
  if (colorSchema) {
    changeColorScheme(colorSchema);
  } else {
    changeColorScheme(themes.light);
  }
  return <>{children}</>;
}
