import {
  IPlayerState,
  PlayerAction,
  PlayerActionTypes,
} from "interfaces/player.interface";

const initialState: IPlayerState = {
  activeTrack: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerReducer = (
  state = initialState,
  action: PlayerAction
): IPlayerState => {
  switch (action.type) {
    case PlayerActionTypes.PAUSE:
      return { ...state, pause: true };
    case PlayerActionTypes.PLAY:
      return { ...state, pause: false };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_ACTIVE_TRACK:
      return { ...state, activeTrack: action.payload, duration: 0, currentTime: 0 };

    default:
      return state;
  }
};
