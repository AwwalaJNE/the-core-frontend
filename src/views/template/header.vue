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

                    <vs-tooltip bottom shadow interactivity not-hover v-model="activeTooltip1">
                        <vs-avatar @click="activeTooltip1 = !activeTooltip1">
                            <i class="bx bx-user"></i>
                        </vs-avatar>
                        <template #tooltip>
                            <div class="content-tooltip">
                                <div class="body">
                                    <vs-avatar circle size="60">
                                        <i class="bx bx-user"></i>
                                    </vs-avatar>
                                    <div class="text">
                                        {{ userAuthFullName }}
                                        <span>
                                            {{ userAuthLoginName }}
                                        </span>
                                    </div>
                                </div>
                                <footer>
                                    <vs-button circle @click="goToProfile">
                                        Edit Profile
                                    </vs-button>
                                    <vs-button circle @click="logout" danger> Logout </vs-button>
                                </footer>
                            </div>
                        </template>
                    </vs-tooltip>
                </vs-row>
            </vs-col>
        </vs-row>
    </header>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
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
        }
    },
    methods: {
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
            let node = this.datanode.filter((item) => item.value == val)
            let form = {
                node_id: node[0].value,
            }
            await axios
                .patch(
                    `${this.URL.user}/${this.listenActiveUser['user_id']}/node?n=${this.listenNodeId}`,
                    form,
                    this.Helper.header()
                )
                .then((res) => {
                    this.$ls.set('node_id', node[0])
                    this.$store.dispatch(`SET_USER_N`, node[0])
                    this.openNotification(
                        'success',
                        null,
                        'Success!',
                        res.data.message || 'Node Updated!'
                    )
                    this.$router.go(0)
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed!',
                        'Failed to change data node!'
                    )
                })
        },
        // async getListNode() {
        //     await axios
        //         .get(
        //             `${this.URL.user}/${this.listenActiveUser['user_id']}/node?n=${this.listenNodeId}`, this.Helper.header()
        //         )
        //         .then((res) => {
        //             let arr = []
        //             let node = res.data.data
        //                 node.length > 0 && node.map(item => {
        //                     let obj = {}
        //                     obj["label"] = item.node_name
        //                     obj["value"] = String(item.node_id)
        //                     obj["node_code"] = String(item.node_code)
        //                     obj["is_currently_used"] = item.is_currently_used

        //                     arr.push(obj)
        //             })

        //             this.datanode = arr
        //             let current_node = this.datanode.find(node => node.is_currently_used).value

        //             let n = this.$ls.get('node_id')
        //             if(n == null) {
        //                 this.$ls.set('node_id', this.datanode[0])
        //                 this.$ls.set('permissions',res.data.permission)
        //                 this.selectedNode = String(current_node)
        //                 this.$store.dispatch(`SET_USER_N`, this.datanode[0])
        //             } else {
        //                 this.$ls.set('permissions',res.data.permission)
        //                 this.$store.dispatch(`SET_USER_N`, n)
        //                 this.selectedNode = String(n.value)
        //             }
        //         })
        //         .catch((err) => {
        //             this.openNotification(
        //                 "danger",
        //                 err.response ? err.response.data.code : '',
        //                 "Failed!",
        //                 "Failed to get list data node!"
        //             );
        //         });
        // },
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
    },
}
</script>
<style lang="scss">
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
        margin: auto;
        margin-top: 0.3em;
        padding: 0.2em 0;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(var(--vs-primary), 1);
        background: rgba(var(--vs-primary), 1);
        color: #fff;
        font-size: 24px;
        border-radius: 10px;
        cursor: pointer;
    }
    .vs-col {
        padding-left: 0;
        padding-right: 0;
    }
    .vs-button--icon i {
        font-size: 1.5rem;
    }
    .logo {
        padding-top: 10px;
        max-height: 50px;
    }
    shadow {
        -webkit-box-shadow: 0px 3px 33px -12px rgba(0, 0, 0, 0.42);
        -moz-box-shadow: 0px 3px 33px -12px rgba(0, 0, 0, 0.42);
        box-shadow: 0px 3px 33px -12px rgba(0, 0, 0, 0.42);
    }

    .m-select.vs-select-content {
        margin-top: 6px;
    }

    @include for-phone-only {
        min-height: 1em;
    }
    @include for-tablet-portrait-down {
    }
    @include for-tablet-portrait-up {
    }
    @include for-tablet-landscape-up {
    }
    @include for-desktop-up {
    }
    @include for-lg-desktop-up {
    }
    @include for-big-desktop-up {
    }
}

.content-tooltip {
    .body {
        display: flex;
        align-items: flex-start;
        justify-content: center;

        .vs-avatar-content {
            margin-top: 0;
            border: 3px solid var(--vs-theme-layout);
            box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
        }

        .text {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 0.55rem;
            padding: 10px;
            font-weight: normal;

            span {
                font-weight: bold;
                font-size: 0.7rem;
            }
        }
    }

    footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h4 {
        padding: 8px;
        margin: 0px;
        text-align: left;
    }

    p {
        text-align: left;
        padding: 0px;
        margin: 0px;
        line-height: 1rem;
        padding-bottom: 5px;
        padding-left: 8px;
    }
}
</style>
