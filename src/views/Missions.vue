<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">Missions</h3>
    <div class="columns-1 md:columns-3 gap-4 text-secondary-300">
      <div
        v-for="mission in missions"
        :key="mission.mission_id"
        class="break-inside-avoid card bg-primary-200 p-4 my-3"
      >
        <h4 class="text-xl font-bold">{{ mission.mission_name }}</h4>
        <p><strong>Mission ID:</strong> {{ mission.mission_id }}</p>
        <p><strong>Manufacturers:</strong> {{ mission.manufacturers.join(", ") }}</p>
        <p><strong>Payload IDs:</strong> {{ mission.payload_ids.join(", ") }}</p>
        <p>
          <strong>Description:</strong>
          {{ mission.description }}
        </p>
        <a :href="mission.wikipedia" target="_blank" class="text-blue-500">More Info</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "../components/Loader.vue";

export default {
  name: "MissionPage",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      missions: [],
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
        const responseData = await axios.get("https://api.spacexdata.com/v3/missions");
        if (responseData) {
          this.isLoading = false;
          this.missions = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
