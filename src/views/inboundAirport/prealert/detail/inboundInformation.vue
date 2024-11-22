<template>
    <div>
        <template v-if="listenLoading == false">
            <template v-if="isMobile">
                <vs-row 
                    v-for="(item, index) in datacolumn" 
                    :key="index" 
                    class="info-row"
                    align="center"
                    justify="space-between"
                >
                    <vs-col xs="12" sm="8" lg="4" class="info-label">
                        <h4>{{ item.label }}</h4>
                        <p>{{ dataTable[0][item.key] || '-' }}</p>
                    </vs-col>
                </vs-row>
            </template>
            <template v-else>
                <table-master 
                    :dataTable="dataTable" 
                    :dataColumn="datacolumn" 
                    :tableLoading="listenLoading"
                    :hasAction="false"
                    :hasPagination="false"
                />
            </template>
        </template>
    </div>
</template>
<script>
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster"
export default {
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        dataTableProp: [Array, Object],
        loading: Boolean,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: this.dataTableProp,
            datacolumn: [
                {
                    label: "Manifest No.",
                    key: "inbound_number",
                    width: "xs"
                },
                {
                    label: "Received",
                    key: "total_received",
                    width: "xxs"
                },
                {
                    label: "Unreceived",
                    key: "total_unreceived",
                    width: "xxs"
                },
                {
                    label: "Status",
                    key: "status_received",
                    width: "xxs"
                },
            ],
        }
    },
    computed: {
        listenLoading(){
            return this.loading
        },
        listendataTableProp(){
            return this.dataTableProp
        },
    },
    watch: {
        dataTableProp: function(val) {
            if(val != undefined) {
                this.dataTable = val   
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.info-row {
    border-bottom: 1px solid #eaeaea;
    
    &:last-child {
        border-bottom: none;
    }
}

.info-label {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    
    h4 {
        font-size: 0.8em;
        color: #555;
        text-align: left;
    }

    p {
        font-size: 0.8em;
        color: #000;
        text-align: right;
    }
}
</style>