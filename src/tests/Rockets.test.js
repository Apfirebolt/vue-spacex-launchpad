import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import Rockets from '../views/Rockets.vue';
import LoadingComponent from '../components/Loader.vue';
import HeroComponent from '../components/HeroComponent.vue';

vi.mock('axios');

describe('Rockets.vue', () => {
  const mockRockets = [
    {
      rocket_id: '1',
      rocket_name: 'Falcon 1',
      rocket_type: 'Merlin A',
      first_flight: '2006-03-24',
      active: false,
      stages: 2,
      boosters: 0,
      cost_per_launch: 6700000,
      success_rate_pct: 40,
      flickr_images: ['https://example.com/image1.jpg'],
      wikipedia: 'https://en.wikipedia.org/wiki/Falcon_1'
    },
    {
      rocket_id: '2',
      rocket_name: 'Falcon 9',
      rocket_type: 'Merlin 1D',
      first_flight: '2010-06-04',
      active: true,
      stages: 2,
      boosters: 0,
      cost_per_launch: 50000000,
      success_rate_pct: 97,
      flickr_images: [],
      wikipedia: 'https://en.wikipedia.org/wiki/Falcon_9'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it('renders loading component initially', () => {
  //   const wrapper = mount(Rockets);
  //   wrapper.vm.isLoading = true;
  //   expect(wrapper.findComponent(LoadingComponent).exists()).toBe(true);
  // });

  // it('renders hero component with correct props', async () => {
  //   axios.get.mockResolvedValue({ data: mockRockets });
  //   const wrapper = mount(Rockets);
  //   await wrapper.vm.$nextTick();

  //   const hero = wrapper.findComponent(HeroComponent);
  //   expect(hero.exists()).toBe(true);
  //   expect(hero.props('title')).toBe('Rockets');
  //   expect(hero.props('content')).toBe('List of all the rockets by SpaceX');
  // });

  it('fetches and displays rockets on mount', async () => {
    axios.get.mockResolvedValue({ data: mockRockets });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(axios.get).toHaveBeenCalledWith('https://api.spacexdata.com/v3/rockets');
    expect(wrapper.vm.rockets).toEqual(mockRockets);
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('displays rocket cards with correct data', async () => {
    axios.get.mockResolvedValue({ data: mockRockets });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.findAll('.break-inside-avoid').length).toBe(2);
    expect(wrapper.text()).toContain('Falcon 1');
    expect(wrapper.text()).toContain('Falcon 9');
  });

  it('displays "No Image Available" when flickr_images are empty', async () => {
    axios.get.mockResolvedValue({ data: [mockRockets[1]] });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.text()).toContain('No Image Available');
  });

  it('displays active status correctly', async () => {
    axios.get.mockResolvedValue({ data: mockRockets });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.html()).toContain('Active:</strong> No');
    expect(wrapper.html()).toContain('Active:</strong> Yes');
  });

  it('formats cost_per_launch with locale string', async () => {
    axios.get.mockResolvedValue({ data: [mockRockets[0]] });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.text()).toContain('6,700,000');
  });

  it('renders wikipedia link with correct href', async () => {
    axios.get.mockResolvedValue({ data: [mockRockets[0]] });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    const link = wrapper.find('a[target="_blank"]');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe(mockRockets[0].wikipedia);
    expect(link.text()).toBe('More Info');
  });

  it('handles API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error('API Error'));

    const wrapper = mount(Rockets);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.vm.isLoading).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('hides loading component after successful API call', async () => {
    axios.get.mockResolvedValue({ data: mockRockets });
    const wrapper = mount(Rockets);

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.findComponent(LoadingComponent).exists()).toBe(false);
  });
});
