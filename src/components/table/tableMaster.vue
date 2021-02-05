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
        <vs-table ref="tablee">
            <template #thead>
                <vs-tr>
                    <template v-if="listenColumn.length > 0">
                        <vs-th v-for="(item, key) of listenColumn" :key="key" :class="item.width ? item.width : ''">
                            {{ item.label }}
                        </vs-th>
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
                      <template v-if="printAction == true || avoidAction == true || codAction == true " >
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
                        v-for="(item, key) in listenDataTable"
                        :data="item"
                    >
                        <template v-for="(column, key) of listenColumn">
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
                            <template v-else-if="column.type !== undefined && column.type.toLowerCase() === 'boolean'">
                                <vs-td :key="key" :class="column.width ? column.width : ''">
                                    <checkbox :isChecked="item['selected']"/>
                                </vs-td>
                            </template>
                            <template v-else-if="column.type !== undefined && column.type.toLowerCase() === 'inputan'">
                                <vs-td :key="key" :class="column.width ? column.width : ''">
                                    <template v-if="column.typeInput !== undefined && column.typeInput.toLowerCase() === 'select'">
                                        <template v-if="column.data !== undefined && Array.isArray(column.data)">
                                            <template v-if="column.data.length > 0">
                                                <div style="margin-top:10px;">
                                                    <!-- {{`${column.key}|${item[listenColumn[0].key]}`}} -->
                                                    <selector 
                                                    :name="column.label" 
                                                    :rules="''" 
                                                    :formKey="`${column.key}|${item[listenColumn[0].key]}`"
                                                    :valueData="column.data"
                                                    :selectedValue="''"
                                                    :isMultiple="false"
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
                        <template v-if="hasAction == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            
                                            flat
                                            :active="true"
                                            @click="actionUpdate(item)"
                                        >
                                            Edit
                                        </vs-button>
                                    </vs-col>
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            danger
                                            
                                            flat
                                            :active="true"
                                            type="submit"
                                            @click="actionRemove(item)"
                                        >
                                            Remove
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
                                  
                                  flat
                                  :active="true"
                                  type="submit"
                                  @click="actionRemove(item)"
                              >
                                Remove
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
                                    
                                    flat
                                    :active="true"
                                    type="submit"
                                    @click="actionAvoid(item)"
                                >
                                  Avoid
                                </vs-button>
                              </vs-col>
                            </template>
                            
                            <template v-if="updateAction == true">
                              <vs-col w="4">
                                <vs-button
                                    block
                                    
                                    flat
                                    :active="true"
                                    @click="actionUpdate(item)"
                                >
                                  Edit
                                </vs-button>
                              </vs-col>
                            </template>
                            

                            <vs-col w="4">
                              <vs-button
                                  block
                                  
                                  flat
                                  :active="true"
                                  @click="actionPrint(item)"
                              >
                                Print
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
                                    
                                    flat
                                    :active="true"
                                    @click="actionCancel(item)"
                                >
                                  Cancel
                                </vs-button>
                              </vs-col>
                              <vs-col w="4">
                                <vs-button
                                    block
                                    
                                    flat
                                    :active="true"
                                    @click="actionPrint(item)"
                                >
                                  Print
                                </vs-button>
                              </vs-col>
                            </template>
                            <template v-else>
                              <vs-col w="4">
                                <vs-button
                                    block
                                    warn
                                    
                                    flat
                                    :active="true"
                                    type="submit"
                                    @click="actionPicked(item)"
                                >
                                  Picked
                                </vs-button>
                              </vs-col>
                              <vs-col w="4">
                                <vs-button
                                    block
                                    
                                    flat
                                    :active="true"
                                    @click="actionUpdate(item)"
                                >
                                  Edit
                                </vs-button>
                              </vs-col>

                              <vs-col w="4">
                                <vs-button
                                    block
                                    
                                    flat
                                    :active="true"
                                    @click="actionCancel(item)"
                                >
                                  Cancel
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

                                  flat
                                  :active="true"
                                  type="submit"
                                  @click="actionCollect(item)"
                              >
                                Collect
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
        codAction: Boolean
    },
    data() {
        return {
            tableHeader: [],
            tableBody: this.dataTable ? this.dataTable : [],
            pagination: {
                limit: 5,
                page_size: 1,
                page: 1
            },
            loading: false,
            refloading: null
        }
    },
    computed: {
        listenColumn() {
            return this.dataColumn
        },
        listenDataTable() {
            console.log('computed master table data', this.dataTable)
            console.log("-----------------")
            return this.dataTable
        },
        listenTableLoading() {
            return this.tableLoading
        },
        listenExpandable () {
            return this.expandable || false
        }
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
                color: '#333'
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
        actionUpdate(val) {
            this.$emit("actionUpdate", val)
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

        updateValue(key, val){
            this.$emit("updateValue", key, val)
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
                        width: 280px;
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