<template>
  <div>
    <hero-component :title="title" :content="content" />
  </div>
</template>

<script>
import HeroComponent from "../components/HeroComponent.vue";

export default {
  name: "AboutPage",
  components: {
    HeroComponent,
  },
  data() {
    return {
      title: "About",
      content: "About the Vuex Space Launch Program",
    };
  },
};
</script>
