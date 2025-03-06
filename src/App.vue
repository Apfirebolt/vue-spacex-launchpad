<template>
  <div class="bg-secondary-300">
    <HeaderComponent />
    <main class="mt-24">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
</script>
