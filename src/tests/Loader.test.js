import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Loader from '../components/Loader.vue';

describe('Loader', () => {
  it('renders the loader component', () => {
    const wrapper = mount(Loader);
    expect(wrapper.exists()).toBe(true);
  });

  it('has the correct component name', () => {
    const wrapper = mount(Loader);
    expect(wrapper.vm.$options.name).toBe('Loader');
  });

  it('renders the loader div with correct classes', () => {
    const wrapper = mount(Loader);
    const loaderDiv = wrapper.find('.loader');
    expect(loaderDiv.exists()).toBe(true);
    expect(loaderDiv.classes()).toContain('ease-linear');
    expect(loaderDiv.classes()).toContain('rounded-full');
    expect(loaderDiv.classes()).toContain('border-8');
    expect(loaderDiv.classes()).toContain('border-t-8');
    expect(loaderDiv.classes()).toContain('border-gray-200');
    expect(loaderDiv.classes()).toContain('h-64');
    expect(loaderDiv.classes()).toContain('w-64');
  });

  it('renders the container with correct classes', () => {
    const wrapper = mount(Loader);
    const container = wrapper.find('.flex');
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain('justify-center');
    expect(container.classes()).toContain('items-center');
    expect(container.classes()).toContain('h-full');
  });

  it('matches snapshot', () => {
    const wrapper = mount(Loader);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
