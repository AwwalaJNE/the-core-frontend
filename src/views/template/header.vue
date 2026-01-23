<template>
    <header class="header shadow">
        <vs-row justify="space-between" align="center">
            <vs-col xs="2" sm="3" lg="2">
                <vs-row>
                    <vs-col xs="3" sm="3" lg="3">
                        <vs-button @click="clickProps" size="l" :active="true" border icon>
                            <i class="bx bx-menu"></i>
                        </vs-button>
                    </vs-col>
                    <vs-col xs="3" sm="3" lg="3">
                        <Logo />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="10" sm="9" lg="10">
                <vs-row justify="flex-end" align="center" style="gap: 0.75em">
                    <vs-col xs="1" sm="1" lg="1">
                        <template v-if="!hasPermission('update-timezone')">
                            <vs-tooltip bottom>
                                <template #tooltip>
                                    Kamu tidak punya izin untuk update timezone
                                </template>
                                <selector
                                    formKey="timezone_selector"
                                    :hiddenTitle="true"
                                    :valueData="dataTimezone"
                                    :selectedValue="selectedTimezone"
                                    :isMultiple="false"
                                    :border="true"
                                    :tabindex="-1"
                                    :disabled="!hasPermission('update-timezone')"
                                    @updateValue="updateValue"
                                />
                            </vs-tooltip>
                        </template>
                        <template v-else>
                            <selector
                                formKey="timezone_selector"
                                :hiddenTitle="true"
                                :valueData="dataTimezone"
                                :selectedValue="selectedTimezone"
                                :isMultiple="false"
                                :border="true"
                                :tabindex="-1"
                                :disabled="false"
                                @updateValue="updateValue"
                            />
                        </template>
                    </vs-col>

                    <!-- TODO: UNCOMMENT LATER -->
                    <!-- <vs-col xs="1" sm="1" lg="1">
                        <selector 
                            formKey="language_selector"
                            :hiddenTitle=true
                            :valueData="dataLanguage"
                            :selectedValue="selectedLanguage"
                            :isMultiple="false"
                            :border="true"
                            @updateValue="updateValue" 
                        />
                    </vs-col> -->

                    <vs-col xs="10" sm="4" lg="4">
                        <template v-if="datanode.length > 0">
                            <selector
                                formKey="node_selector"
                                ref="node_selector"
                                :hiddenTitle="true"
                                :valueData="datanode"
                                :selectedValue="selectedNode"
                                :isMultiple="false"
                                :border="true"
                                :tabindex="-1"
                                @updateValue="updateValue"
                            />
                        </template>
                    </vs-col>

                    <vs-avatar @click="openDialog">
                        <i class="bx bx-search"></i>
                    </vs-avatar>

                    <search-general
                        :active="dialogSearchGeneral"
                        :closeDialog="closeDialogSearchGeneral"
                        title=""
                    />

                    <div class="user-menu-wrapper" @click.stop>
                        <vs-avatar @click="toggleUserMenu">
                            <i class="bx bx-user"></i>
                        </vs-avatar>

                        <transition name="fade">
                            <div v-if="showUserMenu" class="user-menu">
                                <div class="body">
                                    <vs-avatar circle size="60">
                                        <i class="bx bx-user"></i>
                                    </vs-avatar>
                                    <div class="user-text">
                                        {{ userAuthFullName }}
                                        <span>
                                            {{ userAuthLoginName }}
                                        </span>
                                    </div>
                                </div>
                                <footer>
                                    <core-button name="edit-profile" @click="goToProfile">
                                        Edit Profile
                                    </core-button>
                                    <core-button name="logout" variant="danger" @click="logout">
                                        Logout
                                    </core-button>
                                </footer>
                            </div>
                        </transition>
                    </div>
                </vs-row>
            </vs-col>
        </vs-row>
    </header>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import Button from '@/components/button'
import Logo from '@/components/logo/logo.vue'
import Selector from '@/components/input/select'
import SearchInput from '@/components/search/searchInput'
import SearchGeneral from '@/components/search/searchGeneral'
export default {
    name: 'main-header',
    components: {
        Logo: Logo,
        selector: Selector,
        'search-input': SearchInput,
        'search-general': SearchGeneral,
        'core-button': Button,
    },
    mixins: [master],
    props: {
        clickProps: Function,
    },
    data() {
        return {
            activeSidebar: false,
            activeTooltip1: false,
            dialogSearchGeneral: false,
            tempSearch: '',
            selectedNode: '',
            datanode: [],
            selectedLanguage: '',
            dataLanguage: [
                {
                    label: 'Indonesia',
                    value: 'ID',
                    code: 'ID',
                },
                {
                    label: 'English',
                    value: 'EN',
                    code: 'EN',
                },
            ],
            selectedLanguage: '',
            dataLanguage: [
                {
                    label: 'Indonesia',
                    value: 'ID',
                    code: 'ID',
                },
                {
                    label: 'English',
                    value: 'EN',
                    code: 'EN',
                },
            ],
            // dataTimezone: [],
            selectedTimezone: '',
            dataTimezone: [
                {
                    label: 'WIB',
                    value: 'Asia/Jakarta',
                },
                {
                    label: 'WITA',
                    value: 'Asia/Makassar',
                },
                {
                    label: 'WIT',
                    value: 'Asia/Jayapura',
                },
            ],
            userAuthFullName: '',
            userAuthLoginName: '',
            showUserMenu: false,
        }
    },
    methods: {
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu
        },
        closeUserMenu() {
            this.showUserMenu = false
        },
        searchValue(val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        closeDialogSearchGeneral() {
            this.dialogSearchGeneral = false
        },
        openDialog() {
            this.dialogSearchGeneral = true
        },
        updateValue(key, val) {
            switch (key) {
                case 'timezone_selector':
                    this.updateTimezone(val)
                    break
                case 'language_selector':
                    this.selectedLanguage = val
                    this.$ls.set('language', val)
                    window.location.reload(true)
                    break
                case 'node_selector':
                    this.updateNode()
                    break
                default:
            }
        },
        async logout() {
            try {
                await this.setRoutePageHistory({}, true)
            } catch (error) {
            } finally {
                localStorage.clear()
                this.$router.go(0)
            }
        },
        goToProfile() {
            if (this.$route.name !== 'profile') this.$router.push({ name: 'profile', params: {} })
            this.setRoutePageHistory(this.$route.meta, false)
        },
        async updateNode(key, val) {
            this.openNotification(
                'danger',
                null,
                'Failed!',
                'Failed to change data node. This feature is not available yet.'
            )
            // let node = this.datanode.filter((item) => item.value == val)
            // let form = {
            //     node_id: node[0].value,
            // }
            // await axios
            //     .patch(
            //         `${this.URL.user}/${this.listenActiveUser['user_id']}/node?n=${this.listenNodeId}`,
            //         form,
            //         this.Helper.header()
            //     )
            //     .then((res) => {
            //         this.$ls.set('node_id', node[0])
            //         this.$store.dispatch(`SET_USER_N`, node[0])
            //         this.openNotification(
            //             'success',
            //             null,
            //             'Success!',
            //             res.data.message || 'Node Updated!'
            //         )
            //         this.$router.go(0)
            //     })
            //     .catch((err) => {
            //         this.openNotification(
            //             'danger',
            //             err.response ? err.response.data.code : '',
            //             'Failed!',
            //             'Failed to change data node!'
            //         )
            //     })
        },
        async getTimezone() {
            this.loading = true

            try {
                const res = await axios.get(
                    `${this.URL.geolocation_timezone}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data.length > 0) {
                    let specialTimezones = {
                        'Asia/Jakarta': 'WIB',
                        'Asia/Makassar': 'WITA',
                        'Asia/Jayapura': 'WIT',
                    }

                    let arr = res.data.data.map((item) => {
                        let tz = item.name
                        return {
                            label: tz,
                            value: item.code,
                            ...(specialTimezones[tz] && { code: specialTimezones[tz] }),
                        }
                    })

                    this.dataTimezone = arr
                } else {
                    this.dataTimezone = this.dataMappingTimezone
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async updateTimezone(timezone) {
            this.loading = true
            try {
                const res = await axios.patch(
                    `${this.URL.user_preferences}/${this.listenActiveUser?.user_id}/timezone?n=${this.listenNodeId}`,
                    { timezone: timezone },
                    this.Helper.header()
                )

                this.selectedTimezone = timezone
                this.$ls.set('timezone', timezone)
                window.dispatchEvent(new CustomEvent('timezone-changed', { detail: timezone }))
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        init() {
            this.userAuthLoginName = this.listenActiveUser?.user_login
            this.userAuthFullName = this.listenActiveUser?.user_name
            this.selectedNode = this.listenNodeId.toString()

            this.selectedLanguage = this.$ls.get('language')
            this.selectedTimezone = this.$ls.get('timezone')

            let arrDataNode = this.$ls.get('node_id') || []

            arrDataNode = arrDataNode?.map((item) => ({
                label: item.node_name,
                value: String(item.node_id),
                node_code: String(item.node_code),
                is_cdm: Boolean(item.is_cdm),
            }))

            this.datanode = arrDataNode

            // TODO: UNCOMMENT IF WANNA USE MASTERDATA TIMEZONE
            // this.getTimezone();
        },
        searchShortcut() {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
                    e.preventDefault()
                    this.openDialog()
                }
            })
        },
    },
    mounted() {
        this.init()
        this.searchShortcut()

        document.addEventListener('click', this.closeUserMenu)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeUserMenu)
    },
}
</script>
<style lang="scss">
/* ================= HEADER ================= */
.header {
    width: 100%;
    left: 0;
    top: 0;
    z-index: 95000;
    min-height: 1.5em;
    padding: 0.5em 0.5em 0.5em 0;
    background-color: $bgWhite;
    position: sticky;

    .burger_custom {
        width: 40px;
        height: 40px;
        margin: 0.3em auto 0;
        padding: 0.2em 0;

        border: 1px solid rgba(var(--vs-primary), 1);
        background: rgba(var(--vs-primary), 1);

        color: #fff;
        font-size: 24px;
        border-radius: 10px;
        cursor: pointer;
    }

    .vs-col {
        padding: 0;
    }

    .vs-button--icon i {
        font-size: 1.5rem;
    }

    .logo {
        padding-top: 10px;
        max-height: 50px;
    }

    shadow {
        box-shadow: 0 3px 33px -12px rgba(0, 0, 0, 0.42);
    }

    .m-select.vs-select-content {
        margin-top: 6px;
    }

    @include for-phone-only {
        min-height: 1em;
    }
}

/* ================= USER MENU ================= */
.user-menu-wrapper {
    position: relative;

    .user-menu {
        position: absolute;
        top: 55px;
        right: 0;
        z-index: 999999;
        min-width: 220px;
        padding: 12px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

        .body {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }

        .vs-avatar {
            flex-shrink: 0;
            cursor: pointer;
        }

        .user-text {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 0.55rem;
            font-weight: normal;

            span {
                font-weight: bold;
                font-size: 0.7rem;
            }
        }

        footer {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

/* ================= TRANSITION ================= */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
