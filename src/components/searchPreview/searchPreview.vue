<template>
    <div class="search-preview">
        <div class="search-input">
            <vs-input
                icon-after
                placeholder="Plese enter a keyword"
                type="text"
                v-model="value"
                :label="name" 
                @input="searchValueDebounced"
                @focus="onFocus"
                @keyup.enter="searchValue"
            >
            </vs-input>
            <button>
                <i class='bx bx-search search-input-icon' @click="searchValue"></i>
            </button>
        </div>

        <template v-if="dataTable.length > 0 && value !== '' ">
            <table-master
                :dataTable="dataTable" 
                :dataColumn="dataColumn" 
                :tableLoading="false"
                :pageSize="pagination.page_size"
                :page="pagination.page"
                :limit="pagination.limit"
                :hasPagination="false"
                :scrollableAndStaticHeader="true"
                :expandable="true"
                :searchPreviewAction="true"
                @actionSearchPreview="actionSearchPreview"
            />
        </template>
        <template v-if="!isShowDetail && cardValue.length > 0">
            <transition name="slide-fade">
                <div style="text-align:left;" class="el-select-async">
                    <div class="area-value-title">
                        <span class="c-label">{{ formatLabel(labelKey) }}*</span>
                        <span 
                            class="show-detail"
                            @click="showDataDetail"
                        >
                            Show Detail
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
                        @remove-tag="actionRemove"
                    />
                </div>
            </transition>
        </template>
        <template v-if="isShowDetail && cardValue.length > 0">
            <transition name="slide-fade">
                <div>
                    <div class="area-value-title">
                        <span class="c-label">{{ formatLabel(labelKey) }}*</span>
                        <span 
                            class="show-detail"
                            @click="showDataDetail"
                        >
                        Hide Detail
                        </span>
                    </div>
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
                </div>
            </transition>
        </template>
        
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
        labelKey: String,
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
        listenLabelKey() {
            return this.labelKey
        },
        listenTypeForm() {
            return this.typeForm;
        }
    },
    watch: {
        tableKey: function (val, old) {
            if (val !== old) {
                this.handleClear()
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
            timeoutID: null
        }
    },    
    methods: {
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
                
                this.$store.dispatch(`SET_${this.listenTypeForm.toUpperCase()}_${this.listenLabelKey.toUpperCase()}`, this.cardValue)
                
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
        async asynchronousSelect() {
            this.loading = true
            try {
                const res = await axios.get(this.listenUrl +`&s=${this.value}` + `${this.limit ? `&limit=${this.limit}` : ''}`, this.Helper.header());

                this.dataColumn = [
                    {
                        label: this.formatLabel(this.listenTableKey),
                        key: this.listenTableKey,
                        width: "md"
                    },
                ];
                this.dataTable = Array.isArray(res.data.data) && res.data.data.length > 0
                    ? res.data.data.map(item => ({
                        ...item,
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


                this.openNotification('success', null, "Success", res?.data?.message || this.courier_id ? "Success Update Data" : "Success Create Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        searchValueDebounced() {
            clearTimeout(this.timeoutID);
            this.timeoutID = setTimeout(() => {
                this.searchValue();
                this.asynchronousSelect();
            }, 1500);
        },
        searchValue() {
            let info = {
                name: this.name,
                key: this.listenFormKey,
                typeInput: this.listenTypeInput
            }

            this.$emit("updateValue", this.listenFormKey, this.value, info)
        },
        onFocus() {
            this.value = ""
        },
        handleClear() {
            this.dataTable = [];
            this.dataColumn = [];
            this.dataTableDetail = [];
            this.dataColumnDetail = [];
            this.value = [];
            this.cardValue = []
            this.isShowDetail = false
        }
    }
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