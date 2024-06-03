import Vue from 'vue';
import VueTailwind from 'vue-tailwind/dist/full';
import VueTailwindSettings from './plugins/vue-tailwind';
import './assets/tailwind.css';
import store from './store/store';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueTailwind, VueTailwindSettings);
Vue.prototype.$toast = {
  show: (message) => {
    Vue.prototype.$bus.emit('add_toast', message);
  },
};
Vue.prototype.$loading = {
  show: () => {
    Vue.prototype.$bus.emit('show_loading');
  },
  hide: () => {
    Vue.prototype.$bus.emit('hide_loading');
  },
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
