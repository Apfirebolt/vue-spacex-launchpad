<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">
      Capsules
    </h3>

    {{ capsules }}
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import LoadingComponent from '../components/Loader.vue';

export default {
  name: 'CapsulePage',
  components: {
    LoadingComponent,
  },
  filters: {
    filterLaunchDate(value) {
      return dayjs(value).format('DD/MM/YYYY');
    },
  },
  data() {
    return {
      capsules: [],
      isLoading: false,
      tableHeaders: ['Capsule ID', 'Status', 'Details', 'Original Launch'],
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get('https://api.spacexdata.com/v3/capsules');
        if (responseData) {
          this.isLoading = false;
          this.capsules = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
