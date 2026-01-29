<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->
<template>
    <vs-row>
        <vs-col xs="12" sm="6" lg="6">
            <div class="box view">
                <div class="summary-unbag">
                    <span class="subtitle" align="right"
                        ><p>{{ total_bag }}</p></span
                    >
                    <span class="title" align="right"><h4>Unbagged</h4></span>
                </div>
                <table-master
                    hideColumnKey="open-bag-master"
                    :dataTable="dataTableBag"
                    :dataColumn="datacolumn"
                    :tableLoading="loading"
                    :pageSize="pagination.page_size"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :hasAction="false"
                    :removeOnly="false"
                    :hasPagination="false"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"
                />
            </div>
        </vs-col>
        <vs-col xs="12" sm="6" lg="6">
            <div class="box view">
                <div class="summary-unbag">
                    <div
                        style="
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                        "
                    >
                        <div>
                            <switchNih
                                v-if="showSwitchNih"
                                name="Auto SJ|Manual"
                                formKey="is_auto_sj"
                                :valueData="is_auto_sj"
                                @updateValue="updateValueSwitch"
                            />
                        </div>

                        <div>
                            <span class="title" align="right"><h4>Item Scanned</h4></span>
                            <span class="subtitle" align="right"
                                ><p>
                                    {{ total_confirmed }}/{{ total_confirmed + total_unconfirmed }}
                                </p></span
                            >
                        </div>
                    </div>
                </div>
                <table-master
                    hideColumnKey="open-bag-master"
                    :dataTable="dataTable"
                    :dataColumn="datacolumn"
                    :tableLoading="loading"
                    :pageSize="pagination.page_size"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :hasAction="false"
                    :removeOnly="false"
                    :hasPagination="true"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"
                />
            </div>
        </vs-col>
    </vs-row>
</template>
<script>
import Switch from '@/components/input/switch'
import TableMaster from '@/components/table/tableMaster.vue'
import master from '@/mixins/master'
import axios from 'axios'
export default {
    name: 'open-bag',
    mixins: [master],
    props: {
        itemNumber: String,
        bagId: String,
        resetInput: Function,
        saveBagNumber: Function,
    },
    components: {
        'table-master': TableMaster,
        switchNih: Switch,
    },
    data() {
        return {
            dataTable: [],
            dataTableBag: [],
            datacolumn: [
                {
                    label: 'No',
                    key: 'no',
                    width: 'xs',
                },
                {
                    label: 'Items',
                    key: 'item_number',
                    width: 'auto',
                },
            ],
            loading: false,
            bag_number: '',
            item_number: '',
            total_bag: 0,
            total_confirmed: 0,
            total_unconfirmed: 0,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            is_auto_sj: false,
            showSwitchNih: false,
        }
    },
    watch: {
        itemNumber: function (val, old) {
            if (val !== undefined && val !== null && val !== '') {
                this.item_number = val
                if (this.item_number !== old || this.item_number !== null) {
                    this.getTableData(this.pagination.limit, 1)
                }
            }
        },
    },
    methods: {
        async getTableData(limit, page) {
            this.loading = true
            let form = {}
            let itemNumber = ''

            if (this.item_number !== undefined) {
                itemNumber = this.item_number
                form.item_number = this.item_number
            }
            if (this.bag_number !== null || this.bag_number !== undefined) {
                form.bag_number = this.bag_number
            }

            form.is_auto_sj = this.is_auto_sj

            await axios
                .post(
                    this.URL.unbagging + `/bag?n=${this.listenNodeId}&limit=${limit}&page=${page}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.bag_number != undefined) {
                        let data = res.data.data
                        this.showSwitchNih =
                            data.is_consolidated === '1' || data.is_consolidated === 1

                        if (data.unbagging_summary !== null && res.data.detail !== null) {
                            this.bag_number = data.bag_number
                            this.$emit('saveBagNumber', this.bag_number)
                            this.total_bag = 1
                            let dataBag = {
                                no: 1,
                                item_number: data.bag_number,
                            }
                            this.dataTableBag = [dataBag]
                            let item_detail = res.data.detail.map((el, idx) => {
                                return {
                                    no: idx + 1,
                                    item_number: el.item_number,
                                }
                            })
                            this.dataTable = item_detail
                            this.total_confirmed = data.unbagging_summary[0].total_confirmed
                            this.total_unconfirmed = data.unbagging_summary[0].total_unconfirmed
                            this.pagination.page = res.data.meta.current_page
                            this.pagination.limit = parseInt(res.data.meta.per_page)
                            this.pagination.page_size = res.data.meta.last_page
                            this.openNotification('success', null, 'Success', 'Scan Item Success')
                        } else {
                            this.dataTable = []
                            this.dataTableBag = []
                            this.handleClearData()
                            this.openNotification('success', null, 'Unbagging is Success')
                        }
                    }

                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed to populate Connote',
                        err?.response?.data?.message ? err.response.data.message : err
                    )
                })
        },
        handleClearData() {
            this.bag_number = ''
            this.item_number = ''
            this.total_confirmed = 0
            this.total_unconfirmed = 0
            this.total_bag = 0
            this.$emit('resetInput', 'RESET')
        },
        actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            this.handlePagination()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.handlePagination()
        },
        refresh(val) {
            this.getTableData(this.pagination.limit, this.pagination.page, this.bag_id)
        },
        async handlePagination() {
            this.loading = true
            await axios
                .get(
                    this.URL.unbagging +
                        `/bag/${this.bag_number}?n=${this.listenNodeId}&limit=${this.pagination.limit}&page=${this.pagination.page}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.detail.length !== 0) {
                        let item_detail = res.data.detail.map((el, idx) => {
                            return {
                                no: idx + 1,
                                item_number: el.item_number,
                            }
                        })
                        this.dataTable = item_detail
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    }

                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Failed to change page',
                        err?.response?.data?.message ?? err
                    )
                })
        },
        updateValueSwitch(formKey, value) {
            this[formKey] = value
        },
    },
}
</script>
<style lang="scss">
.summary-unbag p {
    margin-top: 0px;
    margin-bottom: 0px;
}
.summary-unbag h4 {
    margin-top: 0px;
}
</style>
