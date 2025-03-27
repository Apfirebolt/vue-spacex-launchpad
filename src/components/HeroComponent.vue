<template>
  <div
    class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden"
  >
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
        alt="Background Image"
        class="object-cover object-center w-full h-full"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
      <img class="h-48 w-84" src="../assets/spacex_logo.png" alt="SpaceX Logo" />
      <h1 class="text-5xl font-bold leading-tight mb-4 typewriter">
        {{ displayedTitle }}
      </h1>
      <p class="text-lg text-gray-300 mb-8 typewriter">
        {{ displayedContent }}
      </p>
      <a
        href="#"
        class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >Get Started</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      displayedTitle: '',
      displayedContent: ''
    };
  },
  mounted() {
    this.typewriterEffect(this.title, 'displayedTitle', 100);
    this.typewriterEffect(this.content, 'displayedContent', 50);
  },
  methods: {
    typewriterEffect(text, target, speed) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          this[target] += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }
  }
};
</script>

<style>
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid white;
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  from {
    border-color: transparent;
  }
  to {
    border-color: white;
  }
}
</style>
