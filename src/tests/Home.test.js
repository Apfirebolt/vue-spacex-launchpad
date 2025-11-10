import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomePage from '../views/Home.vue';
import HeroComponent from '../components/HeroComponent.vue';

describe('HomePage', () => {
  it('renders the component', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.exists()).toBe(true);
  });

  it('has the correct name', () => {
    expect(HomePage.name).toBe('HomePage');
  });

  it('renders HeroComponent', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.findComponent(HeroComponent).exists()).toBe(true);
  });

  it('passes correct title prop to HeroComponent', () => {
    const wrapper = mount(HomePage);
    const heroComponent = wrapper.findComponent(HeroComponent);
    expect(heroComponent.props('title')).toBe('Home');
  });

  it('passes correct content prop to HeroComponent', () => {
    const wrapper = mount(HomePage);
    const heroComponent = wrapper.findComponent(HeroComponent);
    expect(heroComponent.props('content')).toBe('Home page of the Vuex Space Launch Program');
  });

  it('has correct initial data', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.vm.title).toBe('Home');
    expect(wrapper.vm.content).toBe('Home page of the Vuex Space Launch Program');
  });
});
