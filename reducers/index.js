import HomeReducer from "./HomeReducer";
import UiReducer from "./UiReducer";
const rootReducer = {
  home: HomeReducer.reducer,
  ui: UiReducer.reducer,
};

export default rootReducer;
