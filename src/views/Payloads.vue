<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <hero-component :title="title" :content="content" />
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
import HeroComponent from '../components/HeroComponent.vue';

export default {
  name: 'PayloadPage',
  components: {
    LoadingComponent,
    HeroComponent,
  },
  data() {
    return {
      payloads: [],
      isLoading: false,
      title: "Payloads",
      content: "List of all the payloads by SpaceX",
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
