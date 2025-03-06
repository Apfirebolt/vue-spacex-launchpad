<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">
      Payloads
    </h3>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingComponent from '../components/Loader.vue';

export default {
  name: 'PayloadPage',
  components: {
    LoadingComponent,
  },
  data() {
    return {
      payloads: [],
      isLoading: false,
      tableHeaders: ['Payload ID', 'Nationality', 'Manufacturer', 'Payload Type', 'Orbit', 'Payload Mass (KG)'],
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get('https://api.spacexdata.com/v3/payloads');
        if (responseData) {
          this.isLoading = false;
          this.payloads = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
