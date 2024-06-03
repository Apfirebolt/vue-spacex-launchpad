import Vue from 'vue';
import Vuex from 'vuex';
import dragon from './modules/dragon/dragon';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dragon,
  },
});

export default store;
