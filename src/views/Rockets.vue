<template>
  <!-- Using the custom named slot '#rocket' -->
  <loading-component v-if="isLoading">
    <template #rocket>
      <p class="text-blue-600 font-semibold">Fetching SpaceX rockets from the API...</p>
    </template>
  </loading-component>

  <div v-else>
    <hero-component :title="title" :content="content" />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="rocket in rockets"
        :key="rocket.name"
        class="rounded-lg overflow-hidden shadow-lg my-4 bg-white p-6 flex flex-col justify-between"
      >
        <div>
          <!-- Rocket Name & Family Badge -->
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-bold text-2xl text-gray-800">{{ rocket.name }}</h3>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {{ rocket.family }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
            {{ rocket.description }}
          </p>

          <!-- Specifications List -->
          <div class="text-gray-700 text-sm space-y-1 border-t pt-3">
            <p><strong>Maiden Flight:</strong> {{ rocket.maiden_flight }}</p>
            <p><strong>Reusable:</strong> {{ rocket.reusable ? "Yes" : "No" }}</p>
            <p><strong>Total Launches:</strong> {{ rocket.launch_count }}</p>
            <p><strong>Successful Launches:</strong> {{ rocket.successful_launches }}</p>
            <p><strong>Failed Launches:</strong> {{ rocket.failed_launches }}</p>
            <p><strong>Success Rate:</strong> {{ rocket.success_rate_pct }}%</p>
            <p><strong>Launch Cost:</strong> ${{ rocket.launch_cost_usd?.toLocaleString() || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "../components/Loader.vue";
import HeroComponent from "../components/HeroComponent.vue";

export default {
  name: "RocketPage",
  components: {
    LoadingComponent,
    HeroComponent,
  },
  data() {
    return {
      rockets: [],
      isLoading: false,
      title: "Rockets",
      content: "List of all the rockets by SpaceX",
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const response = await axios.get("https://gateway.pipeworx.io/spacex/v4/rockets");
        this.rockets = response.data;
      } catch (err) {
        console.error("Error fetching rocket data:", err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
