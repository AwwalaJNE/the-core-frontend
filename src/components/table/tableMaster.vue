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
        <template v-if="!listenHideIsFilterColumn">
            <div
                ref="dropdownContainer"
                class="column-toggle-wrapper"
                data-testid="column-toggle-wrapper"
            >
                <!-- Header Row: Button + Total -->
                <div
                    class="column-toggle-header"
                    data-testid="column-toggle-header"
                    style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 16px;
                    "
                    v-if="dataTable.length > 0"
                >
                    <vs-button @click="toggleDropdown" icon data-testid="filter-column-btn">
                        <i class="bx bx-slider"></i> Columns
                    </vs-button>
                    <p
                        v-if="!listenTotalPerPage"
                        class="columns-label"
                        data-testid="columns-total"
                        style="margin: 0"
                        v-copy="dataTable.length"
                    >
                        Total: {{ dataTable.length }}
                    </p>
                </div>

                <div
                    v-show="showColumnDropdown"
                    class="column-dropdown-panel"
                    data-testid="column-dropdown-panel"
                >
                    <!-- TODO: SHOW LATER -->
                    <vs-input
                        v-model="columnSearch"
                        placeholder="Search columns..."
                        data-testid="column-search"
                    />

                    <div class="checkbox-scroll">
                        <vs-checkbox
                            v-for="col in validColumn"
                            :key="col.key"
                            v-model="visibleKeys"
                            :val="col.key"
                            :data-testid="`column-checkbox-${col.key}`"
                            v-copy="col.label"
                        >
                            {{ col.label }}
                        </vs-checkbox>
                    </div>

                    <div class="footer-actions">
                        <vs-checkbox
                            v-model="toggleAllVisible"
                            @change="toggleAllColumns"
                            data-testid="toggle-all-columns"
                        >
                            Show All Columns
                        </vs-checkbox>
                    </div>
                </div>
            </div>
        </template>
        <vs-table
            ref="tablee"
            v-model="selected"
            :isSingleSelect="listenIsSingleSelect"
            :class="{ scrollableAndStaticHeader: scrollableAndStaticHeader }"
            :data-testid="`table-${hideColumnKey}`"
        >
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
                            <div style="margin-left: 10px">All</div>
                        </vs-th>
                    </template>
                    <template v-if="listenIsMultipleSelectWithIndex">
                        <vs-th>
                            <vs-checkbox
                                v-if="listenIsShowCheckboxAll"
                                v-model="isAllChecked"
                                :indeterminate="selected.length == listenDataTable.length"
                                @change="onAllCheckWithIndexChange"
                            />
                            <div style="margin-left: 10px">All</div>
                        </vs-th>
                    </template>

                    <template v-if="listenColumn.length > 0">
                        <template v-if="hasId == true">
                            <vs-th class="automation-id" v-bind:data-kt-table="'ID'"> ID </vs-th>
                        </template>
                        <template v-for="(item, key) of listenColumn">
                            <template v-if="!item.hasOwnProperty('hidden')">
                                <vs-th
                                    :key="key"
                                    :class="item.width ? item.width : ''"
                                    v-copy="item.label"
                                >
                                    {{ item.label }}
                                    <vs-tooltip v-if="item.hasOwnProperty('tooltip_desc')" bottom>
                                        <i class="bx bx-info-circle"></i>
                                        <template #tooltip>
                                            {{ item.tooltip_desc }}
                                        </template>
                                    </vs-tooltip>
                                </vs-th>
                            </template>
                        </template>
                        <template>
                            <template v-if="showActionColumn">
                                <vs-th class="action">Action</vs-th>
                            </template>
                            <template v-if="runsheetProofAction">
                                <vs-th class="action">Proof</vs-th>
                            </template>
                            <template v-if="showSpecialActionColumn">
                                <vs-th :class="isMobile ? 'action-mobile' : 'action'">Action</vs-th>
                            </template>
                            <template v-if="removeDanger">
                                <vs-th :class="[actionWidth || '', 'action-responsive']">
                                    Action
                                </vs-th>
                            </template>
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
                        <template v-if="isActionFirst == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            size="small"
                                            flat
                                            :active="true"
                                            type="submit"
                                            :data-testid="`select-button`"
                                            @click="actionSelect(item)"
                                        >
                                            <span>Select</span>
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                        <template v-if="listenIsMultipleSelect">
                            <vs-td checkbox class="xs">
                                <vs-checkbox
                                    v-model="selected"
                                    :val="item"
                                    @change="updateSelected"
                                />
                            </vs-td>
                        </template>
                        <template v-if="listenIsMultipleSelectWithIndex">
                            <vs-td checkbox class="xs">
                                <vs-checkbox
                                    v-model="selected"
                                    :val="item"
                                    @change="updateSelected2(item)"
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
                        <template v-if="hasId == true">
                            <vs-td :key="key" class="automation-id" v-bind:data-kt-table="key + 1">
                                {{ key + 1 }}
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
                                        <template>
                                            <span
                                                v-if="
                                                    split(column.key).length === 2 &&
                                                    item?.[split(column.key)[0]]
                                                "
                                                v-copy="
                                                    item?.[split(column.key)[0]]?.[
                                                        split(column.key)[1]
                                                    ] || ''
                                                "
                                            >
                                                {{
                                                    item?.[split(column.key)[0]]?.[
                                                        split(column.key)[1]
                                                    ] || ''
                                                }}
                                            </span>
                                            <span v-else v-copy="item[column.key]">
                                                {{ item[column.key] ? item[column.key] : '' }}
                                            </span>
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
                                    <vs-td
                                        :key="key"
                                        :class="{
                                            [column.width]: column.width,
                                            'padding-top':
                                                column.hasOwnProperty('columnCaption') &&
                                                item[column.selectedValue],
                                        }"
                                    >
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
                                                                :formKey="`${column.key}|${
                                                                    item[listenColumn[0].key]
                                                                }`"
                                                                :valueData="item[column.key]"
                                                                :selectedValue="
                                                                    item[column.selectedValue]
                                                                        ? item[column.selectedValue]
                                                                        : ''
                                                                "
                                                                :isMultiple="false"
                                                                :dataObj="item"
                                                                :disabled="
                                                                    column.hasOwnProperty(
                                                                        'disabled_input'
                                                                    )
                                                                        ? item[
                                                                              column.disabled_input
                                                                          ]
                                                                        : false
                                                                "
                                                                autocomplete="off"
                                                                :hiddenTitle="true"
                                                                :placeholder="column.label"
                                                                @updateValue="updateValue"
                                                                @inputFocus="onfocuslah"
                                                            />
                                                            <template
                                                                v-if="
                                                                    column.hasOwnProperty(
                                                                        'columnCaption'
                                                                    )
                                                                "
                                                            >
                                                                <template
                                                                    v-if="
                                                                        column['columnCaption'] ==
                                                                        true
                                                                    "
                                                                >
                                                                    <span
                                                                        :style="{
                                                                            fontSize: '0.75em',
                                                                        }"
                                                                        >{{
                                                                            getStatusLabel(
                                                                                item[column.key],
                                                                                item[
                                                                                    column
                                                                                        .selectedValue
                                                                                ]
                                                                            )
                                                                        }}</span
                                                                    >
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
                                                                :formKey="`${column.key}|${
                                                                    item[listenColumn[0].key]
                                                                }`"
                                                                :valueData="column.data"
                                                                :selectedValue="
                                                                    item[column.selectedValue]
                                                                        ? item[column.selectedValue]
                                                                        : item[column.key]
                                                                "
                                                                :isMultiple="false"
                                                                :dataObj="item"
                                                                :disabled="
                                                                    column.hasOwnProperty(
                                                                        'disabled_input'
                                                                    )
                                                                        ? item[
                                                                              column.disabled_input
                                                                          ]
                                                                        : false
                                                                "
                                                                :hiddenTitle="true"
                                                                :placeholder="column.label"
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
                                                            :formKey="`${column.key}|${
                                                                item[listenColumn[0].key]
                                                            }`"
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
                                                                column.hasOwnProperty(
                                                                    'disabled_input'
                                                                )
                                                                    ? item[column.disabled_input]
                                                                    : false
                                                            "
                                                            :hiddenTitle="true"
                                                            :placeholder="column.label"
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
                                            <input-general
                                                :name="column.label"
                                                :rules="''"
                                                :formKey="`${column.key}|${
                                                    item[listenColumn[0].key]
                                                }`"
                                                :valueData="`${
                                                    item[column.key] ? item[column.key] : ''
                                                }`"
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
                                                :hiddenTitle="true"
                                                :placeholder="column.label"
                                                @updateValue="updateValue"
                                            />
                                        </template>
                                        <template
                                            v-else-if="
                                                column.typeInput !== undefined &&
                                                column.typeInput.toLowerCase() === 'textsubmit'
                                            "
                                        >
                                            <input-general
                                                :name="column.label + '*'"
                                                :rules="''"
                                                :formKey="`${column.key}|${
                                                    item[listenColumn[0].key]
                                                }`"
                                                :valueData="`${
                                                    item[column.key] ? item[column.key] : ''
                                                }`"
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
                                                :hiddenTitle="true"
                                                :placeholder="column.label"
                                                @updateValue="updateValue"
                                            />
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
                                                column.typeInput.toLowerCase().includes('icon')
                                            "
                                        >
                                            <template v-if="item[column.key]">
                                                <template v-if="icon_tooltip">
                                                    <vs-tooltip bottom>
                                                        <i
                                                            class="bx bxs-error-circle icon-warning"
                                                            @click="actionPopup(item[column.key])"
                                                        ></i>
                                                        <template #tooltip>
                                                            {{ icon_tooltip }}
                                                        </template>
                                                    </vs-tooltip>
                                                </template>
                                                <template v-else>
                                                    <i
                                                        class="bx bxs-error-circle icon-warning"
                                                        @click="actionPopup(item[column.key])"
                                                    ></i>
                                                </template>
                                            </template>
                                        </template>
                                        <template
                                            v-else-if="
                                                column.typeInput !== undefined &&
                                                column.typeInput
                                                    .toLowerCase()
                                                    .includes('button_text')
                                            "
                                        >
                                            <span
                                                v-if="item[column.key]"
                                                style="cursor: pointer; color: rgb(53, 92, 255)"
                                                @click="actionPopup2(item)"
                                            >
                                                {{ item[column.key] }}
                                            </span>
                                        </template>
                                        <template
                                            v-if="
                                                column.typeInput !== undefined &&
                                                column.typeInput.toLowerCase() === 'multi-select-by'
                                            "
                                        >
                                            <template v-if="!item.filter">
                                                <vs-button
                                                    shadow
                                                    relief
                                                    :active="true"
                                                    @click="handleAddData(item)"
                                                >
                                                    <i class="bx bx-plus"></i> Add Filter
                                                </vs-button>
                                            </template>
                                            <template v-else>
                                                <vs-row
                                                    v-for="(filterItem, filterIndex) in item.filter"
                                                    :key="filterIndex"
                                                    align="center"
                                                    justify="space-between"
                                                >
                                                    <vs-col xs="6" sm="3" lg="3">
                                                        <selector
                                                            :name="column.selector.label"
                                                            :rules="column.selector.rules"
                                                            :formKey="column.selector.key"
                                                            :valueData="column.selector.data"
                                                            :selectedValue="
                                                                filterItem[column.selector.key]
                                                            "
                                                            :dataObj="item"
                                                            @updateValue="
                                                                updateValue2(
                                                                    filterIndex,
                                                                    ...arguments
                                                                )
                                                            "
                                                        />
                                                    </vs-col>
                                                    <vs-col xs="6" sm="3" lg="7">
                                                        <asynchronousSelect
                                                            :ref="column.multipleSelector.key"
                                                            :name="column.multipleSelector.label"
                                                            :rules="column.multipleSelector.rules"
                                                            :formKey="column.multipleSelector.key"
                                                            :selectedValue="
                                                                filterItem[
                                                                    column.multipleSelector.key
                                                                ]
                                                            "
                                                            :typeInput="
                                                                column.multipleSelector.typeInput
                                                            "
                                                            :url="
                                                                column.multipleSelector
                                                                    .autoCompleteUrl
                                                            "
                                                            :selectLabel="
                                                                column.multipleSelector.selectLabel
                                                            "
                                                            :selectValue="
                                                                column.multipleSelector.selectValue
                                                            "
                                                            :dataObj="item"
                                                            :minSearchLength="
                                                                column.multipleSelector
                                                                    .minSearchLength
                                                            "
                                                            @inputFocus="
                                                                inputFocus(
                                                                    filterIndex,
                                                                    item,
                                                                    ...arguments
                                                                )
                                                            "
                                                            @updateValue="
                                                                updateValue2(
                                                                    filterIndex,
                                                                    ...arguments
                                                                )
                                                            "
                                                        />
                                                    </vs-col>
                                                    <vs-col xs="6" sm="3" lg="2">
                                                        <vs-button
                                                            danger
                                                            border
                                                            style="margin-top: 20px"
                                                            @click="
                                                                handleRemoveData(item, filterIndex)
                                                            "
                                                        >
                                                            <i class="bx bx-minus"></i> Del
                                                        </vs-button>
                                                    </vs-col>
                                                </vs-row>
                                                <vs-row
                                                    v-if="
                                                        column.typeInputDetail.toLowerCase() ===
                                                            'others' ||
                                                        (column.typeInputDetail.toLowerCase() ===
                                                            'hide_column' &&
                                                            item.filter.length === 0)
                                                    "
                                                >
                                                    <vs-button
                                                        shadow
                                                        relief
                                                        :active="true"
                                                        @click="handleAddData(item)"
                                                    >
                                                        <i class="bx bx-plus"></i> Add Filter
                                                    </vs-button>
                                                </vs-row>
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
                                        <!-- ✅ Missroute -->
                                        <template
                                            v-if="
                                                item[column.is_missroute] !== undefined &&
                                                item[column.is_missroute] === 1
                                            "
                                        >
                                            <div class="tooltip-container">
                                                <!-- <vs-button
                          class="status-missroute"
                          circle
                          icon
                          disabled
                          :active="false"
                        >
                      </vs-button> -->
                                                <svg
                                                    width="30px"
                                                    height="30px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.295 10.585L8.705 8L8 8.705L10.585 11.29L11.295 10.585ZM13.25 8L14.27 9.02L8 15.295L8.705 16L14.98 9.73L16 10.75V8H13.25ZM12.71 13.41L13.415 12.705L14.98 14.27L16 13.25V16H13.25L14.275 14.975L12.71 13.41Z"
                                                        fill="#eddb34"
                                                    />
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                                                        fill="#eddb34"
                                                    />
                                                </svg>
                                                <span class="tooltip-text">Missroute Received</span>
                                            </div>
                                        </template>

                                        <!-- ✅ Normal status -->
                                        <template
                                            v-else-if="
                                                item[column.key] !== undefined &&
                                                item[column.is_missroute] !== 1
                                            "
                                        >
                                            <vs-button
                                                circle
                                                icon
                                                border
                                                disabled
                                                :danger="item[column.key] == false ? true : false"
                                                :active="false"
                                            >
                                                <i
                                                    :class="`bx bx-${
                                                        item[column.key] == false ? 'x' : 'check'
                                                    }`"
                                                ></i>
                                            </vs-button>
                                        </template>
                                    </vs-td>
                                </template>
                                <template v-else>
                                    <vs-td
                                        :key="key"
                                        :class="[
                                            column.textAlign ? column.textAlign : '',
                                            item.width ? item.width : '',
                                        ]"
                                        :style="
                                            column['textColor']
                                                ? { color: column['textColor'] }
                                                : {}
                                        "
                                    >
                                        <template
                                            v-if="
                                                split(column.key).length == 2 &&
                                                item.hasOwnProperty(split(column.key)[0])
                                            "
                                        >
                                            {{
                                                item.hasOwnProperty(split(column.key)[0])
                                                    ? item[split(column.key)[0]][
                                                          split(column.key)[1]
                                                      ]
                                                    : ''
                                            }}
                                        </template>

                                        <template
                                            v-if="
                                                textDanger !== undefined &&
                                                column.key !== undefined &&
                                                item[textDanger] &&
                                                column.key === 'koli_number'
                                            "
                                        >
                                            <span
                                                class="tooltip-wrapper text-danger"
                                                @click="handleEdit(item)"
                                            >
                                                {{ item[column.key] ? item[column.key] : '' }}
                                                <span class="tooltip-text">Priority Delivery</span>
                                            </span>
                                        </template>

                                        <template
                                            v-else-if="
                                                hasLinked !== undefined &&
                                                hasLinked.length > 0 &&
                                                column.key !== undefined &&
                                                hasLinked.includes(column.key.toLowerCase())
                                            "
                                        >
                                            <template
                                                v-if="
                                                    hasLinkedDanger !== undefined &&
                                                    column.key !== undefined &&
                                                    item[hasLinkedDanger]
                                                "
                                            >
                                                <span
                                                    class="text-danger"
                                                    @click="handleEdit(item)"
                                                    v-copy="item[column.key]"
                                                    >{{
                                                        item[column.key] ? item[column.key] : ''
                                                    }}</span
                                                >
                                            </template>
                                            <template
                                                v-else-if="column.key === 'koli_with_priority'"
                                            >
                                                <span
                                                    class="text-link priority-link"
                                                    @click="handleEdit(item)"
                                                    v-copy="item[column.key]"
                                                    v-html="item[column.key]"
                                                    :data-testid="`data-${column.key}-${
                                                        item[column.key]
                                                    }`"
                                                ></span>
                                            </template>
                                            <template v-else>
                                                <span
                                                    class="text-link"
                                                    @click="handleEdit(item)"
                                                    v-copy="item[column.key]"
                                                    :data-testid="`data-${column.key}-${
                                                        item[column.key]
                                                    }`"
                                                    >{{
                                                        item[column.key] ? item[column.key] : ''
                                                    }}</span
                                                >
                                            </template>
                                        </template>
                                        <template
                                            v-else-if="
                                                hasLinked2 !== undefined &&
                                                hasLinked2.length > 0 &&
                                                column.key !== undefined &&
                                                hasLinked2.includes(column.key.toLowerCase())
                                            "
                                        >
                                            <span
                                                class="text-link"
                                                @click="handleEdit2(item)"
                                                v-copy="item[column.key]"
                                                >{{
                                                    item[column.key] ? item[column.key] : ''
                                                }}</span
                                            >
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
                                            <span
                                                class="text-link"
                                                @click="handleEdit3(item)"
                                                v-copy="item[column.key]"
                                                >{{
                                                    item[column.key] ? item[column.key] : ''
                                                }}</span
                                            >
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
                                        <template
                                            v-else-if="
                                                item[hasLinkedCustomValidation] &&
                                                hasLinkedCustom !== undefined &&
                                                hasLinkedCustom.length > 0 &&
                                                column.key !== undefined &&
                                                hasLinkedCustom.includes(column.key.toLowerCase())
                                            "
                                        >
                                            <span
                                                class="text-link"
                                                @click="handleEditCustom(item)"
                                                v-copy="item[column.key]"
                                                >{{
                                                    item[column.key] ? item[column.key] : ''
                                                }}</span
                                            >
                                        </template>
                                        <template v-else-if="column.key === 'is_confirmed'">
                                            <span
                                                v-if="item[column.key] === 'Confirmed'"
                                                class="greenBackground"
                                                >{{ item[column.key] }}</span
                                            >
                                            <span v-else>{{ item[column.key] }}</span>
                                        </template>
                                        <template v-else-if="column.key === 'status_with_color'">
                                            <span
                                                class="statusBackground"
                                                :style="{
                                                    backgroundColor: getStatusColor(
                                                        item[column.key]
                                                    ),
                                                }"
                                                v-copy="item[column.key]"
                                            >
                                                {{ item[column.key] }}
                                            </span>
                                        </template>
                                        <template v-else-if="column.key === 'status_delivery'">
                                            <span
                                                v-if="item[column.key] === 'DELIVERED'"
                                                class="greenBackground"
                                                v-copy="item[column.key]"
                                                >{{ item[column.key] }}</span
                                            >
                                            <span v-else v-copy="item[column.key]">{{
                                                item[column.key]
                                            }}</span>
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
                                        <template v-else-if="column.key === 'status_with_tooltip'">
                                            <span v-html="item[column.key]"></span>
                                        </template>
                                        <template v-else>
                                            <span
                                                :class="{
                                                    'do-not-wrap-parent': column.isTransitTag,
                                                }"
                                            >
                                                <span
                                                    :data-testid="`data-${column.key}-${item.no}`"
                                                    :class="{
                                                        'do-not-wrap':
                                                            column.isTransitTag ||
                                                            (typeof item[column.key] === 'string' &&
                                                                item[column.key].includes('\n')),
                                                    }"
                                                    :style="
                                                        column.isTransitTag &&
                                                        item[column.isTransitTag] === 1
                                                            ? { borderBottom: '1px solid #666' }
                                                            : {}
                                                    "
                                                    v-copy="item[column.key]"
                                                    style="cursor: pointer"
                                                >
                                                    {{
                                                        item[column.key]
                                                            ? column.type_amount
                                                                ? Intl.NumberFormat('en-GB').format(
                                                                      item[column.key]
                                                                  )
                                                                : item[column.key]
                                                            : ''
                                                    }}
                                                </span>
                                                <span
                                                    v-if="column.hasTooltip"
                                                    style="
                                                        margin-left: 5px;
                                                        font-weight: bold;
                                                        color: #666;
                                                        cursor: help;
                                                    "
                                                >
                                                    <vs-tooltip bottom>
                                                        ?
                                                        <template #tooltip>
                                                            {{ column.tooltip }}
                                                        </template>
                                                    </vs-tooltip>
                                                </span>
                                                <span
                                                    v-if="
                                                        column.isTransitTag &&
                                                        item[column.isTransitTag] === 1
                                                    "
                                                    style="
                                                        display: ruby;
                                                        font-weight: bold;
                                                        font-style: italic;
                                                        font-size: 10px;
                                                    "
                                                >
                                                    TRANSIT
                                                </span>
                                            </span>
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
                                            v-for="(
                                                actionItem, keyActionItem
                                            ) in listCustomActionList"
                                        >
                                            <vs-col :key="keyActionItem" w="3">
                                                <vs-button
                                                    block
                                                    flat
                                                    size="small"
                                                    :data-testid="`${actionItem.key}-button-${keyActionItem}`"
                                                    :disabled="
                                                        listenDisableAction
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
                                                            : item.hasOwnProperty(
                                                                  'button_danger'
                                                              ) &&
                                                              item['button_danger'].hasOwnProperty([
                                                                  actionItem.key.toLowerCase(),
                                                              ])
                                                            ? item['button_danger'][
                                                                  actionItem.key.toLowerCase()
                                                              ] == false
                                                                ? true
                                                                : false
                                                            : false
                                                    "
                                                    :warn="
                                                        actionItem.attribute
                                                            .toLowerCase()
                                                            .includes('warn')
                                                            ? true
                                                            : false
                                                    "
                                                    :active="true"
                                                    @click="actionUpdate(item, actionItem.key)"
                                                >
                                                    <span v-if="!isIconButton">{{
                                                        (item.hasOwnProperty('button_label') &&
                                                            item['button_label'][
                                                                actionItem.key.toLowerCase()
                                                            ]) ||
                                                        actionItem.label
                                                    }}</span>
                                                    <span v-if="isIconButton"
                                                        ><i class="bx bx-edit"></i
                                                    ></span>
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
                                    <vs-col v-if="hasManageVehicle" w="4">
                                        <vs-button
                                            block
                                            flat
                                            size="small"
                                            :active="true"
                                            :data-testid="`vehicle-button-${key}`"
                                            @click="actionManageVehicle(item)"
                                        >
                                            <span>Vehicle</span>
                                        </vs-button>
                                    </vs-col>
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            flat
                                            size="small"
                                            :active="true"
                                            :data-testid="`edit-button-${key}`"
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
                                            :data-testid="`remove-button-${key}`"
                                            :disabled="
                                                (item.hasOwnProperty('isDisabled') &&
                                                    item.isDisabled == true) ||
                                                !isAllowedRemove
                                            "
                                            @click="actionRemove(item)"
                                        >
                                            <span>Remove</span>
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                        <template v-if="hasDuplicateEditRemove == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            flat
                                            size="small"
                                            :active="true"
                                            @click="actionDuplicate(item)"
                                        >
                                            <span>Duplicate</span>
                                        </vs-button>
                                    </vs-col>
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
                                            :disabled="
                                                (item.hasOwnProperty('isDisabled') &&
                                                    item.isDisabled == true) ||
                                                !isAllowedRemove
                                            "
                                            @click="actionRemove(item)"
                                        >
                                            <span>Remove</span>
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                        <template v-if="editOnly == true">
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
                                            @click="actionEdit(item)"
                                        >
                                            <span>Edit</span>
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
                                                (item.hasOwnProperty('isDisabled') &&
                                                    item.isDisabled == true) ||
                                                !isAllowedRemove
                                            "
                                            type="submit"
                                            :data-testid="`remove-button-${key}`"
                                            @click="actionRemove(item)"
                                        >
                                            <span>Remove</span>
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                        <template v-if="searchPreviewAction == true">
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
                                            @click="actionSearchPreview(item)"
                                        >
                                            <span>Choose</span>
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                        <template v-if="removeDanger == true">
                            <vs-td class="action-responsive">
                                <vs-row justify="center" class="btn_action">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            size="small"
                                            flat
                                            danger
                                            :active="true"
                                            :disabled="
                                                (item.hasOwnProperty('isDisabled') &&
                                                    item.isDisabled == true) ||
                                                !isAllowedRemove
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
                        <template v-if="runsheetProofAction == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <i
                                        class="bx bxs-show"
                                        style="font-size: 36px"
                                        @click="actionRunsheetProofAction(item)"
                                    >
                                    </i>
                                    <!-- <vs-button
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
                    </vs-button> -->
                                </vs-row>
                            </vs-td>
                        </template>
                        <template
                            v-if="
                                printAction == true && item.hasOwnProperty('is_approve')
                                    ? item.is_approve === 1
                                    : printAction === true
                                    ? true
                                    : false
                            "
                        >
                            <vs-td :class="isMobile ? 'action-mobile' : 'action'">
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

                                    <template
                                        v-if="
                                            (checkDepositMethod === true &&
                                                item.deposit_method === 'CDM') ||
                                            checkDepositMethod === false
                                        "
                                    >
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
                                    <template v-if="typeof dynamicCancel === 'function'">
                                        <vs-col w="4">
                                            <vs-button
                                                block
                                                :disabled="
                                                    (item.hasOwnProperty('isDisabled') &&
                                                        item.isDisabled == true) ||
                                                    !dynamicCancel(item[dynamicCancelColumn])
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
                                                !item.hasOwnProperty('is_CT_user') ||
                                                item.is_CT_user
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
                                                v-for="(c_item, c_key) in Object.keys(
                                                    item.children
                                                )"
                                                :key="c_key"
                                                :class="
                                                    item.hasOwnProperty('children_width')
                                                        ? item['children_width'][c_item]
                                                        : ''
                                                "
                                                style="font-size: 0.85em; padding-left: 0.75em"
                                            >
                                                <template
                                                    v-if="
                                                        (item.children_hide_label &&
                                                            !item.children_hide_label.includes(
                                                                c_item
                                                            )) ||
                                                        !item.children_hide_label
                                                    "
                                                >
                                                    {{
                                                        c_item.replace(
                                                            /[&\/\\#,+$~%._'":*?<>{}]/g,
                                                            ' '
                                                        )
                                                    }}
                                                </template>
                                            </th>
                                        </tr>
                                        <tr>
                                            <template
                                                v-for="(c_item, c_td_key) in Object.keys(
                                                    item.children
                                                )"
                                            >
                                                <template
                                                    v-if="Array.isArray(item.children[c_item])"
                                                >
                                                    <td
                                                        :key="c_td_key"
                                                        :class="[
                                                            'is-runsheet-page',
                                                            item.hasOwnProperty('children_width')
                                                                ? item['children_width'][c_item]
                                                                : '',
                                                        ]"
                                                    >
                                                        <ul style="padding-left: 0.75em">
                                                            <li
                                                                v-for="(itm, idx) in item.children[
                                                                    c_item
                                                                ]"
                                                                :key="idx"
                                                                :style="{
                                                                    margin: '1em 0',
                                                                    ontSize: '0.85em',
                                                                    height: listenHasChildStatus
                                                                        ? '2.5rem'
                                                                        : '',
                                                                }"
                                                            >
                                                                <template
                                                                    v-if="
                                                                        item.children_type &&
                                                                        item.children_type.hasOwnProperty(
                                                                            c_item
                                                                        )
                                                                    "
                                                                >
                                                                    <template
                                                                        v-if="
                                                                            item.children_type[
                                                                                c_item
                                                                            ] === 'icon-warning' &&
                                                                            itm
                                                                        "
                                                                    >
                                                                        <vs-tooltip
                                                                            v-if="
                                                                                item.children_icon_tooltip.hasOwnProperty(
                                                                                    c_item
                                                                                )
                                                                            "
                                                                            bottom
                                                                        >
                                                                            <i
                                                                                class="bx bxs-error-circle icon-warning"
                                                                                style="
                                                                                    font-size: 30px;
                                                                                "
                                                                            ></i>
                                                                            <template #tooltip>
                                                                                {{
                                                                                    item.children_icon_tooltip &&
                                                                                    item.children_icon_tooltip.hasOwnProperty(
                                                                                        c_item
                                                                                    )
                                                                                        ? item
                                                                                              .children_icon_tooltip[
                                                                                              c_item
                                                                                          ]
                                                                                        : ''
                                                                                }}
                                                                            </template>
                                                                        </vs-tooltip>
                                                                    </template>
                                                                </template>
                                                                <template
                                                                    v-else-if="
                                                                        typeof itm === 'object'
                                                                    "
                                                                >
                                                                    <template
                                                                        v-for="(
                                                                            itm_keys, itm_i
                                                                        ) in Object.keys(itm)"
                                                                    >
                                                                        <p :key="itm_i">
                                                                            {{
                                                                                itm_keys +
                                                                                ' = ' +
                                                                                itm[itm_keys]
                                                                            }}
                                                                        </p>
                                                                    </template>
                                                                </template>
                                                                <template
                                                                    v-else-if="
                                                                        typeof itm === 'boolean'
                                                                    "
                                                                >
                                                                    <vs-button
                                                                        circle
                                                                        icon
                                                                        border
                                                                        disabled
                                                                        :danger="
                                                                            itm == false
                                                                                ? true
                                                                                : false
                                                                        "
                                                                        :active="false"
                                                                    >
                                                                        <i
                                                                            :class="`bx bx-${
                                                                                itm == false
                                                                                    ? 'x'
                                                                                    : 'check'
                                                                            }`"
                                                                        ></i>
                                                                    </vs-button>
                                                                </template>
                                                                <template v-else>
                                                                    <template
                                                                        v-if="
                                                                            hasLinkedChild !==
                                                                                undefined &&
                                                                            hasLinkedChild.length >
                                                                                0 &&
                                                                            itm !== undefined &&
                                                                            hasLinkedChild.includes(
                                                                                c_item
                                                                            )
                                                                        "
                                                                    >
                                                                        <p
                                                                            class="text-link"
                                                                            @click="
                                                                                handleEditLinkedChild(
                                                                                    item,
                                                                                    itm
                                                                                )
                                                                            "
                                                                            v-copy="itm"
                                                                            :data-testid="`data-${c_item}-${itm}`"
                                                                        >
                                                                            {{ itm ? itm : '' }}
                                                                        </p>
                                                                    </template>

                                                                    <template v-else>
                                                                        <template
                                                                            v-if="
                                                                                item.hasOwnProperty(
                                                                                    'type_amount'
                                                                                )
                                                                            "
                                                                        >
                                                                            <template
                                                                                v-if="
                                                                                    item.type_amount.includes(
                                                                                        c_item
                                                                                    )
                                                                                "
                                                                            >
                                                                                <p
                                                                                    style="
                                                                                        text-align: right;
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        Intl.NumberFormat(
                                                                                            'en-GB'
                                                                                        ).format(
                                                                                            itm
                                                                                        )
                                                                                    }}
                                                                                </p>
                                                                            </template>
                                                                            <template v-else="">
                                                                                <p>{{ itm }}</p>
                                                                            </template>
                                                                        </template>
                                                                        <template v-else>
                                                                            <p>
                                                                                {{ itm }}
                                                                            </p>
                                                                        </template>
                                                                    </template>
                                                                </template>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </template>
                                                <template v-else>
                                                    <td
                                                        :key="c_td_key"
                                                        :class="
                                                            item.hasOwnProperty('children_width')
                                                                ? item['children_width'][c_item]
                                                                : ''
                                                        "
                                                    >
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
                        :length="$vs.getLength($vs.getSearch(listenDataTable, search), localmax)"
                    />
                </template>
            </template>
        </vs-table>

        <vs-row class="mt-2" justify="space-between" align="center" v-if="dataTable.length > 0">
            <template v-if="hasPagination == true">
                <vs-col w="2" v-if="false">
                    <vs-button @click="handleExportCSV" :data-testid="`export-button`">
                        Export
                    </vs-button>
                </vs-col>
                <vs-col w="12">
                    <pagination-master
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :pageSize="pagination.page_size"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                    />
                </vs-col>
            </template>
        </vs-row>
    </div>
</template>
<script>
import master from '@/mixins/master'
import Pagination from '@/components/pagination/pagination.vue'
import Checkbox from '@/components/input/checkbox.vue'
import InputGeneral from '@/components/input/general'
import Selector from '@/components/input/select'
import asynchronousSelect from '@/components/input/asynchronousSelect'
import iterateSelector from '@/components/input/iterateInput2'
import AutoComplete from '@/components/input/autoComplete'
import { Dialog } from 'element-ui'
export default {
    name: 'tabelMaster',
    mixins: [master],
    components: {
        'pagination-master': Pagination,
        checkbox: Checkbox,
        'input-general': InputGeneral,
        selector: Selector,
        asynchronousSelect: asynchronousSelect,
        'iterate-selector': iterateSelector,
        'auto-complete': AutoComplete,
        'el-dialog': Dialog,
    },
    props: {
        hideColumnKey: String,
        dataTable: Array,
        dataColumn: Array,
        tableLoading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        hasAction: Boolean,
        hasManageVehicle: Boolean,
        scrollableAndStaticHeader: Boolean,
        hasAutoCompleteUrl: String,
        hasSelectLabel: String,
        hasSelectValue: String,
        hasDuplicateEditRemove: Boolean,
        hasPagination: Boolean,
        isAllowedRemove: {
            type: Boolean,
            default: true,
        },
        expandable: Boolean,
        hasLinkedDanger: String,
        textDanger: String,
        hasLinked: Array,
        hasLinked2: Array,
        hasLinked3: Array,
        hasLinked4: Array,
        hasLinkedCustom: Array,
        hasLinkedCustomValidation: Array,
        hasLinkedChild: Array,
        hasId: Boolean,
        isActionFirst: Boolean,
        editOnly: Boolean,
        removeOnly: Boolean,
        searchPreviewAction: Boolean,
        runsheetAction: Boolean,
        runsheetProofAction: Boolean,
        printAction: Boolean,
        pickupListAction: Boolean,
        tracingListAction: Boolean,
        updateAction: Boolean,
        avoidAction: Boolean,
        pickedAction: Boolean, //pickup list action picked
        cancelRequestAction: Boolean, //pickup request action cancel,
        approveCancelPrintRequestAction: Boolean,
        codAction: Boolean,
        customBtn: Boolean,
        customBtn_label: String,
        dynamicCancel: Function,
        dynamicCancelColumn: String,
        removeDanger: Boolean,

        isAllChecked: Boolean,

        isMultipleSelect: Boolean,
        isMultipleSelectWithIndex: Boolean,
        isShowCheckboxAll: Boolean,
        isMultipleSelectColoum: Boolean,
        selectedData: Array,
        isSearchAble: Boolean,
        isLocalPagination: Boolean,
        hasChildStatus: Boolean,
        actionWidth: String,

        customAction: Boolean,
        customActionList: Array,
        disableAction: Boolean,

        querySearch: Function, // klo ada auto complete [required]

        isKurirAccount: Boolean,
        isControlTowerAccount: Boolean,
        checkDepositMethod: Boolean,
        isIconButton: {
            type: Boolean,
            default: false,
        },

        allCheckCallback: {
            type: Function,
            default: undefined,
        },
        isAllCheckedCheckCallback: {
            type: Function,
            default: undefined,
        },

        onRowClickCallback: {
            type: Function,
            default: undefined,
        },
        onRowClickSelected: {
            type: Function,
            default: undefined,
        },
        onRowClickSelectDelete: {
            type: Function,
            default: undefined,
        },
        isSingleSelect: {
            type: Boolean,
            default: false,
        },
        icon_tooltip: String,

        isHideFilterColumn: Boolean,
        isHideTotalPerPage: Boolean,
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
            search: '',

            localPage: 1,
            localmax: 1000,
            dialogImageUrl: '',
            dialogVisible: false,

            columnSearch: '',
            showColumnDropdown: false,
            visibleKeys: [],
            toggleAllVisible: true,
        }
    },
    computed: {
        listenDataTable() {
            return this.dataTable
        },
        listenTableLoading() {
            return this.tableLoading
        },
        listenExpandable() {
            return this.expandable || false
        },
        listCustomActionList() {
            return this.customActionList || []
        },
        listenIsMultipleSelectWithIndex() {
            return this.isMultipleSelectWithIndex
        },
        listenIsShowCheckboxAll() {
            return this.isShowCheckboxAll || false
        },
        listenIsMultipleSelect() {
            return this.isMultipleSelect
        },
        listenIsMultipleSelectColoum() {
            return this.isMultipleSelectColoum
        },
        listenIsSearchAble() {
            return this.isSearchAble
        },
        listenHideIsFilterColumn() {
            return this.isHideFilterColumn
        },
        listenTotalPerPage() {
            return this.isHideTotalPerPage
        },
        listenIsLocalPagination() {
            return this.isLocalPagination
        },
        listenDisableAction() {
            return this.disableAction
        },
        listenHasChildStatus() {
            return this.hasChildStatus
        },
        listenIsSingleSelect() {
            return this.isSingleSelect || false
        },

        listenHideColumn() {
            return (
                this.listenPermissions?.['core_data_table']?.find(
                    (v) => v.feature === this.hideColumnKey
                )?.filter?.['HIDDEN_COLUMN'] || []
            )
        },
        listenEnableColumn() {
            return this.dataColumn
                .filter((col) => !this.listenHideColumn.includes(col.key))
                ?.map((col) => col.key)
        },
        validColumn() {
            return this.dataColumn
                .filter((col) => !this.listenHideColumn.includes(col.key))
                .filter((col) => col.label.toLowerCase().includes(this.columnSearch.toLowerCase()))
        },
        listenColumn() {
            return this.dataColumn.filter((col) => this.visibleKeys.includes(col.key))
        },
        showActionColumn() {
            return (
                this.isActionFirst ||
                this.hasAction ||
                this.hasDuplicateEditRemove ||
                this.editOnly ||
                this.removeOnly ||
                this.searchPreviewAction ||
                this.pickupListAction ||
                this.tracingListAction ||
                this.runsheetAction
            )
        },
        showSpecialActionColumn() {
            return (
                this.printAction ||
                this.avoidAction ||
                this.codAction ||
                this.customBtn ||
                this.customAction
            )
        },
    },
    watch: {
        tableLoading: function (val) {
            if (val !== undefined) {
                this.loading = val
                if (val == true) {
                    this.loadingHandler()
                } else {
                    this.closeLoading()
                }
            }
        },
        selectedData: function (val) {
            if (val !== undefined) {
                this.selected = val
            }
        },
        pageSize: function (val) {
            if (val !== undefined) {
                this.pagination.page_size = val
            }
        },
        page: function (val) {
            if (val !== undefined) {
                this.pagination.page = val
            }
        },
        limit: function (val) {
            if (val !== undefined) {
                this.pagination.limit = val
            }
        },
        dataTable: function () {
            if (this.listenExpandable) {
                this.resetExpandedRows()
            }
        },
        dataColumn: {
            handler(newVal) {
                if (this.visibleKeys.length === 0 && newVal.length > 0) {
                    this.visibleKeys = this.listenEnableColumn
                }
            },
            immediate: true,
            deep: true,
        },
        visibleKeys(newVal, oldVal) {
            if (newVal.length === this.validColumn.length) {
                this.toggleAllVisible = true
            } else {
                this.toggleAllVisible = false
            }
        },
    },
    methods: {
        resetExpandedRows() {
            const elements = document.querySelectorAll('.vs-table__tr__expand')
            elements.forEach((element) => {
                element.remove()
            })
        },
        split(arr) {
            return arr.split('.')
        },
        loadingHandler() {
            this.refloading = this.$vs.loading({
                target: this.$refs.tablee,
                type: 'scale',
                text: 'Loading...',
                background: '#EAEAEA',
            })
        },
        closeLoading() {
            this.refloading !== null ? this.refloading.close() : ''
        },
        handleColumnsOrder() {
            this.tableHeader = this.dataColumn ? this.dataColumn : []
        },
        actionLimit(val) {
            this.$emit('actionLimit', val)
        },
        actionPagination(val) {
            this.$emit('actionPagination', val)
        },
        handleAddData(val) {
            this.selected.push(val)
            this.$emit('handleAddData', val)
        },
        handleRemoveData(val, index) {
            this.$emit('handleRemoveData', val, index)
        },
        actionUpdate(val, key) {
            this.$emit('actionUpdate', val, key)
        },
        actionManageVehicle(val, key) {
            this.$emit('actionManageVehicle', val, key)
        },
        actionDuplicate(val, key) {
            this.$emit('actionDuplicate', val, key)
        },
        actionPopup(val, key) {
            this.$emit('actionPopup', val, key)
        },
        actionPopup2(item) {
            this.$emit('actionPopup2', item)
        },
        actionCollect(val) {
            this.$emit('actionCollect', val)
        },
        actionEdit(val) {
            this.$emit('actionEdit', val)
        },
        actionRemove(val) {
            this.$emit('actionRemove', val)
        },
        actionSelect(val) {
            this.$emit('actionSelect', val)
        },
        actionSearchPreview(val) {
            this.$emit('actionSearchPreview', val)
        },
        actionConfirmed(val, key) {
            this.$emit('actionConfirmed', val, key)
        },
        actionRunsheetProofAction(val, key) {
            this.$emit('actionRunsheetProofAction', val, key)
        },
        actionPrint(val) {
            this.$emit('actionPrint', val)
        },
        actionAvoid(val) {
            this.$emit('actionAvoid', val)
        },

        //pickup list action picked
        actionFailed(val) {
            this.$emit('actionFailed', val)
        },
        actionApprove(val) {
            this.$emit('actionApprove', val)
        },
        actionPicked(val) {
            this.$emit('actionPicked', val)
        },
        actionCancel(val) {
            this.$emit('actionCancel', val)
        },

        actionAddRemark(val) {
            this.$emit('actionAddRemark', val)
        },
        actionViewHistory(val) {
            this.$emit('actionViewHistory', val)
        },
        actionMessages(val) {
            this.$emit('actionMessages', val)
        },

        onfocuslah(info) {
            if (info?.typeInput !== '' && info?.typeInput?.includes('location_selector')) {
                this.$emit('onFocus_location_selector', info)
            }
            this.$emit('inputFocus', info)
        },
        inputFocus(index, val, info) {
            this.$emit('inputFocus', index, val, info)
        },

        updateValue(key, val, info = {}, dataObj) {
            if (this.listenIsMultipleSelect == true && dataObj != undefined) {
                if (!!this.selected.includes(dataObj) == false) {
                    this.selected.push(dataObj)
                }
            }
            this.$emit('updateValue', key, val, info, dataObj)
        },
        updateValue2(index, key, val, info = {}, dataObj) {
            this.$emit('updateValue', index, key, val, info, dataObj)
        },
        updateFormValue(value, formKey) {
            // Kirim aksi (action) ke Vuex store
            this.$store.commit('UPDATE_FORM_DATA', { key: formKey, value })
        },

        updateSelected() {
            this.$emit('updateSelected', this.selected)
        },

        updateSelected2(val) {
            this.$emit('updateSelected2', val, this.selected)
        },

        handleEdit(val) {
            this.$emit('handleEdit', val)
        },
        handleEdit2(val, key) {
            this.$emit('handleEdit2', val)
        },
        handleEdit3(val, key) {
            this.$emit('handleEdit3', val)
        },
        handleEditLinkedChild(val, key) {
            this.$emit('handleEditLinkedChild', val, key)
        },
        handleEditCustom(val, key) {
            this.$emit('handleEditCustom', val)
        },
        handlePictureCardPreview(val) {
            this.dialogImageUrl = val.image
            this.dialogVisible = true
        },

        onAllCheckChange() {
            this.selected = this.$vs.checkAll(this.selected, this.listenDataTable)

            if (typeof this.allCheckCallback === 'function') {
                this.allCheckCallback(this.allCheck, this.selected)
            }
        },

        onAllCheckWithIndexChange(val) {
            this.selected = this.$vs.checkAll(this.selected, this.listenDataTable)

            if (typeof this.isAllCheckedCheckCallback === 'function') {
                this.isAllCheckedCheckCallback(this.isAllChecked)
            }
        },

        onRowClick(event, item) {
            if (event.target?.tagName === 'TD') {
                if (typeof this.onRowClickCallback === 'function') {
                    this.onRowClickCallback(event, item, this.selected)
                }

                if (this.listenIsSingleSelect) {
                    this.selected = [item]
                }

                if (typeof this.onRowClickSelected === 'function') {
                    this.onRowClickSelected(item)
                }
            }
        },
        getStatusLabel(arr, val) {
            if (val !== '') {
                return arr?.find((item) => item.value === val)?.label
            }
            return ''
        },
        convertToCSV(columns, data) {
            const headers = columns.map((column) => column.label)
            const rows = data.map((item) =>
                columns.map((column) => {
                    let value = item[column.key] || ''
                    value = value.toString().replace(/"/g, '""')
                    if (value.includes(',') || value.includes('\n')) {
                        value = `"${value}"`
                    }
                    return value
                })
            )
            return [headers, ...rows].map((row) => row.join(',')).join('\n')
        },
        handleExportCSV() {
            const csv = this.convertToCSV(this.listenColumn, this.listenDataTable)
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const route = this.$route.path.replaceAll('/', '-').slice(1)
            const timestamp = new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-')
            const fileName = `${route} - ${timestamp}`

            if (navigator.msSaveBlob) {
                // For IE 10+
                navigator.msSaveBlob(blob, `${fileName}.csv`)
            } else {
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', `${fileName}.csv`)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        },

        toggleDropdown() {
            this.showColumnDropdown = !this.showColumnDropdown
        },
        closeOnOutsideClick(e) {
            const container = this.$refs.dropdownContainer
            if (this.showColumnDropdown && container && !container.contains(e.target)) {
                this.showColumnDropdown = false
            }
        },
        toggleAllColumns() {
            if (this.toggleAllVisible) {
                this.visibleKeys = this.validColumn?.map((col) => col.key)
            } else {
                this.visibleKeys = []
            }
        },
        getStatusColor(status) {
            if (!status) return 'gray'
            switch (status.toLowerCase()) {
                case 'safe':
                    return 'rgb(21, 224, 21)'
                case 'warning':
                    return 'rgb(255, 165, 0)'
                case 'over':
                    return 'rgb(255, 0, 0)'
                default:
                    return 'gray'
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.closeOnOutsideClick)
        this.handleColumnsOrder()
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeOnOutsideClick)
    },
}
</script>
<style lang="scss">
.vs-table-content > .vs-table > table {
    width: max-content !important;
    min-width: 100% !important;
    table-layout: auto;
    white-space: nowrap;
}
.vs-table-content th,
.vs-table-content td,
.vs-table-content td span {
    white-space: nowrap;
}

.do-not-wrap-parent {
    display: inline-grid;
}
.do-not-wrap {
    white-space: pre-line !important;
}

.vs-table {
    table {
        width: max-content;
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
        .center {
            text-align: center !important;
        }
        .right {
            text-align: right !important;
        }
        .left {
            text-align: left !important;
        }
        .auto {
            width: auto;
        }
        .action {
            &.vs-table__th {
                position: relative;
                width: 280px !important;
                min-width: 140px;
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
                    max-width: 300px;
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
        .action-mobile {
            .vs-table__th__content {
                justify-content: center !important;
            }
            &.vs-table__td {
                .btn_action {
                    justify-content: center !important;
                    .vs-col {
                        display: flex !important;
                        justify-content: center !important;
                    }
                    button {
                        margin: 0 !important;
                        min-width: 5em !important;
                    }
                }
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
        .action-responsive {
            .vs-table__th__content {
                justify-content: center !important;
            }
            &.vs-table__td {
                .btn_action {
                    justify-content: center !important;
                    .vs-col {
                        display: flex !important;
                        justify-content: center !important;
                    }
                    button {
                        margin: 0 !important;
                        min-width: 5em !important;
                    }
                }
            }
        }
    }
}

.scrollableAndStaticHeader {
    .vs-table {
        height: fit-content;
        max-height: 200px;

        .vs-tr {
            position: 'sticky';
            top: '0';
            z-index: 9999;
        }
    }
}

span.text-link {
    display: inline-block;
    color: rgb(53, 92, 255);
    cursor: pointer;
}
p.text-link {
    color: rgb(53, 92, 255);
    cursor: pointer;
}
span.text-danger {
    display: inline-block;
    color: rgba(255, 71, 87, 255);
    cursor: pointer;
}
.is-runsheet-page {
    li {
        display: flex;
        align-items: center;
    }
    li p,
    li button {
        margin: 0.5rem 0 !important;
    }
}
.vs-table__th,
.vs-table__td {
    padding: 1rem !important;
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
.statusBackground {
    color: rgb(255, 255, 255);
    padding: 5px 5px !important;
    border-radius: 3px;
    display: flex;
    width: 80px;
    place-content: center;
}
.icon-warning {
    font-size: 48px;
    color: #ffcc00;
}
.padding-top {
    padding-top: 3em !important;
}

.vs-table__tr.selected .vs-table__td {
    color: #424242 !important;
}

.automation-id {
    display: none;
}

.tooltip-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.tooltip-wrapper .tooltip-text {
    visibility: hidden;
    background-color: #333;
    color: #fff;
    font-size: 12px;
    text-align: center;
    border-radius: 6px;
    padding: 5px 8px;
    position: absolute;
    z-index: 100;
    bottom: 40%; /* tampil di atas */
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    margin-bottom: 4px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip-wrapper:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
</style>
<style scoped>
.column-toggle-wrapper {
    position: relative;
}

.column-dropdown-panel {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 15px;
    width: 250px;
    border-radius: 4px;
    margin-top: 5px;
}

.checkbox-scroll {
    max-height: 250px;
    overflow-y: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

.footer-actions {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.missroute-icon {
    color: #fbe99d;
    font-size: 30px;
    cursor: default;
}

.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip-container .tooltip-text {
    visibility: hidden;
    width: max-content;
    background-color: #111;
    color: #fff;
    text-align: center;
    padding: 5px 8px;
    border-radius: 6px;

    position: absolute;
    z-index: 100;
    bottom: 125%; /* posisi di atas elemen */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
}

.tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}

.priority-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1.25;
    vertical-align: middle;
    cursor: pointer;
}
.columns-label {
    font-weight: bold;
    color: #333;
}
</style>
