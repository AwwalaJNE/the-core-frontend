<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <template>
                    <vs-row justify="end">
                        <vs-col>
                            <search-input
                                key="searchInput"
                                ref="searchInput"
                                :placeholder="searchPlaceholder"
                                @searchValue="searchValue"
                            />
                        </vs-col>
                    </vs-row>
                </template>
                <template>
                    <transition name="slide-fade">
                        <help-table :ref="'HelpTable'" :query="tempSearch" />
                    </transition>
                </template>
            </div>
        </section>
    </div>
</template>
<script>
import master from '@/mixins/master'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'

import HelpTable from '@/views/help/errorDictionary/helpTable'

export default {
    name: 'help',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'help-table': HelpTable,
        'search-input': SearchInput,
    },
    data() {
        return {
            title: 'Error Dictionary',
            tempSearch: '',
            searchPlaceholder: 'Search...',
        }
    },
    methods: {
        searchValue(val) {
            this.tempSearch = val
        },
    },
}
</script>
