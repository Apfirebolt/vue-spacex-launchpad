/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../components/FooterComponent.vue';

describe('Footer', () => {
  it('renders a footer', () => {
    const wrapper = mount(Footer);
    expect(wrapper.find('footer').exists()).toBe(true);
  });

  it('renders the correct year', () => {
    const wrapper = mount(Footer);
    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(`© ${currentYear} Github Finder Built with Vue 3 and Tailwind CSS`);
  });
});
