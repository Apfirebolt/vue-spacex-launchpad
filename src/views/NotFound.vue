<template>
  <div v-once class="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
    <div class="text-center max-w-md space-y-4">
      <!-- Error Code Badge -->
      <span class="bg-red-100 text-red-700 text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full">
        Error 404
      </span>

      <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
        Page Not Found
      </h1>

      <p class="text-base text-gray-600">
        The page you are looking for does not exist or has been moved. Please check the URL or click below to head back home.
      </p>

      <div class="pt-4">
        <router-link
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
        >
          Back to Homepage
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundPage',
});
</script>
