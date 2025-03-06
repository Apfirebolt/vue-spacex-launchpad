<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">LAUNCHES</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-secondary-300">
      <div
        v-for="launch in rocketResults"
        :key="launch.flight_number"
        class="card bg-primary-200 p-4 my-3"
      >
        <h4 class="text-xl font-bold">{{ launch.mission_name }}</h4>
        <p><strong>Launch Year:</strong> {{ launch.launch_year }}</p>
        <p><strong>Rocket Name:</strong> {{ launch.rocket.rocket_name }}</p>
        <p><strong>Mission Status:</strong> {{ launch.launch_success ? "Success" : "Failure" }}</p>
        <p><strong>Upcoming:</strong> {{ launch.upcoming ? "Yes" : "No" }}</p>
        <a :href="launch.links.wikipedia" target="_blank" class="text-blue-500">More Info</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LaunchPage",
  components: {},
  data() {
    return {
      launches: [],
      isLoading: false,
      filters: {},
      isSearchFilterOpened: false,
      tableHeaders: ["Mission Name", "Launch Year", "Mission Status", "Rocket Name", "Upcoming"],
    };
  },
  computed: {
    rocketResults() {
      let results = this.launches;
      if (this.filters.name) {
        results = results.filter((item) => item.rocket.rocket_name.match(this.filters.name));
      }
      if (this.filters.status) {
        if (this.filters.status === "Success") {
          results = results.filter((item) => item.launch_success === true);
        } else {
          results = results.filter((item) => item.launch_success === false);
        }
      }
      if (this.filters.upcoming) {
        if (this.filters.upcoming === "Yes") {
          results = results.filter((item) => item.upcoming === true);
        } else {
          results = results.filter((item) => item.upcoming === false);
        }
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
        const responseData = await axios.get("https://api.spacexdata.com/v3/launches");
        if (responseData) {
          this.isLoading = false;
          this.launches = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    getFilteredResults(filters) {
      this.filters = filters;
      this.isSearchFilterOpened = false;
    },
  },
};
</script>
