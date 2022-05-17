import { GET_PROFILE, PROFILE_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addGeneral =
  ({ status, mobile, address, website }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ status, address, mobile, website });
    try {
      const res = await axios.post('/api/profile', body, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(setAlert('Profile Updated', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status }
      });
    }
  };

export const addSocial =
  (socials) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ socials });

    try {
      const res = await axios.post('/api/profile/socials', body, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(setAlert('Social Media Updated', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status }
      });
    }
  };

export const addSkills =
  ( skills ) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({skills});

    try {
      const res = await axios.post('/api/profile/skills', body, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status }
      });
    }
  };
