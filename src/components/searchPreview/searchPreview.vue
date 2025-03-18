<template>
    <div class="search-preview">
        <div style="text-align:left;" class="el-select-async">
            <div class="area-value-title">
                <span class="c-label">{{ name }}</span>
                <span 
                    class="show-detail"
                    @click="showDataDetail"
                    v-if="cardValue.length > 0"
                >
                    {{ isShowDetail ? 'Hide Detail' : 'Show Detail' }}
                </span>
            </div>
            
            <el-select
                v-model="cardValue"
                multiple
                filterable
                remote
                placeholder="Please enter a keyword"
                :loading="false"
                :disabled="false"
                :remote-method="asynchronousSelect"
                :popper-class="'hide-dropdown'"
                @remove-tag="actionRemove"
            >
            </el-select>
            
        </div>

        <div style="margin-top: 10px;">
            <template v-if="this.typingValue">
                <table-master
                    :dataTable="dataTable" 
                    :dataColumn="dataColumn" 
                    :tableLoading="loading"
                    :pageSize="pagination.page_size"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :hasPagination="false"
                    :scrollableAndStaticHeader="true"
                    :expandable="true"
                    :searchPreviewAction="true"
                    :isDisabled="dataTable.isDisabled"
                    @actionSearchPreview="actionSearchPreview"
                />
            </template>

            <template v-if="isShowDetail && cardValue.length > 0">
                <table-master
                    :dataTable="dataTableDetail" 
                    :dataColumn="dataColumnDetail" 
                    :tableLoading="false"
                    :pageSize="pagination.page_size"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :hasPagination="false"
                    :scrollableAndStaticHeader="true"
                    :expandable="true"
                    :removeOnly="true"
                    @actionRemove="actionRemove"
                />
            </template>
            
        </div>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import TableMaster from "@/components/table/tableMaster"
import WithKeyBoardControl from "@/components/withkeyboardcontrol";

export default {
    name: "search-preview",
    mixins: [master],
    props:{
        name: String,
        rules: String,
        formKey: String,
        arrData: Array,
        typeInput: String,
        disabled: Boolean,
        url: String,
        tableKey: String,
        typeForm: String,
    },
    components: {
        "table-master" : TableMaster,
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenTypeInput() {
            return this.typeInput
        },
        listenUrl() {
            return this.url
        },
        listenTableKey() {
            return this.tableKey.toLowerCase()
        },
        listenTypeForm() {
            return this.typeForm;
        }
    },
    watch: {
        tableKey: function (val, old) {
            if (val !== old) {
                this.$store.dispatch(`SET_${this.listenTypeForm.toUpperCase()}_${this.listenFormKey.toUpperCase()}`, '');
                this.$store.dispatch(`SET_${this.listenTypeForm.toUpperCase()}_${this.listenFormKey.toUpperCase()}_ArrData`, [])
                this.handleClearAll();
            }
        }
    },
    data() {
        return {
            dataTable: [],
            dataColumn: [],
            dataTableDetail: [],
            dataColumnDetail: [],
            pagination: {
                limit: 5,
                page_size: 1,
                page: 1
            },
            cardValue: [],
            value: "",
            isShowDetail: false,

            limit: 10,
            typingValue: '',
            loading: false
        }
    },    
    methods: {
        async initComponents() {
            this.$nextTick(() => {
                if (this.$store.getters.getInputs[this.listenTypeForm][this.listenFormKey]?.value) {
                    this.cardValue = this.$store.getters.getInputs[this.listenTypeForm][this.listenFormKey].value;
                    this.dataColumnDetail = [
                        {
                            label: this.formatLabel(this.listenTableKey),
                            key: this.listenTableKey,
                            width: "xs"
                        },
                    ]; 
                    this.asynchronousSelectOnEdit(this.cardValue);                    
                }
            });
        },
        showDataDetail() {
            this.isShowDetail = !this.isShowDetail;
        },
        actionSearchPreview(val) {
            if (!this.cardValue.includes(val[this.listenTableKey])) {
                this.cardValue.push(val[this.listenTableKey]);
                this.dataColumnDetail = [
                    {
                        label: this.formatLabel(this.listenTableKey),
                        key: this.listenTableKey,
                        width: "xs"
                    },
                ];
                this.dataTableDetail.push(val);
                
                this.$store.dispatch(`SET_${this.listenTypeForm.toUpperCase()}_${this.listenFormKey.toUpperCase()}`, this.cardValue)
                this.handleClearSearch();
                
            }
        },
        actionRemove(val) {
            const key = val[this.listenTableKey] || val;

            const index = this.cardValue.indexOf(key);
            if (index !== -1) {
                this.cardValue.splice(index, 1);
            }

            this.dataTableDetail = this.dataTableDetail.filter(item => item[this.listenTableKey] !== key); 
        },
        async asynchronousSelect(queryString) {
            this.loading = true

            this.typingValue = queryString;

            if (queryString) {
                this.handleHideDetail();
            }

            try {
                const res = await axios.get(this.listenUrl +`&s=${queryString}` + `${this.limit ? `&limit=${this.limit}` : ''}`, this.Helper.header());

                this.dataColumn = [
                    {
                        label: this.formatLabel(this.listenTableKey),
                        key: this.listenTableKey,
                        width: "md"
                    },
                ];
                
                this.dataTable = Array.isArray(res.data.data) && res.data.data.length > 0
                    ? res.data.data
                        .filter(item => !this.cardValue.includes(item[this.listenTableKey]))
                        .map(item => ({
                            ...item,
                            disabled: false,
                            children_width: Object.fromEntries(
                                Object.keys(item.detail?.[0] || {}).map(key => [key, "md"])
                            ),
                            children: item.detail?.reduce((acc, el) => {
                                Object.entries(el).forEach(([key, value]) => {
                                    acc[key] = acc[key] || [];
                                    acc[key].push(value);
                                });
                                return acc;
                            }, {}) || {}
                        }))
                    : [];


                // this.openNotification('success', null, "Success", res?.data?.message || this.courier_id ? "Success Update Data" : "Success Create Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async asynchronousSelectOnEdit(queryString) {
            this.loading = true;
            try {
                const responses = await Promise.allSettled(
                    queryString.map(query => 
                        axios.get(
                            `${this.listenUrl}&s=${query}${this.limit ? `&limit=${this.limit}` : ''}`,
                            this.Helper.header()
                        )
                    )
                );

                this.dataTableDetail = responses
                    .filter(res => res.status === "fulfilled" && Array.isArray(res.value.data.data))
                    .flatMap(res => res.value.data.data.map(item => ({
                        ...item,
                        disabled: false,
                        children_width: Object.fromEntries(
                            Object.keys(item.detail?.[0] || {}).map(key => [key, "md"])
                        ),
                        children: item.detail?.reduce((acc, el) => {
                            Object.entries(el).forEach(([key, value]) => {
                                acc[key] = acc[key] || [];
                                acc[key].push(value);
                            });
                            return acc;
                        }, {}) || {}
                    })));

                // this.openNotification('success', null, "Success", "Data Loaded Successfully");

            } catch (err) {
                this.openNotification("danger", '', "Failed", "Something went wrong");
            } finally {
                this.loading = false;
            }
        },
        handleClearAll() {
            this.dataTable = [];
            this.dataColumn = [];
            this.dataTableDetail = [];
            this.dataColumnDetail = [];
            this.value = [];
            this.cardValue = [];
            this.isShowDetail = false;
            this.typingValue = '';
        },
        handleClearSearch() {
            this.dataTable = [];
            this.dataColumn = [];
            this.typingValue = '';
        },
        handleHideDetail() {
            this.dataTableDetail = [];
            this.dataColumnDetail = [];
            this.isShowDetail = false;
        }
    },
    created() {
        this.initComponents();
    },
}
</script>
<style lang="scss" scoped>
.search-preview {
    .search-input {
        position: relative;
        .vs-input-content{
            position: relative;
            display: flex;
            align-self: flex-end;
        }
        button {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            box-shadow: -12px 0 10px -10px rgba(0,0,0,0.1);
            border: none;
            background: rgba(var(--vs-gray-2), 1);
            outline: 2px solid rgba(var(--vs-gray-2), 1);
            border-radius: 10px;
            min-width: 40px;
            margin: 10px 0;
        }
    }

    .area-value-title {
        display: flex;
        justify-content: space-between;

        .show-detail {
            cursor: pointer;

            &:hover {
                color: var(--vs-primary);
            }
        }
    }
}
</style>

<style>
.hide-dropdown .el-select-dropdown__empty {
    display: none !important;
}

.hide-dropdown {
    border: none !important;
}
</style>