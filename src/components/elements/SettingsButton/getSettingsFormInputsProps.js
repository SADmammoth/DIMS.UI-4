export default function getSettingsFormInputsProps({ currentTheme, themeOnChange }) {
  return [
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      valueOptions: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      value: currentTheme,
      onChange: themeOnChange,
    },
  ];
}
