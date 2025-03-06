<template>
  <loading-component v-if="isLoading" />
  <div v-else class="p-4 my-3">
    <h3 class="text-blue-500 text-2xl text-center my-3 font-semibold">
      Dragons
    </h3>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingComponent from '../components/common/Loader.vue';

export default {
  name: 'DragonPage',
  components: {
    LoadingComponent,
  },
  data() {
    return {
      dragons: [],
      isLoading: false,
      tableHeaders: ['Mission Name', 'Mission ID', 'Wikipedia', 'Manufacturers'],
    };
  },
  mounted() {
    // // this.getApiData();
    // // this.allDragonsAction();
    // this.$store.dispatch(dragonTypes.GET_ALL_DRAGONS_ACTION);
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get('https://api.spacexdata.com/v3/dragons');
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
