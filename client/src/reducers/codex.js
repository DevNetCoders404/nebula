import { CODEX_RESULT, CODEX_ERROR} from '../actions/types';

const initialState = {
  loading: true,
  stdout: null,
  stderr: null,
  error: {}
};

const codex = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CODEX_RESULT:
      return {
        ...state,
        stdout: payload.stdout,
        stderr: payload.stderr,
        loading: false
      };
    case CODEX_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default codex;
