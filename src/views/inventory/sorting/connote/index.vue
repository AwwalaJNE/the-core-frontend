<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="listenTitle">{{ listenTitle }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section>
            <vs-row>
                <vs-col xs="12" sm="12" lg="6">
                    <div class="box view">
                        <vs-row>
                            <vs-col xs="12" sm="12" lg="12">
                                <vs-checkbox v-model="is_auto_open_bag" @change="handleAutoOpenBag">
                                    Auto Open Bag
                                </vs-checkbox>
                            </vs-col>
                        </vs-row>
                        <vs-row style="align-items: center; margin-top: 10px">
                            <vs-col xs="12" sm="12" lg="6">
                                <vs-input
                                    border
                                    icon-after
                                    ref="formInputSorting"
                                    type="text"
                                    v-model="item_number"
                                    v-on:keyup.enter="handleEnter"
                                    v-uppercase
                                    :label-placeholder="'Masukkan Connote'"
                                    @click-icon="$refs.cameraScanner.open('formInputSorting')"
                                >
                                    <template #icon>
                                        <i class="bx bx-barcode-reader"></i>
                                    </template>
                                </vs-input>
                            </vs-col>
                            <vs-col xs="12" sm="12" lg="6">
                                <selector
                                    ref="destination"
                                    rules=""
                                    placeholder="Select Destination"
                                    formKey="destination"
                                    :loading="loading"
                                    :valueData="destinationArr"
                                    :selectedValue="destination"
                                    :isMultiple="false"
                                    :customBind="'data-kt-bag-type'"
                                    @updateValue="updateValue"
                                />
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-col>
                <vs-col w="12">
                    <div
                        class="box view"
                        v-if="destination === 'HUB_DELIVERY' || destination === 'SMARTPOINT'"
                    >
                        <template v-if="type === 'initial'">
                            <img
                                class="logo"
                                :src="bagPlaceholder"
                                alt="jne"
                                width="300"
                                align="center"
                            />
                            <h3>Scan barcode connote untuk melakukan sorting</h3>
                        </template>
                        <template v-else-if="type === 'success'">
                            <div class="success-container">
                                <vs-row class="header-row">
                                    <vs-row>
                                        <i class="bx bxs-check-circle" style="margin-top: 0"></i>
                                    </vs-row>
                                    <vs-row>
                                        <label>CONNOTE NUMBER</label>
                                    </vs-row>
                                    <vs-row>
                                        <h4 style="margin: 0">{{ sort_info.item_number }}</h4>
                                    </vs-row>
                                </vs-row>

                                <vs-row justify="center" class="mb-2" style="gap: 0.5em">
                                    <vs-col w="12">
                                        <label>{{
                                            destination === 'HUB_DELIVERY'
                                                ? 'HUB DESTINATION'
                                                : 'SMART POINT DESTINATION'
                                        }}</label>
                                        <h1 class="destination">
                                            {{ sort_info.information.destination }}
                                        </h1>
                                    </vs-col>
                                    <vs-col
                                        xs="12"
                                        md="8"
                                        lg="6"
                                        :class="
                                            listenSLAType(
                                                sort_info.information.sla_minutes_remains
                                            ) + ' sla'
                                        "
                                    >
                                        <label class="type">{{
                                            this.getSLAType(
                                                sort_info.information.sla_minutes_remains
                                            )
                                        }}</label>
                                        <br />
                                        <label class="remaining"
                                            >{{
                                                sort_info.information.sla_minutes_remains < 0
                                                    ? 'OVER BY:'
                                                    : 'SLA REMAINS:'
                                            }}
                                            {{
                                                this.convertMinutesToTimeFormat(
                                                    sort_info.information.sla_minutes_remains
                                                )
                                            }}</label
                                        >
                                        <br />
                                        <br />
                                        <label class="service">{{
                                            sort_info.information.service
                                        }}</label>
                                    </vs-col>
                                </vs-row>

                                <vs-row class="details-row">
                                    <vs-col xs="4" sm="4" lg="4">
                                        <label>ZIP CODE RECEIVER</label>
                                        <h4>{{ sort_info.information.zip_code_receiver }}</h4>
                                    </vs-col>
                                    <vs-col xs="4" sm="4" lg="4" class="details-row-center">
                                        <label>ROUTING TYPE</label>
                                        <h4
                                            :style="
                                                getRoutingStyle(sort_info.information.routing_type)
                                            "
                                        >
                                            {{ sort_info.information.routing_type || '-' }}
                                        </h4>
                                    </vs-col>
                                    <vs-col xs="4" sm="4" lg="4" class="details-row-left">
                                        <label>SLA DATE</label>
                                        <h4>
                                            {{
                                                this.formatTimezoneSLADate(
                                                    sort_info.information.sla_date
                                                )
                                            }}
                                        </h4>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </template>
                        <template v-else-if="type === 'error'">
                            <div class="error-container">
                                <vs-row class="header-row">
                                    <vs-row>
                                        <i class="bx bxs-x-circle"></i>
                                    </vs-row>
                                    <vs-row>
                                        <label>CONNOTE NUMBER</label>
                                    </vs-row>
                                    <vs-row>
                                        <h4>{{ sort_info.item_number }}</h4>
                                    </vs-row>
                                </vs-row>
                                <vs-row class="details-error-row">
                                    <p>{{ sort_info.message }}</p>
                                </vs-row>
                            </div>
                        </template>
                    </div>
                    <div class="box view" v-if="destination === 'DELIVERY_AREA'">
                        <template v-if="type === 'initial'">
                            <img
                                class="logo"
                                :src="bagPlaceholder"
                                alt="jne"
                                width="300"
                                align="center"
                            />
                            <h3>Scan barcode connote untuk melakukan sorting</h3>
                        </template>
                        <template v-else-if="type === 'success'">
                            <div class="success-container">
                                <vs-row class="header-row">
                                    <vs-row class="upper-rows">
                                        <vs-col xs="4" sm="4" lg="4" style="text-align: left">
                                            <label>SUBDISTRICT NAME</label>
                                            <h2>{{ sort_info.information.subdistrict_name }}</h2>
                                        </vs-col>
                                        <vs-col xs="4" sm="4" lg="4">
                                            <i
                                                class="bx bxs-check-circle"
                                                style="margin-top: 0"
                                            ></i>
                                        </vs-col>
                                        <vs-col xs="4" sm="4" lg="4" style="text-align: right">
                                            <label>ZIP CODE RECEIVER</label>
                                            <h2>{{ sort_info.information.zip_code_receiver }}</h2>
                                        </vs-col>
                                    </vs-row>
                                    <vs-row>
                                        <label>CONNOTE NUMBER</label>
                                    </vs-row>
                                    <vs-row>
                                        <h4 style="margin: 0">{{ sort_info.item_number }}</h4>
                                    </vs-row>
                                </vs-row>

                                <vs-row
                                    justify="center"
                                    class="mb-2"
                                    style="
                                        gap: 0.5em;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                    "
                                >
                                    <div
                                        style="
                                            display: flex;
                                            width: 50%;
                                            align-items: center;
                                            justify-content: center;
                                        "
                                    >
                                        <vs-col w="12" style="justify-content: center">
                                            <vs-row style="justify-content: center">
                                                <label>TLC AREA</label>
                                            </vs-row>
                                            <vs-row style="justify-content: center">
                                                <h2 style="margin: 0">
                                                    {{ sort_info.information.tlc_zone }}
                                                </h2>
                                            </vs-row>
                                        </vs-col>
                                        <vs-col w="12" style="justify-content: center">
                                            <vs-row style="justify-content: center">
                                                <label>DELIVERY ZONE</label>
                                            </vs-row>
                                            <vs-row style="justify-content: center">
                                                <h2 style="margin: 0">
                                                    {{ sort_info.information.delivery_zone }}
                                                </h2>
                                            </vs-row>
                                        </vs-col>
                                    </div>
                                    <vs-col
                                        xs="12"
                                        md="8"
                                        lg="6"
                                        :class="
                                            listenSLAType(
                                                sort_info.information.sla_minutes_remains
                                            ) + ' sla'
                                        "
                                    >
                                        <label class="type">{{
                                            this.getSLAType(
                                                sort_info.information.sla_minutes_remains
                                            )
                                        }}</label>
                                        <br />
                                        <label class="remaining"
                                            >{{
                                                sort_info.information.sla_minutes_remains < 0
                                                    ? 'OVER BY:'
                                                    : 'SLA REMAINS:'
                                            }}
                                            {{
                                                this.convertMinutesToTimeFormat(
                                                    sort_info.information.sla_minutes_remains
                                                )
                                            }}</label
                                        >
                                        <br />
                                        <br />
                                        <label class="service">{{
                                            sort_info.information.service
                                        }}</label>
                                    </vs-col>
                                </vs-row>

                                <vs-row class="details-row">
                                    <vs-col xs="4" sm="4" lg="4">
                                        <label>DESTINATION CODE</label>
                                        <h4>{{ sort_info.information.destination_code }}</h4>
                                    </vs-col>
                                    <vs-col xs="4" sm="4" lg="4" class="details-row-center">
                                        <label>ROUTING TYPE</label>
                                        <h4
                                            :style="
                                                getRoutingStyle(sort_info.information.routing_type)
                                            "
                                        >
                                            {{ sort_info.information.routing_type || '-' }}
                                        </h4>
                                    </vs-col>
                                    <vs-col xs="4" sm="4" lg="4" class="details-row-left">
                                        <label>SLA DATE</label>
                                        <h4>
                                            {{
                                                this.formatDateTime(sort_info.information.sla_date)
                                            }}
                                        </h4>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </template>
                        <template v-else-if="type === 'error'">
                            <div class="error-container">
                                <vs-row class="header-row">
                                    <vs-row>
                                        <i class="bx bxs-x-circle"></i>
                                    </vs-row>
                                    <vs-row>
                                        <label>CONNOTE NUMBER</label>
                                    </vs-row>
                                    <vs-row>
                                        <h4>{{ sort_info.item_number }}</h4>
                                    </vs-row>
                                </vs-row>
                                <vs-row class="details-error-row">
                                    <p>{{ sort_info.message }}</p>
                                </vs-row>
                            </div>
                        </template>
                    </div>
                </vs-col>
                <vs-col w="12">
                    <div class="box view">
                        <vs-row justify="space-between" class="my-05">
                            <vs-col xs="12" sm="12" lg="4">
                                <h4 style="text-align: left">Sorting History</h4>
                            </vs-col>
                            <vs-col xs="12" sm="12" lg="6" style="padding: 0">
                                <vs-row justify="end">
                                    <vs-col xs="12" sm="6" lg="4" style="margin-top: 8px">
                                        <select-search-by
                                            :border="true"
                                            :isMultiple="false"
                                            :selectedValue="searchBy"
                                            :valueData="searchParams"
                                            @updateSearchBy="updateSearchBy"
                                        />
                                    </vs-col>
                                    <vs-col xs="12" sm="6" lg="4" style="margin-top: 8px">
                                        <search-input
                                            ref="searchInput"
                                            :placeholder="searchPlaceholder"
                                            @searchValue="searchValue"
                                        />
                                    </vs-col>
                                </vs-row>
                            </vs-col>
                        </vs-row>
                        <table-master
                            hideColumnKey="sorting-connote"
                            :dataTable="dataTable"
                            :dataColumn="datacolumn"
                            :tableLoading="loading"
                            :pageSize="pagination.page_size"
                            :page="pagination.page"
                            :limit="pagination.limit"
                            :hasAction="false"
                            :hasPagination="true"
                            @actionLimit="actionLimit"
                            @actionPagination="actionPagination"
                        />
                    </div>
                </vs-col>
            </vs-row>
        </section>
        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    </div>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'

import AutoComplete from '@/components/input/autoComplete'
import Breadcrumb from '@/components/breadcrumb/index'
import CameraScanner from '@/components/scanner/camera'
import Selector from '@/components/input/select'
import SearchInput from '@/components/search/searchInput'
import SelectSearchBy from '@/components/search/selectSearchBy'
import TableMaster from '@/components/table/tableMaster'

import bagPlaceholder from '@/assets/img/bagging-placeholder.png'

export default {
    name: 'inventory-sorting-connote',
    mixins: [master],
    components: {
        'auto-complete': AutoComplete,
        breadcrumb: Breadcrumb,
        'camera-scanner': CameraScanner,
        selector: Selector,
        'search-input': SearchInput,
        'select-search-by': SelectSearchBy,
        'table-master': TableMaster,
    },
    watch: {
        item_number(newValue) {
            if (!newValue) {
                this.type = 'initial'
                this.sort_info = {}
            }
        },
    },
    data() {
        return {
            bagPlaceholder,
            title: 'Sorting Connote',
            item_number: '',
            form: {},
            loading: false,
            destination: 'HUB_DELIVERY',
            destinationArr: [
                {
                    label: 'Hub Delivery',
                    value: 'HUB_DELIVERY',
                },
                {
                    label: 'Courier Area',
                    value: 'DELIVERY_AREA',
                },
                {
                    label: 'Smart Point',
                    value: 'SMARTPOINT',
                },
            ],
            loading: false,
            dataTable: [],
            datacolumn: [
                {
                    label: 'Connote Number',
                    key: 'connote_number',
                    width: 'sm',
                },
                {
                    label: 'Destination',
                    key: 'destination',
                    width: 'sm',
                },
                {
                    label: 'Status',
                    key: 'status',
                    width: 'sm',
                },
                {
                    label: 'Timestamp',
                    key: 'timestamp',
                    width: 'sm',
                },
            ],
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1,
            },
            tempSearch: '',
            searchPlaceholder: 'Search Connote',
            searchBy: 'connote_number',
            searchByDataType: false,
            searchParams: [
                {
                    label: 'Connote',
                    value: 'connote_number',
                },
                {
                    label: 'Destination',
                    value: 'destination',
                },
            ],
            type: 'initial',
            sort_info: {},
            is_auto_open_bag: true,
        }
    },
    computed: {
        listenTitle() {
            return this.title
        },
    },
    methods: {
        getRoutingStyle(type) {
            if (!type) return {}

            const colorMap = {
                INTRACITY: '#2196F3', // Blue
                INTERCITY: '#795548', // Brown
                DOMESTIC: '#FF9800', // Orange
                INTERNATIONAL: '#9C27B0', // Purple
            }

            const bgColor = colorMap[type.toUpperCase()] || '#9E9E9E' // Default gray

            return {
                color: '#fff',
                backgroundColor: bgColor,
                padding: '8px',
                borderRadius: '8px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '14px',
                minWidth: '120px',
                placeSelf: 'center',
            }
        },
        handleAutoOpenBag(val) {
            this.is_auto_open_bag = val.target.checked
        },
        updateValue(key, val, info) {
            switch (key) {
                case 'destination':
                    this.handleClearForm()
                    this.destination = val
                    this.setActiveInput('formInputSorting')
            }
        },
        updateSearchBy(key, val, dataType) {
            this.searchBy = val
            this.searchPlaceholder = key
            this.searchByDataType = dataType
            this.refresh()
        },
        searchValue(val) {
            this.tempSearch = val
            this.refresh()
        },
        handleEnter() {
            this.processSorting()
            this.item_number = ''
        },
        handleClearForm() {
            this.form = {}
            this.item_number = ''
            this.destination = 'HUB_DELIVERY'
            this.type = 'initial'
            this.sort_info = {}
        },
        async processSorting() {
            if (this.destination && this.item_number) {
                this.form = {
                    item_number: this.item_number,
                    destination_scope: this.destination,
                    auto_open_bag: this.is_auto_open_bag,
                }

                this.loading = true
                try {
                    const res = await axios.post(
                        `${this.URL.sorting_validation}?n=${this.listenNodeId}`,
                        JSON.stringify(this.form),
                        this.Helper.header()
                    )

                    this.sort_info = res.data
                    this.type = 'success'

                    this.openNotification(
                        'success',
                        null,
                        'Success',
                        res?.data?.message || 'Success'
                    )
                } catch (err) {
                    this.sort_info = err.response.data
                    this.type = 'error'

                    this.openNotification(
                        'danger',
                        err?.response?.data?.code || '',
                        'Failed',
                        err?.response?.data?.message || 'Something went wrong'
                    )
                } finally {
                    this.loading = false
                    // TODO: RECHECK IT LATER
                    // this.is_auto_open_bag = true;
                    this.refresh()
                    // TODO: Use Later
                    // this.handleClearForm();
                }
            } else {
                this.openNotification('danger', '', 'Failed', 'Destination is mandatory')
            }
        },
        onCameraScannerGetData(data) {
            if (data && data.event === 'result' && data.namespace === 'formInputSorting') {
                this.item_number = data.data.text
                this.updateValue()
            }
        },
        refresh() {
            this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.tempSearch,
                this.searchBy
            )
        },
        async getTableData(limit, page, q, searchBy) {
            this.loading = true

            let query = q || ''

            try {
                const res = await axios.get(
                    `${this.URL.sorting_item_history}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}&item_type=KOLI`,
                    this.Helper.header()
                )

                if (res.data.data.length > 0) {
                    let arr = res.data.data

                    arr.map((item) => {
                        item['timestamp'] = this.formatTimezone(item.timestamp)
                    })
                    this.dataTable = arr
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page, 10),
                        page_size: res.data.meta.last_page,
                    }
                } else {
                    this.dataTable = []
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
        listenSLAType(sla) {
            if (sla < 0) {
                return 'over'
            } else if (sla < 30) {
                return 'warning'
            }
            return 'safe'
        },
    },
    mounted() {
        this.refresh()
        this.setActiveInput('formInputSorting')
        window.addEventListener('timezone-changed', this.refresh)
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
    },
}
</script>

<style scoped>
.success-container {
    text-align: center;
}

.header-row {
    padding: 1rem;

    .vs-row {
        justify-content: center !important;
    }

    i {
        color: green;
        font-size: 4rem;
        margin: 10px;
    }
}

.details-row {
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin-top: 1rem;
}

.details-row-center {
    text-align: center;
}

.details-row-left {
    text-align: right;
}

.error-container {
    padding: 1rem;

    .vs-row {
        justify-content: center !important;
    }

    i {
        color: red;
        font-size: 4rem;
        margin: 10px;
    }
}

.details-error-row {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
}

.destination {
    -webkit-text-stroke: 0.5px #424242;
    margin: 0;
    font-size: 2rem;
}

.sla {
    color: white;
    border-radius: 1.5em;
    padding: 0.5em 0;
    font-weight: bold;
    .type {
        font-size: 2.5rem;
        margin: 0;
    }
    .remaining {
        font-size: 0.75rem;
    }
    .service {
        font-size: 1.5rem;
        margin: 0;
    }
}

.over {
    background-color: red;
}

.warning {
    background-color: orange;
}

.safe {
    background-color: green;
}

.searchbox {
    .vs-input-content {
        max-width: none !important;
        width: 100%;
    }
}
</style>
