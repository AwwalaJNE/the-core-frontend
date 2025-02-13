const api = process.env.VUE_APP_API;
const urlFOrmated = new URL(api);


// console.log('process.env.VUE_APP_API',process.env.VUE_APP_API);
export default {
    login: api + "login",
    user: api + "user",
    role: api + "role",
    permission: api + "permission",

    // geolocation
    geolocation: api + "geolocation",
    geolocation_country: api + "geolocation-country",
    geolocation_city: api + "geolocation-city",
    geolocation_district: api + "geolocation-district",
    geolocation_subdistrict: api + "geolocation-subdistrict",
    geolocation_province: api + "geolocation-province",
    geolocation_timezone: api + "geolocation-timezone",
    geolocation_search: api + "geolocation-search",
    geolocation_search_by: api + "geolocation-search-by",

    // node
    node: api + "node",
    node_commission: api + "node-commission",
    node_link: api + "node-link",
    node_type: api + "node-type",
    node_alternate_address: api + "node-alternate-address",
    node_ip_address: api + "node-ip-address",
    node_list: api + "node-list",

    // employee
    employee: api + "employee",

    // employee type
    employee_type: api + "employee-type",

    // customer
    customer: api + "customer",
    customer_type: api + "customer-type",
    search_customer_code: api + "search-customer-code",

    // tariff
    tariff: api + "tariff",
    tariff_special: api + "tariff-special",
    discount_tariff: api + "discount-tariff",

    //surcharge
    surcharge: api + "surcharge",
    surcharge_type: api + "surcharge-type",

    //vehicle
    vehicle: api + "vehicle",
    vehicle_manifest_delivery_order: api + "vehicle-manifest-delivery-order",
    vehicle_mode: api + "vehicle-mode",
    vehicle_type: api + "vehicle-type",
    pickup_vehicle_type: api + "pickup-vehicle-type",

    // transaction
    tariff_shipping_service: api + "tariff-shipping-service",
    connote: api + "connote",
    upload_connote: api + "upload-connote",
    booking_connote: api + "booking-connote",
    transaction: api + "transaction",
    koli: api + "koli",
    bag: api + "bag",
    bag_inventory: api + "bag-inventory",
    unbagging: api + "unbagging",
    cash_register: api + "cash-register",
    payment: api + "payment",

    // Service
    service: api + "service-list",

    //  inventory Vehicle
    inventory_vehicle: api + "inventory-vehicle",

    // PRINT
    print: api + "print",

    //PICKUP
    pickup: api + "pickup",

    //PICKUP REQUEST
    pickup_request: api + "pickup-request",

    //PICKUP SCHEDULE
    pickup_schedule: api + "pickup-schedule",

    // PICKUP COURIER
    pickup_courier: api + "pickup-courier",


    //INBOUND
    inbound: api + "inbound",

    //INBOUND INCOMING
    inbound_incoming: api + "inbound-incoming",

    //INBOUND RECEIVING
    receiving: api + "receiving",

    //SURAT JALAN
    manifest_delivery_order: api + "manifest-delivery-order",
    manifest_delivery_order_airport: api + "manifest-delivery-order-airport",

    //delivery runsheet
    delivery : api + "delivery",

    //courier delivery
    courier_delivery : api + "courier-delivery",

    //delivery return
    delivery_return : api + "delivery/return",

    //delivery cod
    delivery_cod : api + "cod",

    //delivery cod collect
    delivery_cod_collect : api + "cod-collect",

    //delivery cod history
    delivery_cod_history : api + "cod-history",

    //SURAT MUATAN
    surat_muatan: api + "manifest",
    manifest_do: api + "manifest-do",

    //display-list-status
    status: api + "status",

    //irregularities
    irregularities: api + "irregularities",
    return: api + "return",

    //tracing
    tracing : api + "tracing",

    //tracing_status
    tracing_status : api + "tracing/status",

    //tracing_warehouse
    tracing_warehouse : api + "tracing/warehouse",

    //cost to cost
    cost_to_cost: api + "cost-to-cost",

    //cost to cost
    cost_to_cost_rules: api + "cost-to-cost-rules",

    //cost to cost
    cost_to_cost_type: api + "cost-to-cost-type",

    //cost to cost Report
    cost_to_cost_report: api + "cost-to-cost-report",

    //cost to cost
    activity_type: api + "activity-type",

    //config
    config: api + "config",

    //packingkayu
    packing_kayu: api + "packingkayu",

    //cashless
    cashless: api + "cashless",

    //profile
    profile: api + "profile",

    //reset-token
    reset_token: api + "reset-token",

    //apidoc
    apidoc: urlFOrmated.origin + "/docs",

    //user_history
    user_history: api + "auth-history-tracker",

    //pod
    pod : api + "pod",

    //undel
    undelivery : api + "undelivery",

    //Receiving Runsheet
    receiving_runsheet : api + "receiving-runsheet",

    //check-auth
    check_auth : api + "check-auth",

    //tariff-group
    tariff_group : api + "tariff-group",

    //pickup-origin
    pickup_origin : api + "pickup-origin",

    //resync runsheet
    resync_runsheet : api + "resync/delivery",

    //origin code
    origin_code : api + "origin-code",

    //destination code
    destination_code : api + "get-destination",

    //sla
    sla : api + "sla",
    sla_koli : api + "sla/koli",
    sla_inter_activity : api + "sla/inter-activity",
    sla_node_to_node_a : api + "sla/node-to-node-a",
    sla_node_to_node_b : api + "sla/node-to-node-b",
    
    // SLA Bag
    sla_bag : api + "sla-bag",

    // Configuration Warning Runsheet
    configuration_warning_runsheet : api + 'warning-koli-setting',
    configuration_warning_sla : api + 'warning-runsheet-sla-setting',

    // Configuration Warning Runsheet
    warning_runsheet : api + 'warning-koli-record',

    // Check Delivery Area
    check_delivery_area : api + 'check-delivery-area',

    // Delivery Area
    node_delivery_area : api + 'node-delivery-area',

    // Documentation
    documentation: api + 'documentation',

    // Validation
    validation: api + 'validation',

    //Handover Runsheet
    handover_runsheet : api + "handover-runsheet",

    // Find Feature
    find_feature: api + 'find-feature',

    // Deposit COD
    deposit_cod: api + 'cod-deposit',

    // Approval
    approval: api + 'approval',

    // Surat Jalan Revamp
    revamp_surat_jalan: api + 'revamp/manifest-delivery-order',

    // Surat Jalan Revamp V2
    revamp_surat_jalan_v2: api + 'revamp/manifest-delivery-order-v2',

    // Surat Muatan Revamp
    revamp_surat_muatan: api + 'revamp/manifest',

    // Delivery Revamp
    revamp_delivery: api + 'revamp/delivery',

    // Delivery Bag Pra Revamp
    revamp_delivery_bag_pra: api + 'revamp/delivery-bag-pra',

    // Tracing Revamp
    revamp_tracing: api + 'revamp/tracing',

    // Facility Code
    facility_code: api + 'facility-code',

    // Bag Revamp
    revamp_bag: api + 'revamp/bag',

    // Connote Cancel
    connote_cancel: api + 'request-cancel',

    // Connote Forward
    connote_forward: api + 'forward',

    // Crisscross
    crisscross: api + 'crisscross',

    // KPI
    kpi_process_target: api + 'kpi/process-target',

    // Region List
    regional_list: api + 'regional-list',

    // Branch List
    branch_list: api + 'branch-list',

    // Origin List
    origin_list: api + 'origin-list',

    // Node List
    node_list: api + 'node-list',

    // User List
    user_list: api + 'user-list',

    // Employee List
    employee_list: api + 'employee-list',

    // Insight Inventory
    insight_inventory: api + 'insight/inventory',

    // Insight Receive
    insight_receive: api + 'insight/receive',

    // Insight Depart
    insight_depart: api + 'insight/depart',

    // Insight Runsheet
    insight_runsheet: api + 'insight/runsheet',

    // Tracking Audit
    tracking_audit: api + 'tracking/audit',

    // Masterdata Bag Weight
    bag_weight_setting: api + 'bag-weight',

    // Masterdata Bag Item Limit
    bag_limit_setting: api + 'bag-limit',

    // Audit
    audit_invalid_log: api + 'audit/invalid-item-log',

    // Destination Zip Code
    destination_zip_code: api + 'destination-zip-code',

    // Destination Sorting Lov
    destination_sorting_lov: api + 'destination-lov',

    // Zip Code List
    zip_code_list: api + 'zip-code-list',

    // Masterdata Runsheet Limit
    runsheet_limit_setting: api + 'runsheet-limit',
  
    // Sorting Validation Zip Code
    sorting_zip_code_validation: api + 'validation/zip-code-new',

    // Sorting Validation Zip Code Bag
    sorting_zip_code_validation_bag: api + 'validation/bag-destination',

    // Inbound Staging
    inbound_staging: api + 'inbound-staging',
    inbound_staging_confirm: api + 'inbound-staging/confirm',
    inbound_staging_bulk: api + 'inbound-staging/bulk',

    // Sorting Item History
    sorting_item_history: api + 'sorting-item-history',

    // Setting Surat Muatan Stock
    sm_stock: api + 'sm-stock',

    // Vehicle Mode V2
    vehicle_mode_list_v2: api + 'vehicle/mode/list',

    // Vehicle Id V2
    vehicle_list_v2: api + 'vehicle/list',

    // List SM 
    list_sm: api + 'list/sm-number',

    // Receiving Log
    receiving_log: api + 'receiving-log',

    // Courier Delivery Area
    courier_delivery_area: api + 'courier-delivery-area',

    // TLC Zone
    tlc_zone: api + 'tlc-zone-list',

    // District List
    district_list: api + 'district-list',

    // Subdistrict List
    subdistrict_list: api + 'subdistrict-list'
}
