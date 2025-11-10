import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import LaunchPage from '../views/Launches.vue';
import HeroComponent from '../components/HeroComponent.vue';
import LoadingComponent from '../components/Loader.vue';

vi.mock('axios');

describe('LaunchPage', () => {
  const mockLaunches = [
    {
      flight_number: 1,
      mission_name: 'Mission 1',
      launch_year: '2020',
      launch_success: true,
      upcoming: false,
      rocket: { rocket_name: 'Falcon 9' },
      links: { wikipedia: 'https://wikipedia.org' }
    },
    {
      flight_number: 2,
      mission_name: 'Mission 2',
      launch_year: '2021',
      launch_success: false,
      upcoming: true,
      rocket: { rocket_name: 'Falcon Heavy' },
      links: { wikipedia: 'https://wikipedia.org' }
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading component when isLoading is true', () => {
    const wrapper = mount(LaunchPage, {
      data() {
        return { isLoading: true };
      }
    });
    expect(wrapper.findComponent(LoadingComponent).exists()).toBe(true);
  });

  it('should render hero component with correct props', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    const hero = wrapper.findComponent(HeroComponent);
    expect(hero.exists()).toBe(true);
    expect(hero.props('title')).toBe('Launches');
    expect(hero.props('content')).toBe('List of all the launches by SpaceX');
  });

  it('should fetch launches on mount', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);

    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith('https://api.spacexdata.com/v3/launches');
    expect(wrapper.vm.launches).toEqual(mockLaunches);
  });

  it('should display launches correctly', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(2);
    expect(cards[0].text()).toContain('Mission 1');
    expect(cards[1].text()).toContain('Mission 2');
  });

  it('should filter launches by rocket name', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    wrapper.vm.filters = { name: 'Falcon 9' };
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.rocketResults.length).toBe(1);
    expect(wrapper.vm.rocketResults[0].rocket.rocket_name).toBe('Falcon 9');
  });

  it('should filter launches by success status', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    wrapper.vm.filters = { status: 'Success' };
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.rocketResults.length).toBe(1);
    expect(wrapper.vm.rocketResults[0].launch_success).toBe(true);
  });

  it('should filter launches by failure status', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    wrapper.vm.filters = { status: 'Failure' };
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.rocketResults.length).toBe(1);
    expect(wrapper.vm.rocketResults[0].launch_success).toBe(false);
  });

  it('should filter launches by upcoming status', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    wrapper.vm.filters = { upcoming: 'Yes' };
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.rocketResults.length).toBe(1);
    expect(wrapper.vm.rocketResults[0].upcoming).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error('API Error'));

    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isLoading).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should update filters through getFilteredResults method', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    const newFilters = { name: 'Falcon', status: 'Success' };
    wrapper.vm.getFilteredResults(newFilters);

    expect(wrapper.vm.filters).toEqual(newFilters);
    expect(wrapper.vm.isSearchFilterOpened).toBe(false);
  });

  it('should display correct mission status text', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    const cards = wrapper.findAll('.card');
    expect(cards[0].text()).toContain('Success');
    expect(cards[1].text()).toContain('Failure');
  });

  it('should display correct upcoming status text', async () => {
    axios.get.mockResolvedValue({ data: mockLaunches });
    const wrapper = mount(LaunchPage);
    await wrapper.vm.$nextTick();

    const cards = wrapper.findAll('.card');
    expect(cards[0].text()).toContain('Upcoming: No');
    expect(cards[1].text()).toContain('Upcoming: Yes');
  });
});
