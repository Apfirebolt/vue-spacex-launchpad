import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HeroComponent from '../components/HeroComponent.vue';

describe('HeroComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders properly with required props', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Welcome to SpaceX',
        content: 'Explore the universe'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays SpaceX logo', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test Title',
        content: 'Test Content'
      }
    });
    const logo = wrapper.find('img[alt="SpaceX Logo"]');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toContain('spacex_logo.png');
  });

  it('initializes with empty displayedTitle and displayedContent', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test Title',
        content: 'Test Content'
      }
    });
    expect(wrapper.vm.displayedTitle).toBe('');
    expect(wrapper.vm.displayedContent).toBe('');
  });

  it('applies typewriter effect on mount', async () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Hello',
        content: 'World'
      }
    });

    vi.advanceTimersByTime(500);
    expect(wrapper.vm.displayedTitle.length).toBeGreaterThan(0);
  });

  it('typewriter effect completes for title', async () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Hi',
        content: 'Test'
      }
    });

    vi.advanceTimersByTime(300);
    expect(wrapper.vm.displayedTitle).toBe('Hi');
  });

  it('typewriter effect completes for content', async () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test',
        content: 'OK'
      }
    });

    vi.advanceTimersByTime(200);
    expect(wrapper.vm.displayedContent).toBe('OK');
  });

  it('renders Get Started button', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test',
        content: 'Test'
      }
    });
    const button = wrapper.find('a');
    expect(button.text()).toBe('Get Started');
    expect(button.classes()).toContain('bg-yellow-400');
  });

  it('has correct background image', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test',
        content: 'Test'
      }
    });
    const bgImage = wrapper.find('img[alt="Background Image"]');
    expect(bgImage.exists()).toBe(true);
    expect(bgImage.attributes('src')).toContain('unsplash.com');
  });

  it('applies typewriter CSS class to title', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test',
        content: 'Test'
      }
    });
    const title = wrapper.find('h1');
    expect(title.classes()).toContain('typewriter');
  });

  it('applies typewriter CSS class to content', () => {
    const wrapper = mount(HeroComponent, {
      props: {
        title: 'Test',
        content: 'Test'
      }
    });
    const content = wrapper.find('p');
    expect(content.classes()).toContain('typewriter');
  });
});
