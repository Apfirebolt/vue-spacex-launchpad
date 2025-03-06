<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">Ships</h3>
    <div class="columns-1 md:columns-3 gap-4">
      <div
      v-for="ship in ships"
      :key="ship.ship_id"
      class="break-inside-avoid rounded overflow-hidden shadow-lg my-4 group"
      >
      <img v-if="ship.image" class="w-full" :src="ship.image" :alt="ship.ship_name" />
      <p v-else class="text-center text-xl my-2 bg-gray-300 text-gray-500 py-2">No Image Available</p>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ ship.ship_name }}</div>
        <div class="text-gray-700 text-base">
        <strong>Type:</strong> {{ ship.ship_type }}<br />
        <strong>Roles:</strong> {{ ship.roles | filterRoles }}<br />
        <strong>Active:</strong> {{ ship.active ? "Yes" : "No" }}<br />
        <div class="show-more hidden group-hover:block">
          <strong>Year Built:</strong> {{ ship.year_built }}<br />
          <strong>Home Port:</strong> {{ ship.home_port }}<br />
          <strong>Missions:</strong>
          <ul>
          <li v-for="mission in ship.missions" :key="mission.name">
            {{ mission.name }} (Flight: {{ mission.flight }})
          </li>
          </ul>
        </div>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <a
        :href="ship.url"
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

export default {
  name: "ShipPage",
  components: {
    LoadingComponent,
  },
  filters: {
    filterRoles(value) {
      let res = "";
      value.forEach((item) => {
        res = `${res + item},`;
      });
      return res;
    },
  },
  data() {
    return {
      ships: [],
      isLoading: false,
      tableHeaders: ["Mission Name", "Flight Name"],
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get("https://api.spacexdata.com/v3/ships");
        if (responseData) {
          this.isLoading = false;
          this.ships = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
