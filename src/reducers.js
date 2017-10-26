import { combineReducers } from "redux";

function bio(state, action) {
  switch (action.type) {
    default:
      if (!state) {
        return bio.defaultState;
      }
      return state;
  }
}
bio.defaultState = {
  firstName: "Olivier",
  surname: "Philippon",
  jobTitle: "Web developer"
};

const cvApp = combineReducers({
  bio
});

export default cvApp;
