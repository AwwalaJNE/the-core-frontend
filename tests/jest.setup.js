import VueRouter from 'vue-router';
import Vuesax from 'vuesax';
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

// Mock global components and libraries
jest.mock('axios');

jest.mock('@/components/scanner/camera.vue', () => ({
    name: 'CameraScanner',
    template: '<div></div>',
    methods: {
        open: jest.fn(),
        close: jest.fn()
    }
}));

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuesax);
localVue.use(Vuex);

// Set up Vuex store
const state = {
  user: {
    node_id: {
      value: '2301',
      node_code: 'KP-CGK-001'
    }
  }
};

const getters = {
  getUser: (state) => state.user
};

const store = new Vuex.Store({
  state,
  getters
});

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

export { localVue, store };
