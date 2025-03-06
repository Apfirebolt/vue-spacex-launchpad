<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">
      Ships
    </h3>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingComponent from '../components/Loader.vue';

export default {
  name: 'ShipPage',
  components: {
    LoadingComponent,
  },
  filters: {
    filterRoles(value) {
      let res = '';
      value.forEach((item) => {
        res = `${res + item},`;
      });
      return res;
    },
  },
  data() {
    return {
      ships: [],
      isLoading: false,
      tableHeaders: ['Mission Name', 'Flight Name'],
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get('https://api.spacexdata.com/v3/ships');
        if (responseData) {
          this.isLoading = false;
          this.ships = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
