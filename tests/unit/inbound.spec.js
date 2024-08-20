import VueRouter from 'vue-router';
import { shallowMount, mount } from '@vue/test-utils';
import inboundScan from '@/views/inbound/scan';
import inboundInformation from '@/views/inbound/scan/inboundInformation';
import inboundDetail from '@/views/inbound/scan/inboundDetail';
import { localVue, store } from '../jest.setup';
import axios from 'axios';

// Set up a mock router
const router = new VueRouter({
    routes: [
        { path: '/inbound/:inbound_id', component: inboundScan },
    ],
});

describe('Inbound Scan', () => {
  const mockDataTableProp = [{
    inbound_id: "666fcd08-01dd-4352-8420-418a510292be",
    inbound_number: "1724127730",
    inbound_type: "PICKUP",
    total_received: 1,
    total_unreceived: 2,
    status_received: "INFO",
    detail_incoming: [
      {
        item_number: "BDO0500112",
        item_type: "BAG",
        im_number: null,
        is_received: false
      },
      {
        item_number: "BDO0500113",
        item_type: "BAG",
        im_number: null,
        is_received: false
      },
      {
        item_number: "BDO0500114",
        item_type: "BAG",
        im_number: null,
        is_received: true
      }
    ]
  }]
  it('measures time elapsed for receiving function (less than 50 ms)', async () => {
    router.push('/inbound/123'); // Mock route

    // Mock API response
    axios.post.mockResolvedValue({
      data: {
        data: {
          bag_number: "CGK0500118",
          bag_weight: "1",
          bag_detail_qty: "1",
          origin_node_id: "2301",
          destination_node_id: "70483",
          is_unbagged: "0",
          received_at_node_id: null,
          received_by: null,
          created_by_node_id: "2301",
          created_by: "1241",
          created_at: "2024-08-19 11:18:59",
          updated_at: "2024-08-19 11:18:59",
          current_node_id: 2301,
          current_user_id: null,
          current_employee_id: null,
          current_bag_number: null,
          bag_actual_weight: "0",
          is_consolidated: null,
          is_packing_kayu: false,
          routing: "INTRACITY",
          origin_node_code: null,
          destination_node_code: null,
          created_from: null,
          scaned_time: null,
          is_pra_runsheet: "0",
          tipe_bag: "BAG_PICKUP",
          pra_number: null,
          employee_code: null,
          om: null,
          is_orion: null,
          ca_flag: null,
          inbound_number: "1724038121",
          id_inbound: "472B4E37-C2A9-4297-9BD6-4E799B998355",
          inbound_type: "PICKUP",
          koli: [
            {
              koli_number: "050023012320000100",
              connote_number: "0500230123200001",
              koli_length: "0",
              koli_width: "0",
              koli_height: "0",
              koli_volume_weight: 0,
              koli_actual_weight: 1,
              koli_qty: null,
              koli_sequence: "1",
              is_actual: true,
              description: "BAJU",
              is_packing_kayu: "0",
              is_packing_kayu_refused: null,
              packing_kayu_type: null,
              location_node_id: "2301",
              location_bag_number: "CGK0500118",
              location_user_id: null,
              is_confirmed: "1",
              created_by: "1241",
              created_at: "2024-08-19 11:18:40",
              updated_at: "2024-08-19 11:18:59",
              koli_block_activity_status: null,
              koli_irregularity_status: null,
              is_packing_kayu_applied: null,
              koli_packing_kayu_weight: null,
              location_employee_id: null,
              is_delivered: null,
              koli_delivery_status: null,
              koli_delivered_at: null,
              received_at: null,
              is_received_non_inbound: null,
              routing: "INTRACITY",
              is_pra_runsheet: "0",
              hoc: null,
              koli_number_return: null,
              connote_number_return: null
            }
          ],
          summary: {
            total_received: 0,
            total_unreceived: 0,
            total: 0
          }
        }
      },
    });

    axios.post.mockRejectedValue({
        response: {
          status: 500,
          data: {
            message: "Internal Server Error",
            reference: "Error Reference"
          },
        },
    });

    const wrapper = mount(inboundScan, {
        localVue,
        router,
        store,
    });

    // Capture start time
    const startTime = performance.now();

    // Trigger the function
    await wrapper.vm.processInbond();

    // Capture end time after DOM update
    const endTime = performance.now();

    // Calculate elapsed time
    const elapsedTime = endTime - startTime;

    // Optional assertions for elapsed time
    expect(elapsedTime).toBeLessThan(50); // Adjust based on performance expectations
  });

  it('measures time elapsed to display inbound information (less than 0.1 ms)', async () => {
    const wrapper = mount(inboundInformation, {
      localVue,
      propsData: {
        dataTableProp: mockDataTableProp,
        loading: false
      },
    });

    // Calculate mount time with transition
    const startTimeTransition = performance.now();
    await wrapper.vm.$nextTick();
    const endTimeTransition = performance.now();
    const elapsedTimeTransition = endTimeTransition - startTimeTransition;

    expect(elapsedTimeTransition).toBeLessThan(0.1);
  });

  it('confirm props displayed correctly in inbound information', async () => {
    const wrapper = mount(inboundInformation, {
      localVue,
      propsData: {
        dataTableProp: mockDataTableProp,
        loading: false
      },
    });
    
    // Test displayed props
    const displayedData = wrapper.find('.vs-table__tr');
    expect(displayedData.exists()).toBe(true);

    const rows = wrapper.findAll('tbody.vs-table__tbody > tr.vs-table__tr');
    expect(rows.length).toBe(1);

    const cells = rows.at(0).findAll('td.vs-table__td');
    expect(cells.length).toBe(4);
    expect(cells.at(0).text()).toBe('1724127730');
    expect(cells.at(1).text()).toBe('1');
    expect(cells.at(2).text()).toBe('2');
    expect(cells.at(3).text()).toBe('INFO');

    expect(wrapper.props().dataTableProp).toEqual(mockDataTableProp);
  });

  it('measures time elapsed to display inbound detail (less than 0.1 ms)', async () => {
    const wrapper = mount(inboundDetail, {
      localVue,
      propsData: {
        dataTableProp: mockDataTableProp,
        loading: false
      },
    });

    // Calculate mount time with transition
    const startTimeTransition = performance.now();
    await wrapper.vm.$nextTick();
    const endTimeTransition = performance.now();
    const elapsedTimeTransition = endTimeTransition - startTimeTransition;

    expect(elapsedTimeTransition).toBeLessThan(0.1);
  });

  it('confirm props displayed correctly in inbound detail', async () => {
    const wrapper = mount(inboundDetail, {
      localVue,
      propsData: {
        dataTableProp: mockDataTableProp,
        loading: false
      },
    });
    
    // Test displayed props
    const displayedData = wrapper.find('.vs-table__tr');
    expect(displayedData.exists()).toBe(true);

    const rows = wrapper.findAll('tbody.vs-table__tbody > tr.vs-table__tr');
    expect(rows.length).toBe(3);

    const cells = rows.at(0).findAll('td.vs-table__td');
    expect(cells.length).toBe(4);
    expect(cells.at(0).text()).toBe('BDO0500112');
    expect(cells.at(1).text()).toBe('');
    expect(cells.at(2).text()).toBe('BAG');

    expect(wrapper.props().dataTableProp).toEqual(mockDataTableProp);
  });
});