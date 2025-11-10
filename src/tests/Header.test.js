import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import Header from '../components/HeaderComponent.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
    { path: '/dragons', component: { template: '<div>Dragons</div>' } },
  ],
});

describe('Header Component', () => {
  let wrapper;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    await router.push('/');
    await router.isReady();

    wrapper = mount(Header, {
      global: {
        plugins: [router],
        stubs: {
          Disclosure: false,
          DisclosureButton: false,
          DisclosurePanel: false,
        },
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays SpaceX logo and title', () => {
    expect(wrapper.find('img').attributes('alt')).toBe('SpaceX Logo');
    expect(wrapper.text()).toContain('SpaceX');
  });

  it('renders all navigation links', () => {
    const links = wrapper.findAllComponents({ name: 'RouterLink' });
    expect(links.length).toBeGreaterThanOrEqual(9);
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('Dragons');
  });

  it('toggles dark mode on button click', async () => {
    const darkModeButton = wrapper.find('button');
    expect(darkModeButton.text()).toContain('Dark Mode');

    await darkModeButton.trigger('click');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
  });

  it('loads dark mode preference from localStorage', async () => {
    localStorage.setItem('darkMode', 'true');

    wrapper = mount(Header, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.$nextTick();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('updates isScrolledDown when scrolling', async () => {
    expect(wrapper.vm.isScrolledDown).toBe(false);

    window.scrollY = 150;
    window.dispatchEvent(new Event('scroll'));

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isScrolledDown).toBe(true);
  });

  it('applies correct classes when scrolled down', async () => {
    wrapper.vm.isScrolledDown = true;
    await wrapper.vm.$nextTick();

    const nav = wrapper.find('nav');
    expect(nav.classes()).toContain('bg-primary-300');
  });

  it('shows mobile menu button on small screens', () => {
    const menuButton = wrapper.findComponent({ name: 'DisclosureButton' });
    expect(menuButton.exists()).toBe(true);
  });

  it('toggles between light and dark mode button text', async () => {
    const button = wrapper.find('button');
    expect(button.text()).toContain('Dark Mode');

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(button.text()).toContain('Light Mode');
  });
});
