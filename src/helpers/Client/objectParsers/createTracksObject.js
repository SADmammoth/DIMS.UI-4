export default function createTracksObject({ taskName, memberTaskId, trackDate, trackNote }) {
  return { taskName, memberTaskId, trackNote, trackDate: new Date(trackDate) };
}
