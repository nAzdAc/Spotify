import { IPlayerState } from "interfaces/player.interface";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { playerReducer } from "./playerReducers";
import { trackReducer } from "./trackReducers";

const rootReducer = combineReducers({
  player: playerReducer,
  tracks: trackReducer,
});

export const reducer = (
  state: ReturnType<typeof rootReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
