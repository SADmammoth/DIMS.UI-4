export default function dipatchAndFetch(store, action, request = (state) => {}) {
  store.dispatch(action);
  request(store.getState());
}
