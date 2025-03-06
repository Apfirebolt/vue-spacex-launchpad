<template>
  <loading-component v-if="isLoading" />
  <div v-else>
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">Dragons</h3>
    <div
      v-for="dragon in dragons"
      :key="dragon.id"
      class="bg-primary-100 p-4 rounded-lg shadow-md my-4"
    >
      <h4 class="text-secondary-200 text-xl font-bold">{{ dragon.name }}</h4>
      <p class="text-gray-700">{{ dragon.description }}</p>
      <ul class="list-disc list-inside my-2">
        <li><strong>Type:</strong> {{ dragon.type }}</li>
        <li><strong>Active:</strong> {{ dragon.active }}</li>
        <li><strong>Crew Capacity:</strong> {{ dragon.crew_capacity }}</li>
        <li><strong>First Flight:</strong> {{ dragon.first_flight }}</li>
        <li>
          <strong>Wikipedia:</strong>
          <a :href="dragon.wikipedia" target="_blank" class="text-blue-500">Link</a>
        </li>
      </ul>
      <div class="columns-1 sm:columns-2 md:columns-3 gap-4">
        <div v-for="image in dragon.flickr_images" :key="image" class="break-inside-avoid p-1">
          <img :src="image" alt="Dragon Image" class="rounded-lg shadow-md w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "../components/Loader.vue";

export default {
  name: "DragonPage",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      dragons: [],
      isLoading: false,
      tableHeaders: ["Mission Name", "Mission ID", "Wikipedia", "Manufacturers"],
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get("https://api.spacexdata.com/v3/dragons");
        if (responseData) {
          this.isLoading = false;
          this.dragons = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
