<template>
  <loading-component v-if="isLoading" />
  <div v-else>
    <hero-component :title="title" :content="content" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="capsule in capsules" :key="capsule.capsule_serial" class="card p-4 border rounded shadow">
      <h4 class="text-xl font-bold">{{ capsule.capsule_id }}</h4>
      <p><strong>Status:</strong> {{ capsule.status }}</p>
      <p><strong>Details:</strong> {{ capsule.details }}</p>
      <p><strong>Original Launch:</strong> {{ capsule.original_launch }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import LoadingComponent from '../components/Loader.vue';
import HeroComponent from '../components/HeroComponent.vue';

export default {
  name: 'CapsulePage',
  components: {
    LoadingComponent,
    HeroComponent,
  },
  data() {
    return {
      capsules: [],
      isLoading: false,
      title: 'Capsules',
      content: 'List of all the capsules by SpaceX',
    };
  },
  mounted() {
    this.getApiData();
  },
  methods: {
    async getApiData() {
      this.isLoading = true;
      try {
        const responseData = await axios.get('https://api.spacexdata.com/v3/capsules');
        if (responseData) {
          this.isLoading = false;
          this.capsules = responseData.data;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>
