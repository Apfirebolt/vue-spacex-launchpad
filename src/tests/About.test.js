import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutPage from '../views/About.vue';
import HeroComponent from '../components/HeroComponent.vue';

describe('AboutPage', () => {
  it('renders the component', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains HeroComponent', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.findComponent(HeroComponent).exists()).toBe(true);
  });

  it('passes correct title prop to HeroComponent', () => {
    const wrapper = mount(AboutPage);
    const heroComponent = wrapper.findComponent(HeroComponent);
    expect(heroComponent.props('title')).toBe('About');
  });

  it('passes correct content prop to HeroComponent', () => {
    const wrapper = mount(AboutPage);
    const heroComponent = wrapper.findComponent(HeroComponent);
    expect(heroComponent.props('content')).toBe('About the Vuex Space Launch Program');
  });

  it('has correct component name', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.vm.$options.name).toBe('AboutPage');
  });

  it('initializes with correct data', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.vm.title).toBe('About');
    expect(wrapper.vm.content).toBe('About the Vuex Space Launch Program');
  });
});
