<template>
  <div class="flex flex-col justify-center items-center h-full px-4 py-6 my-6">
    <!-- Spinner -->
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>

    <!-- Named slot for the loading message/text -->
    <div class="mt-4 text-center">
      <slot name="message">

      </slot>
    </div>

    <div class="mt-4 text-center">
      <slot name="rocket">
      </slot>
    </div>

    <!-- Optional second named slot for extra actions or content -->
    <div v-if="$slots.extra" class="mt-2">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loader',
});
</script>

<style>
.loader {
  border-top-color: #5B85AA;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
