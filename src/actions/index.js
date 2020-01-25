import streamApi from '../api/streams';
import history from '../history'
import _ from 'lodash';

import {
  SIGN_IN, SIGN_OUT,
  CREATE_STREAM, EDIT_STREAM, DELETE_STREAM,
  FETCH_STREAM, FETCH_STREAMS
} from './types';

export function signIn(userId) {
  return {
    type: SIGN_IN,
    payload: { userId }
  }
}

export function signOut(userId) {
  return {
    type: SIGN_OUT,
    payload: { userId }
  }
}

export function createStream(values) {
    return async dispatch => {
      const resp = await streamApi.post('/streams', values);
      dispatch({
        type: CREATE_STREAM,
        payload: resp.data
      });
      history.push('/')
    }
}

export function fetchStreams() {
    return async dispatch => {
      const resp = await streamApi.get('/streams');
      dispatch({
        type: FETCH_STREAMS,
        payload: resp.data
      })
    }
}

export function fetchStream(id) {
    return async dispatch => {
      const resp = await streamApi.get(`/streams/${id}`);
      dispatch({
        type: FETCH_STREAM,
        payload: resp.data
      })
    }
}

export function editStream(id, values) {
    return async dispatch => {
      const resp = await streamApi.patch(`/streams/${id}`, _.pick(values, 'title', 'desc'));
      dispatch({
        type: EDIT_STREAM,
        payload: resp.data
      })
      history.push('/')
    }
}

export function deleteStream(id) {
    return async dispatch => {
      await streamApi.delete(`/streams/${id}`);
      dispatch({
        type: DELETE_STREAM,
        payload: id
      });
      history.goBack('/');
    }
}
