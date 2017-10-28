export default function cvApp(state, action) {
  if (action.type === "SET_LANG") {
    state.currentLang = action.newLang;
  }

  return {
    ...state,
    currentData: state.dataByLang[state.currentLang]
  };
}
