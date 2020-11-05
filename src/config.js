const api = process.env.VUE_APP_API;

export default {
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

    // node
    node: api + "node",
    node_commission: api + "node-commission",
    node_link: api + "node-link",
    node_type: api + "node-type",

    // employee
    employee: api + "employee",

    // customer
    customer: api + "customer",
    customer_type: api + "customer-type",

    // tariff
    tariff: api + "tariff",
}