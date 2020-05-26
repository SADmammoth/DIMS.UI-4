export default function matchMaxWidth(width) {
  return window.matchMedia(`(max-width: ${width})`).matches;
}
