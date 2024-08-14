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
    unbagging: api + "unbagging",
    cash_register: api + "cash-register",
    payment: api + "payment",

    // Service
    service: api + "service",

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

    // Configuration Warning Runsheet
    configuration_warning_runsheet : api + 'warning-koli-setting',

    // Configuration Warning Runsheet
    warning_runsheet : api + 'warning-koli-record',

    // Check Delivery Area
    check_delivery_area : api + 'check-delivery-area',

    // Delivery Area
    node_delivery_area : api + 'node-delivery-area',

    // Documentation
    documentation: api + 'documentation',

    // Validation
    validation: api + 'validation'
}
