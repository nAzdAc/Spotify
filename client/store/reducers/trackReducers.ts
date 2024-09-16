import {
  TrackAction,
  TrackActionTypes,
  TrackState,
} from "interfaces/track.interface";

const initState: TrackState = {
  tracks: [],
  errorMessage: "",
};

export const trackReducer = (
  state = initState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return { errorMessage: "", tracks: action.payload };
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
