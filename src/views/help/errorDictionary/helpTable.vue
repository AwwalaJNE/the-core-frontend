<template>
    <div>
        <table-master
            hideColumnKey="error-dictionary"
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :hasAction="false"
            :hasPagination="false"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
export default {
    name: 'error-dictionary',
    mixins: [master],
    components: {
        'table-master': TableMaster,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: 'Error Code',
                    key: 'code',
                    width: 'xs',
                },
                {
                    label: 'Section',
                    key: 'section',
                    width: 'xs',
                },
                {
                    label: 'Message',
                    key: 'message',
                    width: 'auto',
                },
                {
                    label: 'Description',
                    key: 'description',
                    width: 'auto',
                },
            ],
            loading: false,
        }
    },
    methods: {
        async getTableData() {
            this.loading = true
            await axios
                .get(this.URL.documentation + `/error?n=${this.listenNodeId}`, this.Helper.header())
                .then((res) => {
                    let apiData = []
                    for (const [key, value] of Object.entries(res.data.data)) {
                        apiData.push({
                            code: key,
                            section: value.section,
                            message: value.message,
                            description: value.description,
                        })
                    }

                    this.dataTable = apiData
                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        err.response?.data?.message ?? 'Fail to populate dictionary',
                        err
                    )
                })
        },
    },
    mounted() {
        this.getTableData()
    },
}
</script>
