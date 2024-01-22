<template>
    <div>
        <table-master 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasPagination="false"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="actionDetail"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        query: String,
        courr: Number,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "No.",
                    key: "no",
                    width: "xs"
                },
                {
                    label: "Connote / Koli",
                    key: "koli_number",
                    width: "xxs"
                },
                {
                  label: "Service",
                  key: "connote_service_code",
                  width: "xxs"
                },
                {
                  label: "COD Value",
                  key: "amount_cod",
                  width: "xxs"
                },
                {
                  label: "Status",
                  key: "status",
                  width: "xxs"
                },
                {
                  label: "Status Delivery",
                  key: "status_delivery",
                  width: "xxs"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            dialogTariff: false,
            pagination: {
                limit:1000,
                page_size: 1,
                page: 1
            }
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        },
        courr: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if (this.tempSearch == 0) {
                    this.tempSearch = ""
                }
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                    this.tempSearch = val
                }
            }
        },
    },
    // componet runshetinformation.vue
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = ""
            if(q !== undefined) {
                query = q
            }
            const deliveryNumber = this.$store.getters.getInputs.deliveryNumber
            await axios
                .get(this.URL.receiving_runsheet + '/' + deliveryNumber +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    let cour = [];
                    let dataCour = res.data.data
                    const map = new Map();
                    cour.push({
                                'value': 0,
                                'text': 'All'
                            });
                    this.$nextTick(() => {
                      this.$emit('cour-list', cour);
                      this.$emit('total-connote', res.data.data.length);
                    });
                    let no = 1;
                    this.dataTable.map(item=>{
                      item['no'] = no
                      no++
                    })
                      // Tambahkan logika untuk menentukan apakah tombol harus ditampilkan atau tidak
                    const hasNullStatus = this.dataTable.some(item => item.status === null);
                    console.log(!hasNullStatus,'has');
                    this.$store.dispatch('SET_FINISH_RECEIVING_BUTTON_VISIBILITY', !hasNullStatus);
                    console.log(res.data,'res.data.');
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate List All Connote', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
        },

        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },

        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },

        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },

        actionDetail(row){
          this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
        }

    },
    mounted() {
    }
}
</script>