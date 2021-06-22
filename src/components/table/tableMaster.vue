<!--
    - @desc component table yg reusable
    - @param -
    - @emit {
        - getTableData | trigger get data lagi setelah melakukan filter atau searching | payload = query searching/filter
        - handleEdit | trigger put action  | payload = data
        - handleDelete | trigger delete action  | payload = data
        - actionLimit | trigger get data lagi setelah mengubah limit pada pagination
        - actionPagination | trigger get data lagi setelah ganti page pada pagination
    }
    - @props {
        - width: String | 'md','sm','xs','xxs','auto'
        - dataTable: Array,
        - dataColumn: Array,
        - tableLoading: Boolean,
        - pageSize: [Number, String],
        - page: [Number, String],
    }
-->
<template>
    <div>
        <vs-table ref="tablee" v-model="selected">
            <template #header>
                <template v-if="listenIsSearchAble">
                    <vs-input v-model="search" border placeholder="Search" />
                </template>
            </template>
            <template #thead>
                <vs-tr>
                    <template v-if="listenIsMultipleSelect">
                        <vs-th>
                            <vs-checkbox
                                :indeterminate="selected.length == listenDataTable.length" v-model="allCheck"
                                @change="selected = $vs.checkAll(selected, listenDataTable)"
                            />
                        </vs-th>
                    </template>
                    
                    <template v-if="listenColumn.length > 0">
                        <template v-for="(item, key) of listenColumn">
                            <template v-if="!item.hasOwnProperty('hidden')">
                                <vs-th :key="key" :class="item.width ? item.width : ''">
                                    {{ item.label }}
                                </vs-th>
                            </template>
                        </template>
                        <template v-if="hasAction == true">
                            <vs-th class="action">
                                Action
                            </vs-th>
                        </template>
                      <template v-if="removeOnly == true">
                        <vs-th class="action">
                          Action
                        </vs-th>
                      </template>
                      <template v-if="pickupListAction == true">
                        <vs-th class="action">
                          Action
                        </vs-th>
                      </template>
                      <template v-if="printAction == true || avoidAction == true || codAction == true || customBtn == true || customAction == true">
                        <vs-th class="action">
                          Action
                        </vs-th>
                      </template>
                    </template>
                </vs-tr>
            </template>
            <template #tbody>
                <template v-if="listenDataTable.length > 0">
                    <vs-tr 
                        :key="key"
                        v-for="(item, key) in $vs.getPage($vs.getSearch(listenDataTable, search), localPage, localmax)"
                        :data="item"
                        :is-selected="!!selected.includes(item)"
                    >
                        <template v-if="listenIsMultipleSelect">
                            <vs-td checkbox class="xs">
                                <vs-checkbox :val="item" v-model="selected" @change="updateSelected"/>
                            </vs-td>
                        </template>
                        
                        <template v-for="(column, key) of listenColumn">
                            <template v-if="!column.hasOwnProperty('hidden')">
                                <template v-if="column.type !== undefined && column.type.toLowerCase() === 'text'">
                                    <vs-td :key="key" :class="column.width ? column.width : ''">
                                        <template v-if="split(column.key).length == 2 && item.hasOwnProperty(split(column.key)[0])">
                                            {{ item.hasOwnProperty(split(column.key)[0]) ? item[split(column.key)[0]][split(column.key)[1]] : '' }}
                                        </template>
                                        <template v-else>
                                            {{ item[column.key] ? item[column.key] : '' }}
                                        </template>
                                    </vs-td>
                                </template>
                                <template v-else-if="column.type !== undefined && column.type.toLowerCase().includes('boolean')">
                                    <vs-td :key="key" :class="column.width ? column.width : ''">
                                        
                                        <checkbox :isChecked="item[column.key]" :isDisabled="column.type.toLowerCase().includes('disabled')" :formKey="`${column.key}|${item[listenColumn[0].key]}`" :dataObj="item" @updateValue="updateValue"/>
                                    </vs-td>
                                </template>
                                <template v-else-if="column.type !== undefined && column.type.toLowerCase().includes('inputan')">
                                    <vs-td :key="key" :class="column.width ? column.width : ''">
                                        <template v-if="column.typeInput !== undefined && column.typeInput.toLowerCase() === 'select'">
                                            <template v-if="column.data !== undefined && Array.isArray(column.data)">
                                                <template v-if="column.data.length > 0">
                                                    <div style="margin-top:10px;">
                                                        <!-- {{`${column.key}|${item[listenColumn[0].key]}`}} -->
                                                        <!-- "`${column.key}|${item[listenColumn[0].key]}`" kesepakatan bersama column key 0 adalah id -->
                                                        <selector
                                                        :name="column.label" 
                                                        :rules="''" 
                                                        :formKey="`${column.key}|${item[listenColumn[0].key]}`"
                                                        :valueData="column.data"
                                                        :selectedValue="item[column.selectedValue] ? item[column.selectedValue] : item[column.key]"
                                                        :isMultiple="false"
                                                        :dataObj="item"
                                                        autocomplete="off"
                                                        @updateValue="updateValue" />
                                                    </div>
                                                </template>
                                            </template>
                                        </template>
                                        <template v-else-if="column.typeInput !== undefined && column.typeInput.toLowerCase() === 'text'">
                                            <input-general 
                                            :name="column.label"
                                            :rules="''"
                                            :formKey="`${column.key}|${item[listenColumn[0].key]}`"
                                            :valueData="''"
                                            :typeInput="'text'"

                                            @updateValue="updateValue" />
                                        </template>
                                    </vs-td>
                                </template>
                                <template v-else-if="column.type !== undefined && column.type.toLowerCase() === 'status'">
                                    <vs-td :key="key" :class="column.width ? column.width : ''">
                                        <template v-if="item[column.key] !== undefined">
                                            <vs-button
                                                circle
                                                icon
                                                border
                                                disabled
                                                :danger="item[column.key] == false ? true : false"
                                                :active="false"
                                            >
                                                <i :class="`bx bx-${item[column.key] == false ? 'x' : 'check'}`"></i>
                                            </vs-button>
                                        </template>
                                    </vs-td>
                                </template>
                                <template v-else>
                                    <vs-td :key="key" :class="column.width ? column.width : ''">
                                        <template v-if="split(column.key).length == 2 && item.hasOwnProperty(split(column.key)[0])">
                                            {{ item.hasOwnProperty(split(column.key)[0]) ? item[split(column.key)[0]][split(column.key)[1]] : '' }}
                                        </template>
                                        <!--column custom linked -->
                                        <template v-else-if="hasLinked !== undefined && hasLinked.length > 0 && column.key !== undefined && column.key.toLowerCase() === hasLinked[0]">
                                        <span class="text-link" @click="handleEdit(item)">{{  item[column.key] ? item[column.key] : '' }}</span>
                                        </template>
                                        <template v-else>
                                            {{ item[column.key] ? item[column.key] : '' }}
                                        </template>
                                    </vs-td>
                                </template>
                            </template>
                        </template>

                        <template v-if="customBtn == true">
                            
                            <vs-td class="action">
                                <vs-button
                                    block
                                    flat
                                    :disabled="item.hasOwnProperty('isDisabled') && item.isDisabled == true"
                                    :active="true"
                                    @click="actionUpdate(item)"
                                    >
                                    <span>{{customBtn_label}}</span>
                                </vs-button>    
                            </vs-td>
                                
                        </template>

                        <template v-if="customAction == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <template v-if="listCustomActionList.length > 0">
                                        
                                            <template v-for="(actionItem, keyActionItem) in listCustomActionList">
                                                <vs-col w="3" :key ="keyActionItem">
                                                    <!-- <template v-if="actionItem.hasOwnProperty('option')">
                                                        item.isDisabled == true
                                                        item.hasOwnProperty('isDisabled') ? item.isDisabled == true : false
                                                        item["button_status"][actionItem.key.toLowerCase()]
                                                    </template> -->

                                                    <vs-button
                                                        block
                                                        flat
                                                        size="small"
                                                        :disabled="item.hasOwnProperty('isDisabled') ? item.isDisabled == true : item.hasOwnProperty('button_status') ? 
                                                        (item['button_status'].hasOwnProperty([actionItem.key.toLowerCase()]) ? 
                                                        (item['button_status'][actionItem.key.toLowerCase()] == false ? true :false) 
                                                        : false) 
                                                        : false"
                                                        :danger="actionItem.attribute.toLowerCase().includes('danger') ? true : false"
                                                        :warn="actionItem.attribute.toLowerCase().includes('warn') ? true : false"
                                                        :active="true"
                                                        @click="actionUpdate(item, actionItem.key)"
                                                    >
                                                        <span>{{actionItem.label}}</span>
                                                    </vs-button>
                                                </vs-col>
                                            </template>
                                        
                                    </template>
                                </vs-row>
                            </vs-td>
                        </template>

                        <template v-if="hasAction == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            
                                            flat
                                            size="small"
                                            :active="true"
                                            @click="actionUpdate(item)"
                                        >
                                            <span>Edit</span>
                                        </vs-button>
                                    </vs-col>
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            danger
                                            size="small"
                                            flat
                                            :active="true"
                                            type="submit"
                                            @click="actionRemove(item)"
                                        >
                                            <span>Remove</span>
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                      <template v-if="removeOnly == true">
                        <vs-td class="action">
                          <vs-row justify="center" class="btn_action">
                            <vs-col w="4">
                              <vs-button
                                  block
                                  size="small"
                                  flat
                                  :active="true"
                                  type="submit"
                                  @click="actionRemove(item)"
                              >
                                <span>Remove</span>
                              </vs-button>
                            </vs-col>
                          </vs-row>
                        </vs-td>
                      </template>
                      <template v-if="printAction == true">
                        <vs-td class="action">
                          <vs-row justify="center" class="btn_action">
                            <template v-if="avoidAction == true">
                              <vs-col w="4">
                                <vs-button
                                    block
                                    warn
                                    size="small"
                                    flat
                                    :active="true"
                                    type="submit"
                                    @click="actionAvoid(item)"
                                >
                                  <span>Avoid</span>
                                </vs-button>
                              </vs-col>
                            </template>
                            
                            <template v-if="updateAction == true">
                              <vs-col w="4">
                                <vs-button
                                    block
                                    size="small"
                                    flat
                                    :active="true"
                                    @click="actionUpdate(item)"
                                >
                                  <span>Edit</span>
                                </vs-button>
                              </vs-col>
                            </template>
                            

                            <vs-col w="4">
                              <vs-button
                                  block
                                  size="small"
                                  flat
                                  :active="true"
                                  @click="actionPrint(item)"
                              >
                                <span>Print</span>
                              </vs-button>
                            </vs-col>
                          </vs-row>
                        </vs-td>
                      </template>


                      <template v-if="pickupListAction == true">
                        <vs-td class="action">
                          <vs-row justify="center" class="btn_action">
                            <template v-if="cancelRequestAction == true">
                              <vs-col w="4">
                                <vs-button
                                    block
                                    :disabled="item.hasOwnProperty('isDisabled') && item.isDisabled == true"
                                    size="small"
                                    flat
                                    :active="true"
                                    @click="actionCancel(item)"
                                >
                                  <span>Cancel</span>
                                </vs-button>
                              </vs-col>
                              <vs-col w="4">
                                <vs-button
                                    block
                                    size="small"
                                    flat
                                    :active="true"
                                    @click="actionPrint(item)"
                                >
                                  <span>Print</span>
                                </vs-button>
                              </vs-col>
                            </template>
                            <template v-else>
                              <vs-col w="4">
                                <vs-button
                                    block
                                    warn
                                    :disabled="item.hasOwnProperty('isDisabled') && item.isDisabled == true"
                                    flat
                                    size="small"
                                    :active="true"
                                    type="submit"
                                    @click="actionPicked(item)"
                                >
                                  <span>Picking</span>
                                </vs-button>
                              </vs-col>
                              <vs-col w="4">
                                <vs-button
                                    block
                                    :disabled="item.hasOwnProperty('isDisabled') && item.isDisabled == true"
                                    flat
                                    size="small"
                                    :active="true"
                                    @click="actionUpdate(item)"
                                >
                                  <span>Edit</span>
                                </vs-button>
                              </vs-col>

                              <vs-col w="4">
                                <vs-button
                                    block
                                    :disabled="item.hasOwnProperty('isDisabled') && item.isDisabled == true"
                                    flat
                                    size="small"
                                    :active="true"
                                    @click="actionCancel(item)"
                                >
                                  <span>Cancel</span>
                                </vs-button>
                              </vs-col>
                            </template>

                          </vs-row>
                        </vs-td>
                      </template>

                      <template v-if="codAction == true">
                        <vs-td class="action">
                          <vs-row justify="center" class="btn_action">
                            <vs-col w="4">
                              <vs-button
                                  block
                                  size="small"
                                  flat
                                  :active="true"
                                  type="submit"
                                  @click="actionCollect(item)"
                              >
                                <span>Collect</span>
                              </vs-button>
                            </vs-col>
                          </vs-row>
                        </vs-td>
                      </template>

                        <template v-if="listenExpandable" #expand>
                            <div class="con-content">
                                <template v-if="item.hasOwnProperty('children') && Object.keys(item.children).length > 0">
                                    <table>
                                        <tr>
                                            <th v-for="(c_item, c_key) in Object.keys(item.children)" :key="c_key">
                                                {{c_item.replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, " ")}}
                                            </th>
                                        </tr>
                                        <tr>
                                            <template v-for="(c_item, c_td_key) in Object.keys(item.children)">
                                                <template v-if="Array.isArray(item.children[c_item])">
                                                   <td :key="c_td_key">
                                                       <ul>
                                                           <li v-for="(itm, idx) in item.children[c_item]" :key="idx">
                                                               <template v-if="typeof itm === 'object'">
                                                                   <template v-for="(itm_keys, itm_i) in Object.keys(itm)">
                                                                       <p :key="itm_i">{{itm_keys+' = '+itm[itm_keys]}}</p>
                                                                   </template>
                                                               </template>
                                                               <template v-else>
                                                                   <p>{{itm}}</p>
                                                               </template>
                                                           </li>
                                                       </ul>
                                                   </td>
                                                </template>
                                                <template v-else>
                                                    <td :key="c_td_key">
                                                       {{item.children[c_item]}}
                                                   </td>
                                                </template>
                                                
                                            </template>
                                        </tr>
                                    </table>
                                </template>
                            </div>
                        </template>
                    </vs-tr>
                </template>
            </template>
            <template #footer>
                <template v-if="listenIsLocalPagination">
                    <vs-pagination v-model="localPage" :length="$vs.getLength($vs.getSearch(listenDataTable, search), localmax)" />
                </template>
            </template>
        </vs-table>
    
        <template v-if="hasPagination == true">
            <vs-row class="mt-2" justify="flex-end">
                <vs-col w="8">
                    <pagination-master
                    :page ="pagination.page" 
                    :limit="pagination.limit" 
                    :pageSize="pagination.page_size"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"/>
                </vs-col>
            </vs-row>
        </template>
        
    </div>
</template>
<script>
import Pagination from "@/components/pagination/pagination.vue"
import Checkbox from "@/components/input/checkbox.vue"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
export default {
    name:"tabelMaster",
    components: {
        "pagination-master" : Pagination,
        "checkbox" : Checkbox,
        "input-general": InputGeneral,
        "selector": Selector,
    },
    props: {
        dataTable: Array,
        dataColumn: Array,
        tableLoading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        hasAction: Boolean,
        hasPagination: Boolean,
        expandable: Boolean,
        hasLinked:Array,
        removeOnly: Boolean,
        printAction: Boolean,
        pickupListAction:Boolean,
        updateAction: Boolean,
        avoidAction: Boolean,
        pickedAction: Boolean, //pickup list action picked
        cancelRequestAction: Boolean, //pickup request action cancel,
        codAction: Boolean,
        customBtn: Boolean,
        customBtn_label: String,

        isMultipleSelect: Boolean,
        selectedData: Array,
        isSearchAble: Boolean,
        isLocalPagination: Boolean,

        customAction: Boolean,
        customActionList: Array, 
    },
    data() {
        return {
            tableHeader: [],
            tableBody: this.dataTable ? this.dataTable : [],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            loading: false,
            refloading: null,

            allCheck: false,
            selected: this.selectedData || [],
            search: '',

            localPage: 1,
            localmax: 20,
        }
    },
    computed: {
        listenColumn() {
            return this.dataColumn
        },
        listenDataTable() {
            // console.log('computed master table data', this.dataTable)
            // console.log("-----------------")
            return this.dataTable
        },
        listenTableLoading() {
            return this.tableLoading
        },
        listenExpandable () {
            return this.expandable || false
        },
        listCustomActionList() {
            return this.customActionList || []
        },
        listenIsMultipleSelect() {
            return this.isMultipleSelect
        },
        listenIsSearchAble() {
            return this.isSearchAble
        },
        listenIsLocalPagination() {
            return this.isLocalPagination
        },
        
        
    },
    watch: {
        tableLoading: function(val) {
            if(val !== undefined){
                this.loading = val
                if(val == true) {
                    this.loadingHandler()
                } else {
                    this.closeLoading()
                }
                
            }
        },
        selectedData: function(val) {
            if(val !== undefined) {
                this.selected = val
                console.log('this.selected', this.selected)
            }
        },
        pageSize: function(val) {
            if(val !== undefined) {
                this.pagination.page_size = val
            }
        },
        page: function(val) {
            if(val !== undefined) {
                this.pagination.page = val
            }
        },
        limit: function(val) {
            if(val !== undefined) {
                this.pagination.limits = val
            }
        }
    },
    methods: {
        split(arr){
            return arr.split(".")
        },
        loadingHandler(){
            this.refloading = this.$vs.loading({
                target: this.$refs.tablee,
                type:'scale',
                text: 'Loading...',
                background: '#EAEAEA',
            })
        },
        closeLoading(){
            this.refloading !== null ? this.refloading.close() : ''
        },
        handleColumnsOrder(){
            this.tableHeader = this.dataColumn ? this.dataColumn : []
        },
        actionLimit(val){
            this.$emit("actionLimit", val)
        },
        actionPagination(val) {
            this.$emit("actionPagination", val)
        },
        actionUpdate(val, key) {
            this.$emit("actionUpdate", val, key)
        },
        actionCollect(val) {
            this.$emit("actionCollect", val)
        },
        actionRemove(val) {
            this.$emit("actionRemove", val)
        },
        actionPrint(val) {
          this.$emit("actionPrint", val)
        },
        actionAvoid(val) {
          this.$emit("actionAvoid", val)
        },
        
        //pickup list action picked
        actionPicked(val) {
          this.$emit("actionPicked", val)
        },
        actionCancel(val) {
          this.$emit("actionCancel", val)
        },

        updateValue(key, val, info = {}, dataObj){
            if(this.listenIsMultipleSelect == true && dataObj != undefined) {
                if(!!this.selected.includes(dataObj) == false) {
                    this.selected.push(dataObj)
                }
            }
            this.$emit("updateValue", key, val, info)
        },

        updateSelected() {
            this.$emit("updateSelected", this.selected)
        },

        handleEdit(val) {
          this.$emit("handleEdit", val);
        },
    },
    mounted() {
        this.handleColumnsOrder()
    },
}
</script>
<style lang="scss">
    .vs-table{
        table{
            text-align: left;
            .md{
                width: calc(100% / 3) !important;
            }
            .sm{
                width: calc(100% / 4) !important;
            }
            .xs{
                width: calc(100% / 10) !important;
            }
            .xxs{
                width: calc(100% / 12) !important;
            }
            .auto{
                width: auto;
            }
            .action{
                &.vs-table__th{
                    position: relative;
                    width: 280px !important;
                    min-width: 280px;
                    max-width: 300px;
                    .vs-table__th__content{
                        float: right;
                        width: 100%;
                        position: relative;
                        // max-width: 280px !important;
                    }
                }
                &.vs-table__td{
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    .btn_action{
                        max-width: 280px;
                        position: relative;
                        justify-content: flex-end;
                    }
                }
                .vs-table__th__content{
                    text-align: center;
                    justify-content: center;
                }
            }
            // .checkbox-inp .vs-icon-check span {
            //     width: 8px;
            //     margin-left: 0px;
            // }
            .m-select.vs-select-content{
                margin-bottom: 0;
            }
            .vs-select__input{
                min-height: 34px !important;
            }
        }
    }
    .text-link{
      color: rgb(53, 92, 255);
      cursor:pointer;
    }
</style>