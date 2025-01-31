const resources = [
    { resource_code: "CORE-01-001", resource_type: "PAGE", resource_name: "MAINPAGE" },
    { resource_code: "CORE-01-002", resource_type: "PAGE", resource_name: "PROFILE" },
    { resource_code: "CORE-01-003", resource_type: "PAGE", resource_name: "BLANK" },
    { resource_code: "CORE-01-004", resource_type: "PAGE", resource_name: "SETTINGS" },
    { resource_code: "CORE-01-005", resource_type: "PAGE", resource_name: "SETTINGS_USERS" },
    { resource_code: "CORE-01-006", resource_type: "PAGE", resource_name: "SETTINGS_GEOLOCATION" },
    { resource_code: "CORE-01-007", resource_type: "PAGE", resource_name: "SETTINGS_NODES" },
    { resource_code: "CORE-01-008", resource_type: "PAGE", resource_name: "SETTINGS_TARIFF" },
    { resource_code: "CORE-01-009", resource_type: "PAGE", resource_name: "SETTINGS_EMPLOYEE" },
    { resource_code: "CORE-01-010", resource_type: "PAGE", resource_name: "SETTINGS_VEHICLES" },
    { resource_code: "CORE-01-011", resource_type: "PAGE", resource_name: "SETTINGS_CUSTOMER" },
    { resource_code: "CORE-01-012", resource_type: "PAGE", resource_name: "SETTINGS_SURCHARGE" },
    { resource_code: "CORE-01-013", resource_type: "PAGE", resource_name: "SETTINGS_SLA" },
    { resource_code: "CORE-01-014", resource_type: "PAGE", resource_name: "SETTINGS_CONFIGURATION_WARNING_RUNSHEET" },
    { resource_code: "CORE-01-015", resource_type: "PAGE", resource_name: "SETTINGS_FACILITY_CODE" },
    { resource_code: "CORE-01-016", resource_type: "PAGE", resource_name: "SETTINGS_KPI" },
    { resource_code: "CORE-01-017", resource_type: "PAGE", resource_name: "TRANSACTION" },
    { resource_code: "CORE-01-018", resource_type: "PAGE", resource_name: "TRANSACTION_NEW_TRANSACTION" },
    { resource_code: "CORE-01-019", resource_type: "PAGE", resource_name: "TRANSACTION_UPLOAD_CONNOTE" },
    { resource_code: "CORE-01-020", resource_type: "PAGE", resource_name: "TRANSACTION_COMPLETE" },
    { resource_code: "CORE-01-021", resource_type: "PAGE", resource_name: "TRANSACTION_DETAIL" },
    { resource_code: "CORE-01-022", resource_type: "PAGE", resource_name: "TRACE_CONNOTE" },
    { resource_code: "CORE-01-023", resource_type: "PAGE", resource_name: "TRACE_BAG" },
    { resource_code: "CORE-01-024", resource_type: "PAGE", resource_name: "SALES_TRANSACTION_LIST" },
    { resource_code: "CORE-01-025", resource_type: "PAGE", resource_name: "SALES_CASH_REGISTER" },
    { resource_code: "CORE-01-026", resource_type: "PAGE", resource_name: "CONNOTE_ADJUSTMENT_CONNOTE_CANCEL" },
    { resource_code: "CORE-01-027", resource_type: "PAGE", resource_name: "CONNOTE_ADJUSTMENT_CONNOTE_CANCEL_HISTORY" },
    { resource_code: "CORE-01-028", resource_type: "PAGE", resource_name: "CONNOTE_ADJUSTMENT_CONNOTE_FORWARD" },
    { resource_code: "CORE-01-029", resource_type: "PAGE", resource_name: "CONNOTE_ADJUSTMENT_CONNOTE_RETURN" },
    { resource_code: "CORE-01-030", resource_type: "PAGE", resource_name: "TRACING" },
    { resource_code: "CORE-01-031", resource_type: "PAGE", resource_name: "TRACING_DETAIL" },
    { resource_code: "CORE-01-032", resource_type: "PAGE", resource_name: "TRACING_HISTORY" },
    { resource_code: "CORE-01-033", resource_type: "PAGE", resource_name: "TRACING_HISTORY_DETAIL" },
    { resource_code: "CORE-01-034", resource_type: "PAGE", resource_name: "IRREGURALITIES_INVENTORY" },
    { resource_code: "CORE-01-035", resource_type: "PAGE", resource_name: "IRREGURALITIES_ENTRY_STATUS" },
    { resource_code: "CORE-01-036", resource_type: "PAGE", resource_name: "IRREGURALITIES_HOLD" },
    { resource_code: "CORE-01-037", resource_type: "PAGE", resource_name: "IRREGURALITIES_FAILED" },
    { resource_code: "CORE-01-038", resource_type: "PAGE", resource_name: "CASHLESS" },
    { resource_code: "CORE-01-039", resource_type: "PAGE", resource_name: "PACKINGLIST" },
    { resource_code: "CORE-01-040", resource_type: "PAGE", resource_name: "UPLOAD" },
    { resource_code: "CORE-01-041", resource_type: "PAGE", resource_name: "INVENTORY_ITEM" },
    { resource_code: "CORE-01-042", resource_type: "PAGE", resource_name: "INVENTORY_BAG_ITEM" },
    { resource_code: "CORE-01-043", resource_type: "PAGE", resource_name: "INVENTORY_ITEM_DETAIL" },
    { resource_code: "CORE-01-044", resource_type: "PAGE", resource_name: "INVENTORY_BAG" },
    { resource_code: "CORE-01-045", resource_type: "PAGE", resource_name: "INVENTORY_BAG_DETAIL" },
    { resource_code: "CORE-01-046", resource_type: "PAGE", resource_name: "UNBAGGING" },
    { resource_code: "CORE-01-047", resource_type: "PAGE", resource_name: "PICKUP_REQUEST" },
    { resource_code: "CORE-01-048", resource_type: "PAGE", resource_name: "PICKUP_LIST" },
    { resource_code: "CORE-01-049", resource_type: "PAGE", resource_name: "PICKUP_SCHEDULE" },
    { resource_code: "CORE-01-050", resource_type: "PAGE", resource_name: "TRANSPORT_MANIFEST" },
    { resource_code: "CORE-01-051", resource_type: "PAGE", resource_name: "TRANSPORT_PACKING_KAYU" },
    { resource_code: "CORE-01-052", resource_type: "PAGE", resource_name: "TRANSPORT_SURAT_JALAN" },
    { resource_code: "CORE-01-053", resource_type: "PAGE", resource_name: "TRANSPORT_INVENTORY_VEHICLE" },
    { resource_code: "CORE-01-054", resource_type: "PAGE", resource_name: "RECEIVING" },
    { resource_code: "CORE-01-055", resource_type: "PAGE", resource_name: "INBOUND_INCOMING_SCAN" },
    { resource_code: "CORE-01-056", resource_type: "PAGE", resource_name: "INBOUND_INCOMING_DETAIL" },
    { resource_code: "CORE-01-057", resource_type: "PAGE", resource_name: "AIRPORT_RECEIVING" },
    { resource_code: "CORE-01-058", resource_type: "PAGE", resource_name: "DELIVERY_RUNSHEET" },
    { resource_code: "CORE-01-059", resource_type: "PAGE", resource_name: "DELIVERY_RUNSHEET DELETE SOON" },
    { resource_code: "CORE-01-060", resource_type: "PAGE", resource_name: "DELIVERY_RUNSHEET_EDIT" },
    { resource_code: "CORE-01-061", resource_type: "PAGE", resource_name: "DEPOSIT_COD" },
    { resource_code: "CORE-01-062", resource_type: "PAGE", resource_name: "HANDOVER_RUNSHEET" },
    { resource_code: "CORE-01-063", resource_type: "PAGE", resource_name: "HANDOVER_RUNSHEET_HISTORY" },
    { resource_code: "CORE-01-064", resource_type: "PAGE", resource_name: "HANDOVER_RUNSHEET_COURIER" },
    { resource_code: "CORE-01-065", resource_type: "PAGE", resource_name: "DEPOSIT_COD_HISTORY" },
    { resource_code: "CORE-01-066", resource_type: "PAGE", resource_name: "COST_TO_COST_SETTING" },
    { resource_code: "CORE-01-067", resource_type: "PAGE", resource_name: "COST_TO_COST_REPORT" },
    { resource_code: "CORE-01-068", resource_type: "PAGE", resource_name: "SETTING_EXCHANGE_RATE" },
    { resource_code: "CORE-01-069", resource_type: "PAGE", resource_name: "SETTING_ACCESS_TOKEN" },
    { resource_code: "CORE-01-070", resource_type: "PAGE", resource_name: "DASHBOARD_SMART_POINT" },
    { resource_code: "CORE-01-071", resource_type: "PAGE", resource_name: "RESYNC_RUNSHEET" },
    { resource_code: "CORE-01-072", resource_type: "PAGE", resource_name: "HELP_ERROR_DICTIONARY" },
    { resource_code: "CORE-01-073", resource_type: "PAGE", resource_name: "HELP_SHORTCUT_DICTIONARY" },
    { resource_code: "CORE-01-074", resource_type: "PAGE", resource_name: "HELPDESK_CONNOTE" },
    { resource_code: "CORE-01-075", resource_type: "PAGE", resource_name: "HELPDESK_BAG" },
    { resource_code: "CORE-01-076", resource_type: "PAGE", resource_name: "HELPDESK_SURAT_MUATAN" },
    { resource_code: "CORE-01-077", resource_type: "PAGE", resource_name: "HELPDESK_SURAT_JALAN" },
    { resource_code: "CORE-01-078", resource_type: "PAGE", resource_name: "HELPDESK_RUNSHEET" },
    { resource_code: "CORE-01-079", resource_type: "PAGE", resource_name: "PRINT_BPIK" },
    { resource_code: "CORE-01-080", resource_type: "PAGE", resource_name: "PRINT_GENERAL" },
    { resource_code: "CORE-01-081", resource_type: "PAGE", resource_name: "PRINT_SPPAP" },
    { resource_code: "CORE-01-082", resource_type: "PAGE", resource_name: "INVALID_RECEIVING" },
    { resource_code: "CORE-01-083", resource_type: "PAGE", resource_name: "INVALID_OPENING_BAG" },
    { resource_code: "CORE-01-084", resource_type: "PAGE", resource_name: "SETTINGS_BAG" },
    { resource_code: "CORE-01-085", resource_type: "PAGE", resource_name: "SORTING_CONNOTE" },
    { resource_code: "CORE-01-086", resource_type: "PAGE", resource_name: "SETTINGS_RUNSHEET" },
    { resource_code: "CORE-01-087", resource_type: "PAGE", resource_name: "DESTINATION" },
    { resource_code: "CORE-01-088", resource_type: "PAGE", resource_name: "SORTING_BAG" },
    { resource_code: "CORE-01-089", resource_type: "PAGE", resource_name: "RECEIVING_AIRPORT_SCAN" },
    { resource_code: "CORE-01-090", resource_type: "PAGE", resource_name: "AIRPORT_RECEIVING_DETAIL" },
    { resource_code: "CORE-01-091", resource_type: "PAGE", resource_name: "SETTINGS_SURAT_MUATAN" },
    { resource_code: "CORE-01-092", resource_type: "PAGE", resource_name: "RECEIVING_LOG" },
];


export const resourceLookup = resources.reduce((acc, { resource_code, resource_type, resource_name }) => {
    acc[resource_name] = { resource_code, resource_type, resource_name };
    return acc;
}, {});


const dataTableColumn = [
    {
        RECEIVING: [
            {
                label: 'Inbound Number',
                key: 'inbound_number',
            },
            {
                label: 'IM Numbers',
                key: 'im_numbers',
            },
            {
                label: 'Vehicle',
                key: 'vehicle',
            },
            {
                label: 'From',
                key: 'inbound_node_name_origin',
            },
            {
                label: '#SM /SJ /PICKUP',
                key: 'inbound_type',
            },
            {
                label: 'Item',
                key: 'inbound_total_bag',
            },
            {
                label: 'Connote',
                key: 'inbound_total_koli',
            },
            {
                label: 'Fix Cost Weight',
                key: 'fix_cost_weight',
            },
            {
                label: 'Live Cost Weight',
                key: 'live_cost_weight',
            },
            {
                label: 'Fix Actual Weight',
                key: 'fix_actual_weight',
            },
            {
                label: 'Live Actual Weight',
                key: 'live_actual_weight',
            },
            {
                label: 'PIC',
                key: 'carrier_employee_name',
            },
            {
                label: 'Created',
                key: 'created_orion',
            },
            {
                label: 'ETD',
                key: 'inbound_etd',
            },
            {
                label: 'ETA',
                key: 'inbound_eta',
            },
            {
                label: 'Departed',
                key: 'departed_at',
            },
            {
                label: 'Status',
                key: 'status',
            },
            {
                label: 'Received At',
                key: 'inbound_node_name_receiver',
            },
            {
                label: 'Received By',
                key: 'received_by_user_name',
            },
            {
                label: 'Received Time',
                key: 'received_at',
            },
        ],
        RECEIVING_AIRPORT_PRE_ALERT: [
            {
                label: 'Inbound Number',
                key: 'inbound_number',
            },
            {
                label: 'Vehicle',
                key: 'vehicle',
            },
            {
                label: 'From',
                key: 'inbound_node_name_origin',
            },
            {
                label: 'Item',
                key: 'inbound_total_bag',
            },
            {
                label: 'Connote',
                key: 'inbound_total_koli',
            },
            {
                label: 'Fix Cost Weight',
                key: 'fix_cost_weight',
            },
            {
                label: 'Live Cost Weight',
                key: 'live_cost_weight',
            },
            {
                label: 'Fix Actual Weight',
                key: 'fix_actual_weight',
            },
            {
                label: 'Live Actual Weight',
                key: 'live_actual_weight',
            },
            {
                label: 'PIC',
                key: 'carrier_employee_name',
            },
            {
                label: 'Created',
                key: 'created_orion',
            },
            {
                label: 'ETD',
                key: 'inbound_etd',
            },
            {
                label: 'ETA',
                key: 'inbound_eta',
            },
            {
                label: 'Departed',
                key: 'departed_at',
            },
            {
                label: 'Status',
                key: 'status',
            },
            {
                label: 'Received At',
                key: 'inbound_node_name_receiver',
            },
            {
                label: 'Received By',
                key: 'received_by_user_name',
            },
            {
                label: 'Received Times',
                key: 'received_at',
            },
        ],
        RECEIVING_AIRPORT_SURAT_JALAN: [
            {
                label: 'Surat Jalan #',
                key: 'manifest_do_number',
            },
            {
                label: 'Type',
                key: 'sj_type',
            },
            {
                label: 'Vehicle Type',
                key: 'vehicle_type_name',
            },
            {
                label: 'Driver',
                key: 'driver_name'
            },
            {
                label: 'Mode#',
                key: 'vehicle_mode_name',
            },
            {
                label: 'Origin',
                key: 'node_id_origin_name',
            },
            {
                label: 'Destination',
                key: 'node_id_destination_name',
            },
            {
                label: 'Kg',
                key: 'total_weight',
            },
            {
                label: 'Fix Cost Weight',
                key: 'fix_cost_weight',
            },
            {
                label: 'Live Cost Weight',
                key: 'live_cost_weight',
            },
            {
                label: 'Fix Actual Weight',
                key: 'fix_actual_weight',
            },
            {
                label: 'Live Actual Weight',
                key: 'live_actual_weight',
            },
            {
                label: 'Total Item',
                key: 'total_detail_items',
            },
            {
                label: 'ETD',
                key: 'etd',
            },
            {
                label: 'ETA',
                key: 'eta',
            },
            {
                label: 'Status',
                key: 'status',
            },
        ],
        INVENTORY_KOLI: [
            {
                label: 'Koli Number',
                key: 'koli_number',
            },
            {
                label: 'Bag',
                key: 'bag_number',
            },
            {
                label: 'Connote Created Date',
                key: 'created_at',
            },
            {
                label: 'Receiving Date',
                key: 'received_at',
            },
            {
                label: 'Last Bag Opened Date',
                key: 'latest_opened_bag',
            },
            {
                label: 'Origin',
                key: 'origin_tariff_code',
            },
            {
                label: 'Destination',
                key: 'destination_tariff_code',
            },
            {
                label: 'Weight(Kg)',
                key: 'connote_chargeable_weight',
            },
            {
                label: 'Service',
                key: 'connote_service_code',
            },
            {
                label: 'COD',
                key: 'is_cod',
            },
            {
                label: 'Amount COD (Rp)',
                key: 'amount_cod',
            },
            {
                label: 'SLA',
                key: 'connote_sla_date',
            },
            {
                label: 'Runsheet Number',
                key: 'delivery_runsheet_number',
            },
            {
                label: 'Wood Package',
                key: 'packing_kayu_type',
            },
            {
                label: 'Cancel',
                key: 'is_void_status',
            },
            {
                label: 'Status POD',
                key: 'delivery_status_code',
            },
            {
                label: 'Status Irregularity',
                key: 'status_irregularity',
            },
            {
                label: 'Status',
                key: 'is_confirmed',
            },
        ],
        INVENTORY_CONNOTE: [
            {
                label: 'Connote Number',
                key: 'connote_number',
            },
            {
                label: 'Origin',
                key: 'connote_shipper_tariff_code',
            },
            {
                label: 'Destination',
                key: 'connote_receiver_tariff_code',
            },
            {
                label: 'Weight(Kg)',
                key: 'connote_chargeable_weight',
            },
            {
                label: 'Service',
                key: 'connote_service_code',
            },
            {
                label: 'COD',
                key: 'is_cod',
            },
            {
                label: 'Amount COD (Rp)',
                key: 'amount_cod',
            },
            {
                label: 'SLA',
                key: 'connote_sla_date',
            },
            {
                label: 'Created At',
                key: 'created_at',
            },
            {
                label: 'Cancel',
                key: 'is_void_status',
            },
        ],
        INVENTORY_BAG: [
            {
                label: 'Bag #',
                key: 'bag_number',
            },
            {
                label: 'Source',
                key: 'source',
            },
            {
                label: 'Bag type',
                key: 'tipe_bag',
            },
            {
                label: 'Date #',
                key: 'created_at',
            },
            {
                label: 'Scanned Date',
                key: 'first_opened_bag',
            },
            {
                label: 'Received Date',
                key: 'received_at',
            },
            {
                label: '# Item',
                key: 'bag_detail_qty',
            },
            {
                label: 'Weight (Kg)',
                key: 'bag_weight',
            },
            {
                label: 'Cost Weight',
                key: 'cost_weight',
            },
            {
                label: 'Actual Weight',
                key: 'bag_actual_weight',
            },
            {
                label: 'Origin Node Code',
                key: 'origin_node_code',
            },
            {
                label: 'Origin Node Name',
                key: 'origin_node_name',
            },
            {
                label: 'Origin',
                key: 'origin',
            },
            {
                label: 'Origin Name',
                key: 'origin_name',
            },
            {
                label: 'Destination Node Code',
                key: 'destination_node_code',
            },
            {
                label: 'Destination Node Name',
                key: 'destination_node_name',
            },
            {
                label: 'Destination',
                key: 'destination',
            },
            {
                label: 'Destination Name',
                key: 'destination_name',
            },
            {
                label: 'Consolidation',
                key: 'is_consolidated',
            },
            {
                label: 'With Courier',
                key: 'with_courier',
            },
            {
                label: 'Masterbag',
                key: 'masterbag_parent',
            },
            {
                label: 'Surat Muatan',
                key: 'surat_muatan',
            },
            {
                label: 'Surat Jalan',
                key: 'surat_jalan',
            },
            {
                label: 'Approved',
                key: 'approved',
            },
            {
                label: 'Status',
                key: 'summary_status',
            },
            {
                label: 'Runsheet',
                key: 'runsheet_count',
            },
            {
                label: 'Un Runsheet',
                key: 'un_runsheet_count',
            },
            {
                label: 'Status Irregularity',
                key: 'status_irregularity_description',
            },
        ],
        SURAT_MUATAN: [
            {
                label: 'No Surat Muatan',
                key: 'manifest_number',
            },
            {
                label: 'Date#',
                key: 'created_at',
            },
            {
                label: 'Type SM',
                key: 'manifest_type_name',
            },
            {
                label: 'Jenis Kiriman',
                key: 'jenis_kiriman',
            },
            {
                label: 'Origin',
                key: 'origin_name',
            },
            {
                label: 'Destination',
                key: 'destination_name',
            },
            {
                label: 'Item',
                key: 'detail_count',
            },
            {
                label: 'Connote',
                key: 'koli_count',
            },
            {
                label: 'Fix Cost Weight',
                key: 'fix_cost_weight',
            },
            {
                label: 'Live Cost Weight',
                key: 'live_cost_weight',
            },
            {
                label: 'Fix Actual Weight',
                key: 'fix_actual_weight',
            },
            {
                label: 'Live Actual Weight',
                key: 'live_actual_weight',
            },
            {
                label: 'ETD',
                key: 'etd',
            },
            {
                label: 'ETA',
                key: 'eta',
            },
            {
                label: 'Approved',
                key: 'approved',
            },
            {
                label: 'Status',
                key: 'status',
            },
            {
                label: 'Received At',
                key: 'latest_node_receiver',
            },
        ],
        SURAT_JALAN: [
            {
                label: 'Surat Jalan',
                key: 'manifest_do_number',
            },
            {
                label: 'Type',
                key: 'sj_type',
            },
            {
                label: 'Orion Number',
                key: 'orion_number',
            },
            {
                label: 'Vehicle Type',
                key: 'vehicle_type_name',
            },
            {
                label: 'Driver',
                key: 'driver_name',
            },
            {
                label: 'Mode',
                key: 'vehicle_mode_name',
            },
            {
                label: 'Origin',
                key: 'node_id_origin_name',
            },
            {
                label: 'Destination',
                key: 'node_id_destination_name',
            },
            {
                label: 'Fix Cost Weight',
                key: 'fix_cost_weight',
            },
            {
                label: 'Live Cost Weight',
                key: 'live_cost_weight',
            },
            {
                label: 'Fix Actual Weight',
                key: 'fix_actual_weight',
            },
            {
                label: 'Live Actual Weight',
                key: 'live_actual_weight',
            },
            {
                label: 'Total Item',
                key: 'total_detail_items',
            },
            {
                label: 'ETD',
                key: 'etd',
            },
            {
                label: 'ETA',
                key: 'eta',
            },
            {
                label: 'Departed Time',
                key: 'departed_time',
            },
            {
                label: 'Approved',
                key: 'approved',
            },
            {
                label: 'Status',
                key: 'status',
            },
            {
                label: 'Latest Node Receiver',
                key: 'latest_node_code_receiver',
            },
        ],
    },
];