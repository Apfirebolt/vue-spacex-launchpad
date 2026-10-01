<template>
  <!-- Using the new named slot in the loader component -->
  <loading-component v-if="isLoading">
    <template #message>
      <p class="text-blue-600 font-semibold">Fetching SpaceX launches...</p>
    </template>
  </loading-component>

  <div v-else>
    <hero-component :title="title" :content="content" />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-secondary-300">
      <div
        v-for="launch in rocketResults"
        :key="launch.flight_number"
        class="card bg-primary-200 p-4 my-3 rounded-lg shadow"
      >
        <h4 class="text-xl font-bold">{{ launch.mission_name }}</h4>
        <p><strong>Launch Year:</strong> {{ launch.launch_year }}</p>
        <p><strong>Rocket Name:</strong> {{ launch.rocket?.rocket_name || 'N/A' }}</p>
        <p><strong>Mission Status:</strong> {{ launch.launch_success ? "Success" : "Failure" }}</p>
        <p><strong>Upcoming:</strong> {{ launch.upcoming ? "Yes" : "No" }}</p>

        <a
          v-if="launch.links?.wikipedia"
          :href="launch.links.wikipedia"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline mt-2 inline-block"
        >
          More Info
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeroComponent from "../components/HeroComponent.vue";
import LoadingComponent from "../components/Loader.vue";

export default {
  name: "LaunchPage",
  components: {
    HeroComponent,
    LoadingComponent,
  },
  data() {
    return {
      launches: [],
      isLoading: false,
      filters: {},
      isSearchFilterOpened: false,
      tableHeaders: ["Mission Name", "Launch Year", "Mission Status", "Rocket Name", "Upcoming"],
      title: "Launches",
      content: "List of all the launches by SpaceX",
    };
  },
  computed: {
    rocketResults() {
      let results = this.launches;

      // Case-insensitive name filter with safe optional chaining
      if (this.filters.name) {
        const query = this.filters.name.toLowerCase();
        results = results.filter((item) =>
          item.rocket?.rocket_name?.toLowerCase().includes(query)
        );
      }

      // Status filter
      if (this.filters.status) {
        const isSuccess = this.filters.status === "Success";
        results = results.filter((item) => item.launch_success === isSuccess);
      }

      // Upcoming filter
      if (this.filters.upcoming) {
        const isUpcoming = this.filters.upcoming === "Yes";
        results = results.filter((item) => item.upcoming === isUpcoming);
      }

      return results;
    },
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const response = await axios.get("https://api.spacexdata.com/v3/launches");
        this.launches = response.data;
      } catch (err) {
        console.error("Error fetching launch data:", err);
      } finally {
        // Ensures loading stops regardless of success or failure
        this.isLoading = false;
      }
    },
    getFilteredResults(filters) {
      this.filters = filters;
      this.isSearchFilterOpened = false;
    },
  },
};
</script>
