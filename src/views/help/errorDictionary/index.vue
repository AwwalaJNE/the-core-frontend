<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <template>
                    <transition name="slide-fade">
                        <help-table :ref="'HelpTable'" />
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

import HelpTable from '@/views/help/errorDictionary/helpTable'

export default {
    name: 'help',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'help-table': HelpTable,
    },
    data() {
        return {
            title: 'Error Dictionary',
        }
    },
}
</script>
