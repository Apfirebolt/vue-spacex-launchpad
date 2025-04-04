<template>
  <Disclosure :class="['border-b-4 border-b-orange-500 lg:py-2 fixed top-0 z-20 w-full transition-all duration-300', isScrolledDown ? 'bg-primary-300 dark:bg-slate-800' : 'bg-primary-200 dark:bg-slate-700 dark:text-white']" as="nav" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        <div class="flex items-center w-full justify-between">
          <div class="justify-between flex items-center">
            <img class="h-8" :src="Logo" alt="SpaceX Logo" />
            <h2 class="text-2xl text-white font-bold">SpaceX</h2>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->

              <router-link
                v-for="link in links"
                :key="link.name"
                :to="link.href"
                class="text-gray-300 hover:bg-primary-100 transition-all duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ link.name }}
              </router-link>
              <button @click="toggleDarkMode" class="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
              </button>
            </div>
          </div>
        </div>

        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="text-gray-300 hover:bg-primary-100 transition-all duration-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ link.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Logo from '../assets/spacex_logo.png';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const isDarkMode = ref(false);
const isScrolledDown = ref(false);
const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Dragons', href: '/dragons' },
  { name: 'Capsules', href: '/capsules' },
  { name: 'Launches', href: '/launches' },
  { name: 'Missions', href: '/missions' },
  { name: 'Payloads', href: '/payloads' },
  { name: 'Rockets', href: '/rockets' },
  { name: 'Ships', href: '/ships' },
];

const setDarkMode = (value) => {
  isDarkMode.value = value;
  if (value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('darkMode', value);
};

const checkScroll = () => {
  if (window.scrollY > 100) {
    isScrolledDown.value = true;
  } else {
    isScrolledDown.value = false;
  }
};

window.addEventListener('scroll', checkScroll);

onMounted(() => {
  checkScroll();
});

const toggleDarkMode = () => {
  setDarkMode(!isDarkMode.value);
};

watch(isDarkMode, (newValue) => {
  setDarkMode(newValue);
});

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode !== null) {
    setDarkMode(savedDarkMode === 'true');
  } else {
    setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  checkScroll();
});
</script>
