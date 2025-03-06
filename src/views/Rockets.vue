<template>
  <loading-component v-if="isLoading" />
  <div v-else>
    <hero-component :title="title" :content="content" />
    <div class="columns-1 md:columns-3 gap-4">
      <div
      v-for="rocket in rockets"
      :key="rocket.rocket_id"
      class="break-inside-avoid rounded overflow-hidden shadow-lg my-4 group"
      >
      <img v-if="rocket.flickr_images.length" class="w-full" :src="rocket.flickr_images[0]" :alt="rocket.rocket_name" />
      <p v-else class="text-center text-xl my-2 bg-gray-300 text-gray-500 py-2">No Image Available</p>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ rocket.rocket_name }}</div>
        <div class="text-gray-700 text-base">
        <strong>Type:</strong> {{ rocket.rocket_type }}<br />
        <strong>First Flight:</strong> {{ rocket.first_flight }}<br />
        <strong>Active:</strong> {{ rocket.active ? "Yes" : "No" }}<br />
        <div class="show-more hidden group-hover:block">
          <strong>Stages:</strong> {{ rocket.stages }}<br />
          <strong>Boosters:</strong> {{ rocket.boosters }}<br />
          <strong>Cost per Launch:</strong> ${{ rocket.cost_per_launch.toLocaleString() }}<br />
          <strong>Success Rate:</strong> {{ rocket.success_rate_pct }}%<br />
        </div>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <a
        :href="rocket.wikipedia"
        target="_blank"
        class="bg-blue-500 my-3 block hover:bg-blue-700 text-center mx-auto w-1/2 text-white font-bold py-2 px-4 rounded"
        >
        More Info
        </a>
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
        const responseData = await axios.get("https://api.spacexdata.com/v3/rockets");
        if (responseData) {
          this.isLoading = false;
          this.rockets = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
