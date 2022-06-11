import { CODEX_RESULT, CODEX_ERROR } from './types';
import axios from 'axios';

// Execute code
export const execCode = (langid, code, input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ langid, code, input });
  try {
    const res = await axios.post('/api/posts/codex', body, config);
    dispatch({
      type: CODEX_RESULT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CODEX_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
