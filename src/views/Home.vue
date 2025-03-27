<template>
  <div>
    <hero-component :title="title" :content="content" />
  </div>
</template>

<script>
import HeroComponent from "../components/HeroComponent.vue";

export default {
  name: "HomePage",
  components: {
    HeroComponent,
  },
  data() {
    return {
      title: "Home",
      content: "Home page of the Vuex Space Launch Program",
    };
  },
};
</script>
