<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">
      Payloads
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="payload in payloads" :key="payload.payload_id" class="bg-white p-4 rounded shadow">
      <h4 class="text-lg font-bold text-blue-600">{{ payload.payload_id }}</h4>
      <p><strong>Nationality:</strong> {{ payload.nationality }}</p>
      <p><strong>Manufacturer:</strong> {{ payload.manufacturer }}</p>
      <p><strong>Payload Type:</strong> {{ payload.payload_type }}</p>
      <p><strong>Orbit:</strong> {{ payload.orbit }}</p>
      <p><strong>Payload Mass (KG):</strong> {{ payload.payload_mass_kg }}</p>
      </div>
    </div>
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
