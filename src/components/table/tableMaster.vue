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
        - width: String | 'md','sm','xs','xxs', 'xxxs', 'auto'
        - dataTable: Array Object,
        - dataColumn: Array Object,
          [
            {
              label: "contoh column normal",
              key: "column_normal",
              width: "xs",
            },
            {
              label: "contoh column dg inputan text",
              key: "contoh_text_input",
              type: "inputan",
              typeInput: "text",
              data: "",
              width: "md",
            },
            {
              label: "contoh column dg inputan selector",
              key: "contoh_selector_input",
              type: "inputan",
              typeInput: "select",
              injectedData: false,   // boolean jika false akan ambil list data selector dari key data dari sini (kalo data fixed). 
              // kalo true akan ambil dari array item dataTable (case ada filter berdasarkan sesuatu nnti di-feed kedalam array item tsb dg nama key column ini) 
              data: [{
                label: null,
                value: null,
              }],
              selectedValue: "status_code",
              width: "md",
            },
            ...
          ]
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
                v-model="allCheck"
                :indeterminate="selected.length == listenDataTable.length"
                @change="onAllCheckChange"
              />
            </vs-th>
          </template>
          <template v-if="listenIsMultipleSelectColoum">
            <vs-th>
              <vs-checkbox
                v-model="allCheck"
                :indeterminate="selected.length == listenDataTable.length"
                @change="onAllCheckChange"
              />
              <div style="margin-left: 10px;">All</div>
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
            <template v-if="tracingListAction == true">
              <vs-th class="action">
                Action
              </vs-th>
            </template>
            <template v-if="runsheetAction == true">
              <vs-th class="action">
                Action
              </vs-th>
            </template>
            <template
              v-if="
                printAction == true ||
                  avoidAction == true ||
                  codAction == true ||
                  customBtn == true ||
                  customAction == true
              "
            >
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
            v-for="(item, key) in $vs.getPage(
              $vs.getSearch(listenDataTable, search),
              localPage,
              localmax
            )"
            :key="key"
            :data="item"
            :is-selected="!!selected.includes(item)"
            @click="onRowClick($event, item)"
          >
            <template v-if="listenIsMultipleSelect">
              <vs-td checkbox class="xs">
                <vs-checkbox
                  v-model="selected"
                  :val="item"
                  @change="updateSelected"
                />
              </vs-td>
            </template>
            <template v-if="listenIsMultipleSelectColoum">
              <vs-td checkbox class="xxxxs">
                <vs-checkbox
                  v-model="selected"
                  :val="item"
                  @change="updateSelected"
                />
              </vs-td>
            </template>

            <template v-for="(column, key) of listenColumn">
              <template v-if="!column.hasOwnProperty('hidden')">
                <template
                  v-if="
                    column.type !== undefined &&
                      column.type.toLowerCase() === 'text'
                  "
                >
                  <vs-td :key="key" :class="column.width ? column.width : ''">
                    <template
                      v-if="
                        split(column.key).length == 2 &&
                          item.hasOwnProperty(split(column.key)[0])
                      "
                    >
                      {{
                        item.hasOwnProperty(split(column.key)[0])
                          ? item[split(column.key)[0]][split(column.key)[1]]
                          : ""
                      }}
                    </template>
                    <template v-else>
                      {{ item[column.key] ? item[column.key] : "" }}
                    </template>
                  </vs-td>
                </template>
                <template
                  v-else-if="
                    column.type !== undefined &&
                      column.type.toLowerCase().includes('boolean')
                  "
                >
                  <vs-td :key="key" :class="column.width ? column.width : ''">
                    <checkbox
                      :isChecked="item[column.key]"
                      :isDisabled="
                        column.type.toLowerCase().includes('disabled')
                      "
                      :formKey="`${column.key}|${item[listenColumn[0].key]}`"
                      :dataObj="item"
                      @updateValue="updateValue"
                    />
                  </vs-td>
                </template>
                <template
                  v-else-if="
                    column.type !== undefined &&
                      column.type.toLowerCase().includes('inputan')
                  "
                >
                  <vs-td :key="key" :class="{
                      [column.width]: column.width,
                      'padding-top': column.hasOwnProperty('columnCaption') && item[column.selectedValue]
                    }">
                    <template
                      v-if="
                        column.typeInput !== undefined &&
                          column.typeInput.toLowerCase() === 'select'
                      "
                    >
                      <template v-if="column.hasOwnProperty('injectedData')">
                        <!-- memastikan ada data array dari item dataTable -->
                        <template
                          v-if="
                            column['injectedData'] == true &&
                              Array.isArray(item[column.key])
                          "
                        >
                          <template v-if="item[column.key].length > 0">
                            <div>
                              <!-- {{`${column.key}|${item[listenColumn[0].key]}`}} -->
                              <!-- "`${column.key}|${item[listenColumn[0].key]}`" kesepakatan bersama column key 0 adalah id -->
                              <selector
                                :name="column.label"
                                :rules="''"
                                :formKey="
                                  `${column.key}|${item[listenColumn[0].key]}`
                                "
                                :valueData="item[column.key]"
                                :selectedValue="
                                  item[column.selectedValue]
                                    ? item[column.selectedValue]
                                    : ''
                                "
                                :isMultiple="false"
                                :dataObj="item"
                                :disabled="
                                  column.hasOwnProperty('disabled_input')
                                    ? item[column.disabled_input]
                                    : false
                                "
                                autocomplete="off"
                                @updateValue="updateValue"
                                @inputFocus="onfocuslah"
                              />
                              <template v-if="column.hasOwnProperty('columnCaption')">
                                <template v-if="column['columnCaption'] == true">
                                  <span :style="{ fontSize: '0.75em' }">{{ getStatusLabel(item[column.key], item[column.selectedValue]) }}</span>
                                </template>
                              </template>
                            </div>
                          </template>
                        </template>
                        <!-- jika data fixed langsung aja ngambil dari obj key data dari column  -->
                        <template
                          v-else-if="
                            column['injectedData'] == false &&
                              column.data !== undefined &&
                              Array.isArray(column.data)
                          "
                        >
                          <template v-if="column.data.length > 0">
                            <div>
                              <!-- {{`${column.key}|${item[listenColumn[0].key]}`}} -->
                              <!-- "`${column.key}|${item[listenColumn[0].key]}`" kesepakatan bersama column key 0 adalah id -->
                              <selector
                                :name="column.label"
                                :rules="''"
                                :formKey="
                                  `${column.key}|${item[listenColumn[0].key]}`
                                "
                                :valueData="column.data"
                                :selectedValue="
                                  item[column.selectedValue]
                                    ? item[column.selectedValue]
                                    : item[column.key]
                                "
                                :isMultiple="false"
                                :dataObj="item"
                                :disabled="
                                  column.hasOwnProperty('disabled_input')
                                    ? item[column.disabled_input]
                                    : false
                                "
                                autocomplete="off"
                                @updateValue="updateValue"
                              />
                            </div>
                          </template>
                        </template>
                      </template>
                      <!-- jika data fixed langsung aja ngambil dari obj key data dari column  -->
                      <template
                        v-else-if="
                          column.data !== undefined &&
                            Array.isArray(column.data)
                        "
                      >
                        <template v-if="column.data.length > 0">
                          <div>
                            <!-- {{`${column.key}|${item[listenColumn[0].key]}`}} -->
                            <!-- "`${column.key}|${item[listenColumn[0].key]}`" kesepakatan bersama column key 0 adalah id -->
                            <selector
                              :name="column.label"
                              :rules="''"
                              :formKey="
                                `${column.key}|${item[listenColumn[0].key]}`
                              "
                              :valueData="column.data"
                              :selectedValue="
                                item[column.selectedValue]
                                  ? item[column.selectedValue]
                                  : item[column.key]
                              "
                              :isMultiple="false"
                              :dataObj="item"
                              autocomplete="off"
                              :disabled="
                                column.hasOwnProperty('disabled_input')
                                  ? item[column.disabled_input]
                                  : false
                              "
                              @updateValue="updateValue"
                            />
                          </div>
                        </template>
                      </template>
                    </template>
                    <template
                      v-else-if="
                        column.typeInput !== undefined &&
                          column.typeInput.toLowerCase() === 'text'
                      "
                    >
                      <div style="margin-top:20px">
                        <input-general
                          :name="column.label"
                          :rules="''"
                          :formKey="
                            `${column.key}|${item[listenColumn[0].key]}`
                          "
                          :valueData="
                            `${item[column.key] ? item[column.key] : ''}`
                          "
                          :typeInput="
                            'text' +
                              `|${
                                column.hasOwnProperty('disabled_input')
                                  ? item[column.disabled_input] == true
                                    ? 'disabled'
                                    : ''
                                  : ''
                              }`
                          "
                          :dataObj="item"
                          @updateValue="updateValue"
                        />
                      </div>
                    </template>
                    <template
                      v-else-if="
                        column.typeInput !== undefined &&
                          column.typeInput.toLowerCase() === 'textsubmit'
                      "
                    >
                      <div style="margin-top:20px">
                        <input-general
                          :name="column.label"
                          :rules="''"
                          :formKey="
                            `${column.key}|${item[listenColumn[0].key]}`
                          "
                          :valueData="
                            `${item[column.key] ? item[column.key] : ''}`
                          "
                          :typeInput="
                            'text' +
                              `|${
                                column.hasOwnProperty('disabled_input')
                                  ? item[column.disabled_input] == true
                                    ? 'disabled'
                                    : ''
                                  : ''
                              }`
                          "
                          :dataObj="item"
                          @updateValue="updateValue"
                        />
                      </div>
                    </template>
                    <template
                      v-else-if="
                        column.typeInput !== undefined &&
                          column.typeInput
                            .toLowerCase()
                            .includes('autocomplete')
                      "
                    >
                      <template v-if="querySearch !== undefined">
                        <auto-complete
                          :name="column.label"
                          :rules="column.rule"
                          :formKey="column.key"
                          :valueData="column.value"
                          :url="column.url"
                          :flag="column.flag"
                          :querySearch="querySearch"
                          :selectedValue="column.value"
                          :typeInput="column.typeInput"
                          @updateValue="updateValue"
                          @inputFocus="onfocuslah"
                        />
                      </template>
                    </template>
                    <template
                      v-else-if="
                        column.typeInput !== undefined &&
                          column.typeInput
                            .toLowerCase()
                            .includes('icon')
                      "
                    >
                      <template v-if="item[column.key]">
                        <i 
                          class='bx bxs-error-circle icon-warning' 
                          @click="actionPopup(item[column.key])"
                        ></i>
                      </template>
                    </template>
                  </vs-td>
                </template>
                <template
                  v-else-if="
                    column.type !== undefined &&
                      column.type.toLowerCase() === 'status'
                  "
                >
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
                        <i
                          :class="
                            `bx bx-${item[column.key] == false ? 'x' : 'check'}`
                          "
                        ></i>
                      </vs-button>
                    </template>
                  </vs-td>
                </template>
                <template v-else>
                  <vs-td
                    :key="key"
                    :class="[column.textAlign ? column.textAlign : '', item.width ? item.width : '']"
                    class="manual-padding"
                  >
                    <template
                      v-if="
                        split(column.key).length == 2 &&
                          item.hasOwnProperty(split(column.key)[0])
                      "
                    >
                      {{
                        item.hasOwnProperty(split(column.key)[0])
                          ? item[split(column.key)[0]][split(column.key)[1]]
                          : ""
                      }}
                    </template>
                    <template
                      v-else-if="
                        hasLinked !== undefined &&
                          hasLinked.length > 0 &&
                          column.key !== undefined &&
                          hasLinked.includes(column.key.toLowerCase())
                      "
                    >
                      <span class="text-link" @click="handleEdit(item)">{{
                        item[column.key] ? item[column.key] : ""
                      }}</span>
                    </template>
                    <template
                      v-else-if="
                        hasLinked2 !== undefined &&
                          hasLinked2.length > 0 &&
                          column.key !== undefined &&
                          hasLinked2.includes(column.key.toLowerCase())
                      "
                    >
                      <span class="text-link" @click="handleEdit2(item)">{{
                        item[column.key] ? item[column.key] : ""
                      }}</span>
                    </template>
                    <template
                      v-else-if="
                        hasLinked3 !== undefined &&
                          hasLinked3.length > 0 &&
                          column.key !== undefined &&
                          hasLinked3.includes(column.key.toLowerCase()) &&
                          (!item.hasOwnProperty('is_kurir_user') ||
                            !item.is_kurir_user)
                      "
                    >
                      <span class="text-link" @click="handleEdit3(item)">{{
                        item[column.key] ? item[column.key] : ""
                      }}</span>
                    </template>
                    <template
                      v-else-if="
                        hasLinked4 !== undefined &&
                          hasLinked4.length > 0 &&
                          column.key !== undefined &&
                          hasLinked4.includes(column.key.toLowerCase())
                      "
                    >
                      <img
                        style="width: 100px; height: 100px"
                        :src="item.image"
                        @click="handlePictureCardPreview(item)"
                      />
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                      </el-dialog>
                    </template>
                    <template v-else-if="column.key === 'is_confirmed'">
                      <span
                        v-if="item[column.key] === 'Confirmed'"
                        class="greenBackground"
                        >{{ item[column.key] }}</span
                      >
                      <span v-else>{{ item[column.key] }}</span>
                    </template>
                    <template v-else-if="column.key === 'status_delivery'">
                      <span
                        v-if="item[column.key] === 'DELIVERED'"
                        class="greenBackground"
                        >{{ item[column.key] }}</span
                      >
                      <span v-else>{{ item[column.key] }}</span>
                    </template>
                    <template
                      v-else-if="column.key === 'current_location_type'"
                    >
                      <span
                        v-if="item[column.key] === 'KURIR'"
                        class="redBackground"
                        >{{ item[column.key] }}</span
                      >
                      <span v-else>{{ item[column.key] }}</span>
                    </template>
                    <template v-else>
                      {{ item[column.key] 
                          ?  column.type_amount 
                              ? Intl.NumberFormat('en-GB').format(item[column.key])
                              : item[column.key]
                          : "" 
                      }}
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
                  :disabled="
                    item.hasOwnProperty('isDisabled') && item.isDisabled == true
                  "
                  :active="true"
                  @click="actionUpdate(item)"
                >
                  <span>{{ customBtn_label }}</span>
                </vs-button>
              </vs-td>
            </template>

            <template v-if="customAction == true">
              <vs-td class="action">
                <vs-row justify="center" class="btn_action">
                  <template v-if="listCustomActionList.length > 0">
                    <template
                      v-for="(actionItem,
                      keyActionItem) in listCustomActionList"
                    >
                      <vs-col :key="keyActionItem" w="3">
                        <!-- <template v-if="actionItem.hasOwnProperty('option')">
                                                        item.isDisabled == true
                                                        item.hasOwnProperty('isDisabled') ? item.isDisabled == true : false
                                                        item["button_status"][actionItem.key.toLowerCase()]
                                                    </template> -->

                        <vs-button
                          block
                          flat
                          size="small"
                          :disabled="listenDisableAction
                              ? listenDisableAction === true
                              : item.hasOwnProperty('isDisabled')
                              ? item.isDisabled == true
                              : item.hasOwnProperty('button_status')
                              ? item['button_status'].hasOwnProperty([
                                  actionItem.key.toLowerCase(),
                                ])
                                ? item['button_status'][
                                    actionItem.key.toLowerCase()
                                  ] == false
                                  ? true
                                  : false
                                : false
                              : false
                          "
                          :danger="
                            actionItem.attribute
                              .toLowerCase()
                              .includes('danger')
                              ? true
                              : false
                          "
                          :warn="
                            actionItem.attribute.toLowerCase().includes('warn')
                              ? true
                              : false
                          "
                          :active="true"
                          @click="actionUpdate(item, actionItem.key)"
                        >
                          <span>{{ actionItem.label }}</span>
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
                      :disabled="
                        item.hasOwnProperty('isDisabled') &&
                          item.isDisabled == true
                      "
                      type="submit"
                      @click="actionRemove(item)"
                    >
                      <span>Remove</span>
                    </vs-button>
                  </vs-col>
                </vs-row>
              </vs-td>
            </template>
            <template v-if="runsheetAction == true">
              <vs-td class="action">
                <vs-row justify="center" class="btn_action">
                  <vs-col w="4">
                    <vs-button
                      block
                      :disabled="
                        item.hasOwnProperty('isDisabled') &&
                          item.isDisabled == true
                      "
                      size="small"
                      flat
                      warn
                      :active="true"
                      @click="actionConfirmed(item)"
                    >
                      <span>Confirmed</span>
                    </vs-button>
                  </vs-col>
                  <vs-col
                    v-if="!item.hasOwnProperty('is_CT_user') || item.is_CT_user"
                    w="4"
                  >
                    <vs-button
                      block
                      :disabled="
                        (item.hasOwnProperty('isDisabled') &&
                          item.isDisabled == true) ||
                          !item.request_failed_by
                      "
                      flat
                      size="small"
                      :active="true"
                      @click="actionApprove(item)"
                    >
                      <span>Edit</span>
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
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
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
                    <vs-col
                      v-if="
                        !item.hasOwnProperty('is_kurir_user') ||
                          item.is_kurir_user
                      "
                      w="4"
                    >
                      <vs-button
                        block
                        danger
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
                        flat
                        size="small"
                        :active="true"
                        @click="actionFailed(item)"
                      >
                        <span>Failed</span>
                      </vs-button>
                    </vs-col>
                    <vs-col
                      v-if="
                        !item.hasOwnProperty('is_CT_user') || item.is_CT_user
                      "
                      w="4"
                    >
                      <vs-button
                        block
                        :disabled="
                          (item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true) ||
                            !item.request_failed_by
                        "
                        flat
                        size="small"
                        :active="true"
                        @click="actionApprove(item)"
                      >
                        <span>Approve</span>
                      </vs-button>
                    </vs-col>

                    <vs-col w="4">
                      <vs-button
                        block
                        warn
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
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
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
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
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
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

            <template v-if="tracingListAction == true">
              <vs-td class="action">
                <vs-row justify="center" class="btn_action">
                  <vs-col w="4">
                      <vs-button
                        block
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
                        size="small"
                        flat
                        :active="true"
                        @click="actionAddRemark(item)"
                      >
                        <span>Remark</span>
                      </vs-button>
                    </vs-col>

                    <vs-col w="4">
                      <vs-button
                        block
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
                        flat
                        size="small"
                        :active="true"
                        type="submit"
                        @click="actionViewHistory(item)"
                      >
                        <span>History</span>
                      </vs-button>
                    </vs-col>
                    <vs-col w="4">
                      <vs-button
                        block
                        :disabled="
                          item.hasOwnProperty('isDisabled') &&
                            item.isDisabled == true
                        "
                        flat
                        size="small"
                        :active="true"
                        type="submit"
                        @click="actionMessages(item)"
                      >
                        <span>Messages</span>
                      </vs-button>
                    </vs-col>
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
                <template
                  v-if="
                    item.hasOwnProperty('children') &&
                      Object.keys(item.children).length > 0
                  "
                >
                  <table>
                    <tr>
                      <th
                        v-for="(c_item, c_key) in Object.keys(item.children)"
                        :key="c_key"
                        :class="item.hasOwnProperty('children_width') ? item['children_width'][c_item] : ''"
                      >
                        {{ c_item.replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, " ") }}
                      </th>
                    </tr>
                    <tr>
                      <template
                        v-for="(c_item, c_td_key) in Object.keys(item.children)"
                      >
                        <template v-if="Array.isArray(item.children[c_item])">
                          <td :key="c_td_key" :class="item.hasOwnProperty('children_width') ? item['children_width'][c_item] : ''">
                            <ul>
                              <li
                                v-for="(itm, idx) in item.children[c_item]"
                                :key="idx"
                              >
                                <template v-if="typeof itm === 'object'">
                                  <template
                                    v-for="(itm_keys, itm_i) in Object.keys(
                                      itm
                                    )"
                                  >
                                    <p :key="itm_i">
                                      {{ itm_keys + " = " + itm[itm_keys] }}
                                    </p>
                                  </template>
                                </template>
                                <template v-else>
                                  <template
                                    v-if="
                                      hasLinkedChild !== undefined &&
                                        hasLinkedChild.length > 0 &&
                                        itm !== undefined
                                        && hasLinkedChild.includes(c_item)
                                    "
                                  >
                                    <span class="text-link" @click="handleEditLinkedChild(itm)">
                                    {{ itm ? itm : "" }}
                                    </span>
                                  </template>

                                  <template v-else>
                                    <p>{{ itm }}</p>
                                  </template>
                                </template>
                              </li>
                            </ul>
                          </td>
                        </template>
                        <template v-else>
                          <td :key="c_td_key" :class="item.hasOwnProperty('children_width') ? item['children_width'][c_item] : ''">
                            {{ item.children[c_item] }}
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
          <vs-pagination
            v-model="localPage"
            :length="
              $vs.getLength($vs.getSearch(listenDataTable, search), localmax)
            "
          />
        </template>
      </template>
    </vs-table>

    <template v-if="hasPagination == true">
      <vs-row class="mt-2" justify="flex-end">
        <vs-col w="8">
          <pagination-master
            :page="pagination.page"
            :limit="pagination.limit"
            :pageSize="pagination.page_size"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
          />
        </vs-col>
      </vs-row>
    </template>
  </div>
</template>
<script>
import Pagination from "@/components/pagination/pagination.vue";
import Checkbox from "@/components/input/checkbox.vue";
import InputGeneral from "@/components/input/general";
import Selector from "@/components/input/select";
import AutoComplete from "@/components/input/autoComplete";
import { Dialog } from "element-ui";
export default {
  name: "tabelMaster",
  components: {
    "pagination-master": Pagination,
    checkbox: Checkbox,
    "input-general": InputGeneral,
    selector: Selector,
    "auto-complete": AutoComplete,
    "el-dialog": Dialog,
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
    hasLinked: Array,
    hasLinked2: Array,
    hasLinked3: Array,
    hasLinked4: Array,
    hasLinkedChild: Array,
    removeOnly: Boolean,
    runsheetAction: Boolean,
    printAction: Boolean,
    pickupListAction: Boolean,
    tracingListAction: Boolean,
    updateAction: Boolean,
    avoidAction: Boolean,
    pickedAction: Boolean, //pickup list action picked
    cancelRequestAction: Boolean, //pickup request action cancel,
    codAction: Boolean,
    customBtn: Boolean,
    customBtn_label: String,

    isMultipleSelect: Boolean,
    isMultipleSelectColoum: Boolean,
    selectedData: Array,
    isSearchAble: Boolean,
    isLocalPagination: Boolean,

    customAction: Boolean,
    customActionList: Array,
    disableAction: Boolean,

    querySearch: Function, // klo ada auto complete [required]

    isKurirAccount: Boolean,
    isControlTowerAccount: Boolean,

    allCheckCallback: {
      type: Function,
      default: undefined,
    },

    onRowClickCallback: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      tableHeader: [],
      tableBody: this.dataTable ? this.dataTable : [],
      pagination: {
        limit: 20,
        page_size: 1,
        page: 1,
      },
      loading: false,
      refloading: null,

      allCheck: false,
      selected: this.selectedData || [],
      search: "",

      localPage: 1,
      localmax: 1000,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    listenColumn() {
      return this.dataColumn;
    },
    listenDataTable() {


      return this.dataTable;
    },
    listenTableLoading() {
      return this.tableLoading;
    },
    listenExpandable() {
      return this.expandable || false;
    },
    listCustomActionList() {
      return this.customActionList || [];
    },
    listenIsMultipleSelect() {
      return this.isMultipleSelect;
    },
    listenIsMultipleSelectColoum() {
      return this.isMultipleSelectColoum;
    },
    listenIsSearchAble() {
      return this.isSearchAble;
    },
    listenIsLocalPagination() {
      return this.isLocalPagination;
    },
    listenDisableAction() {
      return this.disableAction;
    }
  },
  watch: {
    tableLoading: function(val) {
      if (val !== undefined) {
        this.loading = val;
        if (val == true) {
          this.loadingHandler();
        } else {
          this.closeLoading();
        }
      }
    },
    selectedData: function(val) {

      if (val !== undefined) {
        this.selected = val;

      }
    },
    pageSize: function(val) {
      if (val !== undefined) {
        this.pagination.page_size = val;
      }
    },
    page: function(val) {
      if (val !== undefined) {
        this.pagination.page = val;
      }
    },
    limit: function(val) {
      if (val !== undefined) {
        this.pagination.limits = val;
      }
    },
    dataTable: function() {
      if (this.listenExpandable) {
        this.resetExpandedRows()
      }
    }
  },
  methods: {
    resetExpandedRows() {
      const elements = document.querySelectorAll('.vs-table__tr__expand');
      elements.forEach((element) => {
        element.remove()
      });
    },
    split(arr) {
      return arr.split(".");
    },
    loadingHandler() {
      this.refloading = this.$vs.loading({
        target: this.$refs.tablee,
        type: "scale",
        text: "Loading...",
        background: "#EAEAEA",
      });
    },
    closeLoading() {
      this.refloading !== null ? this.refloading.close() : "";
    },
    handleColumnsOrder() {
      this.tableHeader = this.dataColumn ? this.dataColumn : [];
    },
    actionLimit(val) {
      this.$emit("actionLimit", val);
    },
    actionPagination(val) {
      this.$emit("actionPagination", val);
    },
    actionUpdate(val, key) {
      this.$emit("actionUpdate", val, key);
    },
    actionPopup(val, key) {
      this.$emit("actionPopup", val, key);
    },
    actionCollect(val) {
      this.$emit("actionCollect", val);
    },
    actionRemove(val) {
      this.$emit("actionRemove", val);
    },
    actionConfirmed(val, key) {
      this.$emit("actionConfirmed", val, key);
    },
    actionPrint(val) {
      this.$emit("actionPrint", val);
    },
    actionAvoid(val) {
      this.$emit("actionAvoid", val);
    },

    //pickup list action picked
    actionFailed(val) {
      this.$emit("actionFailed", val);
    },
    actionApprove(val) {
      this.$emit("actionApprove", val);
    },
    actionPicked(val) {
      this.$emit("actionPicked", val);
    },
    actionCancel(val) {
      this.$emit("actionCancel", val);
    },

    actionAddRemark(val) {
      this.$emit("actionAddRemark", val);
    },
    actionViewHistory(val) {
      this.$emit("actionViewHistory", val);
    },
    actionMessages(val) {
      this.$emit("actionMessages", val);
    },

    onfocuslah(info) {
      if (
        info?.typeInput !== "" &&
        info?.typeInput?.includes("location_selector")
      ) {
        this.$emit("onFocus_location_selector", info);
      }
      this.$emit("inputFocus", info);
    },

    updateValue(key, val, info = {}, dataObj) {
      if (this.listenIsMultipleSelect == true && dataObj != undefined) {

        if (!!this.selected.includes(dataObj) == false) {
          this.selected.push(dataObj);

        }
      }
      this.$emit("updateValue", key, val, info, dataObj);
    },
    updateFormValue(value, formKey) {

      // Kirim aksi (action) ke Vuex store
      this.$store.commit("UPDATE_FORM_DATA", { key: formKey, value });
    },

    updateSelected() {

      this.$emit("updateSelected", this.selected);
    },

    handleEdit(val) {
      this.$emit("handleEdit", val);
    },
    handleEdit2(val, key) {
      this.$emit("handleEdit2", val);
    },
    handleEdit3(val, key) {
      this.$emit("handleEdit3", val);
    },
    handleEditLinkedChild(val) {
      this.$emit("handleEditLinkedChild", val);
    },
    handlePictureCardPreview(val) {

      this.dialogImageUrl = val.image;
      this.dialogVisible = true;
    },

    onAllCheckChange() {
      this.selected = this.$vs.checkAll(this.selected, this.listenDataTable);

      if (typeof this.allCheckCallback === "function") {
        this.allCheckCallback(this.allCheck, this.selected);
      }
    },

    onRowClick(event, item) {
      // eslint-disable-next-line quotes
      if (event.target?.tagName === "TD") {
        // eslint-disable-next-line quotes
        if (typeof this.onRowClickCallback === "function") {
          this.onRowClickCallback(event, item, this.selected);
        }
      }
    },
    getStatusLabel(arr, val) {
      if (val !== '') {
        return arr?.find(item => item.value === val)?.label
      }
      return ""
    }
  },
  mounted() {
    this.handleColumnsOrder();
  },
};
</script>
<style lang="scss">
.vs-table {
  table {
    text-align: left;
    .md {
      width: calc(100% / 3) !important;
    }
    .sm {
      width: calc(100% / 4) !important;
    }
    .xs {
      width: calc(100% / 10) !important;
    }
    .xxs {
      width: calc(100% / 12) !important;
    }
    .xxxs {
      width: calc(100% / 14) !important;
    }
    .xxxxs {
      width: calc(100% / 25) !important;
    }
    .right {
      text-align: right !important;               
    }
    .auto {
      width: auto;
    }
    .action {
      &.vs-table__th {
        position: relative;
        width: 280px !important;
        min-width: 280px;
        max-width: 300px;
        .vs-table__th__content {
          float: right;
          width: 100%;
          position: relative;
          // max-width: 280px !important;
        }
      }
      &.vs-table__td {
        position: relative;
        display: flex;
        justify-content: flex-end;
        .btn_action {
          max-width: 280px;
          position: relative;
          justify-content: flex-end;
          flex-wrap: nowrap;
        }
      }
      .vs-table__th__content {
        text-align: center;
        justify-content: center;
      }
    }
    .checkbox-inp .vs-icon-check span {
      width: 8px;
      margin-left: 0px;
    }
    .m-select.vs-select-content {
      margin-bottom: 0;
    }
    .vs-select__input {
      min-height: 34px !important;
    }
  }
}

span.text-link {
  display: inline-block;
  padding-top: 18px;
  color: rgb(53, 92, 255);
  cursor: pointer;
}
.manual-padding {
  padding-bottom: 0px;
}
.vs-table__th {
  padding: 10px 5px !important;
}
.greenBackground {
  background-color: rgb(21, 224, 21);
  color: rgb(255, 255, 255);
  padding: 5px 5px !important;
  border-radius: 3px;
}
.redBackground {
  background-color: rgb(255, 31, 31);
  color: rgb(255, 255, 255);
  padding: 5px 25px !important;
  border-radius: 3px;
}
.icon-warning {
  font-size: 48px;
  color: #ffcc00;
}
.padding-top {
  padding-top: 3em !important;
}

</style>
