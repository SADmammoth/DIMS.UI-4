import React from 'react';
import changeColorScheme from './helpers/changeColorScheme';

export default function ThemePreloader({ children }) {
  const colorSchema = JSON.parse(sessionStorage.getItem('colorScheme'));
  if (colorSchema) {
    changeColorScheme(colorSchema);
  }
  return <>{children}</>;
}
