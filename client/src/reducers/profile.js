import { CLEAR_PROFILE, GET_PROFILE, OTHER_USER, PROFILE_ERROR } from '../actions/types';

const initialState = {
  profile: null,
  other_user: null,
  profiles: [],
  loading: true,
  error: {}
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case OTHER_USER:
      return {
        ...state,
        other_user: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
};

export default profile;
