<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position: relative; display: flex; justify-content: flex-end">
                    <div style="width: 100px; padding-right: 5px">
                        <vs-button
                            flat
                            block
                            :active="true"
                            :data-testid="`create-button-${navActive}`"
                            @click="openDialog"
                        >
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="users">
            <vs-row justify="space-around">
                <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    :w="`${navActive === 'k-PERMISSIONS' ? '4' : '12'}`"
                >
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item :navItem="navItem" @activeTab="activeTab" />
                            </vs-col>
                        </vs-row>

                        <template v-if="navActive === 'k-USER'">
                            
                                <user-list :ref="navActive" :query="tempSearch" />
                            
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </section>

        <dialog-create-edit-user title="New user" :active="dialogUser" :closeDialog="closeDialog" />
    </div>
</template>
<script>
import master from '@/mixins/master'

import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'

import UserList from '@/views/settings/users/user/userList'
import DialogCreateEditUser from '@/views/settings/users/user/dialogCreateEditUser'

export default {
    name: 'Users',
    mixins: [master],
    components: {
        breadcrumb: Breadcrumb,
        'nav-item': NavItem,
        'search-input': SearchInput,
        'user-list': UserList,
        'dialog-create-edit-user': DialogCreateEditUser,
    },
    data() {
        return {
            navItem: [
                {
                    label: 'USER',
                    key: 'k-USER',
                    title: 'User List',
                },
            ],
            navActive: 'k-USER',
            dialogUser: false,
            title: 'User List',
            loading: false,
            dataItem: {},
            tempSearch: '',
            refreshInject: '',
        }
    },
    methods: {
        refresh() {
            this.$refs[this.navActive].refresh()
        },
        searchValue(val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val

            let item = this.navItem.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog() {
            switch (this.navActive) {
                case 'k-USER':
                    this.dialogUser = true
                    break
                default:
            }
        },
        closeDialog() {
            switch (this.navActive) {
                case 'k-USER':
                    this.dialogUser = false
                    this.refresh()
                    break
                default:
            }
        },
    },
}
</script>
<style lang="scss">
.users {
    min-height: 50vh;
    .view {
        min-height: 400px;
    }
    .nav-box {
        position: relative;
        top: 0;
        left: 0;
        width: auto;
        max-width: 350px;
    }
}
</style>
