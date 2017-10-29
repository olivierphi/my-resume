export default function cvApp(state, action) {
  let currentLang;
  if (action.type === "SET_LANG") {
    currentLang = action.newLang;
  } else {
    currentLang = state.currentLang;
  }

  return {
    ...state,
    currentLang,
    currentData: state.dataByLang[currentLang],
    currentI18n: state.i18nByLang[currentLang],
  };
}
