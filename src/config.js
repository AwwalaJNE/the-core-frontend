const api = process.env.VUE_APP_API;

console.log('process.env.VUE_APP_API',process.env.VUE_APP_API);
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

    // employee
    employee: api + "employee",

    // customer
    customer: api + "customer",
    customer_type: api + "customer-type",
    search_customer_code: api + "search-customer-code",

    // tariff
    tariff: api + "tariff",
    tariff_special: api + "tariff-special",

    //surcharge
    surcharge: api + "surcharge",
    surcharge_type: api + "surcharge-type",

    //vehicle
    vehicle: api + "vehicle",
    vehicle_mode: api + "vehicle-mode",
    vehicle_type: api + "vehicle-type",

    // transaction
    tariff_shipping_service: api + "tariff-shipping-service",
    connote: api + "connote",
    transaction: api + "transaction",
    koli: api + "koli",
    bag: api + "bag",
    unbagging: api + "unbagging",
    cash_register: api + "cash-register",
    payment: api + "payment",

    // PRINT
    print: api + "print",

    //PICKUP
    pickup: api + "pickup",

    //PICKUP REQUEST
    pickup_request: api + "pickup/request",

    //PICKUP SCHEDULE
    pickup_schedule: api + "pickup-schedule",

    //INBOUND
    inbound: api + "inbound",

    //INBOUND INCOMING
    inbound_incoming: api + "inbound-incoming",

    //INBOUND RECEIVING
    receiving: api + "receiving",

    //SURAT JALAN
    manifest_delivery_order: api + "manifest-delivery-order",

    //delivery runsheet
    delivery : api + "delivery",

    //delivery return
    delivery_return : api + "delivery/return",

    //delivery cod
    delivery_cod : api + "delivery/cod",

    //delivery cod history
    delivery_cod_history : api + "delivery/cod/history",

    //SURAT MUATAN
    surat_muatan: api + "manifest",

    //display-list-status
    status: api + "status",

}