<template>
    <div class="custom">
        <div class="row">
            <div class="col">
                <vs-row justify="flex-end" class="hide-on-phone">
                    <vs-col w="6">
                        <p>Rows per page:</p>
                    </vs-col>
                    <vs-col w="4">
                        <vs-select
                            placeholder="Limit"
                            v-model="limit_page"
                            :data-testid="`select-rows-per-page`"
                            @change="actionLimit"
                        >
                            <vs-option
                                v-for="(item, key) in limitSelector"
                                :key="key"
                                :label="item"
                                :value="item"
                            >
                                {{ item }}
                            </vs-option>
                        </vs-select>
                    </vs-col>
                </vs-row>
            </div>
            <div class="col">
                <template v-if="!isMobile">
                    <vs-pagination
                        v-model="current_page"
                        :dotted-number="limit_page"
                        :length="page_size"
                        :data-testid="`pagination`"
                        @input="actionPagination"
                    />
                </template>
                <template v-else>
                    <vs-pagination
                        only-arrows
                        v-model="current_page"
                        :length="page_size"
                        :data-testid="`pagination`"
                        @input="actionPagination"
                    />
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import master from '@/mixins/master'
export default {
    name: 'pagination-component',
    mixins: [master],
    props: {
        page: {
            type: [Number, String],
            default: 1,
        },
        limit: {
            type: [Number, String],
            default: 20,
        },
        pageSize: {
            type: [Number, String],
            default: 1,
        },
    },
    data() {
        return {
            current_page: Number(this.page),
            page_size: Number(this.pageSize),
            limit_page: Number(this.limit),
            limitSelector: [20, 50, 100, 1000],
        }
    },
    watch: {
        page(val) {
            this.current_page = Number(val)
        },
        pageSize(val) {
            this.page_size = Number(val)
        },
        limit(val) {
            this.limit_page = Number(val)
        },
    },
    methods: {
        actionLimit(val) {
            this.$emit('actionLimit', val)
        },
        actionPagination(val) {
            this.$emit('actionPagination', val)
        },
    },
}
</script>
<style lang="scss">
.mmxr {
    @include for-phone-only {
        margin-right: 200px;
    }
}

.hide-on-phone {
    @include for-phone-only {
        display: none !important;
    }
}

.custom {
    position: relative;
    .row {
        position: relative;
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        .col {
            position: relative;
            width: auto;
            padding: 0 5px;
        }
    }
    p {
        text-align: right;
        font-size: 0.8em;
        margin: 0.5em 0;
    }
}
</style>
