import axios from 'axios';
import * as types from './dragon-types';

const state = {
  dragons: [],
};

const getters = {
  [types.GET_ALL_DRAGONS]: (state) => state.dragons,
};

const mutations = {
  [types.SET_ALL_DRAGONS]: (state, payload) => {
    console.log('Setting dragons...', payload)
    state.dragons = payload;
  },
};

const actions = {

  // Get all DRAGONS
  [types.GET_ALL_DRAGONS_ACTION]: ({ commit }) => {
    const url = 'https://api.spacexdata.com/v3/dragons';
    axios.get(url)
      .then((response) => {
        console.log('Response ', response.data);
        commit(types.SET_ALL_DRAGONS, response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
