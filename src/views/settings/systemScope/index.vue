<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                            flat
                            block
                            :active="true"
                            @click="openDialog"
                        > 
                            <i v-if="navActive !== 'role-permission'" class="bx bx-plus"></i> 
                            {{ navActive === 'role-permission' ? 'Save All' : 'New' }}
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>
        <section style="display: flex;">
            <vs-col :w="`${navActive === 'role-permission'? '3' : '12'}`">
                <div class="box view">
                    <div class="nav-box">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item 
                                    :navItem="navItem" 
                                    @activeTab="activeTab" 
                                />
                            </vs-col>
                        </vs-row>
                    </div>
                    <template v-if="navActive === 'application-role'">
                        <transition name="slide-fade">
                            <application-role :ref="navActive" />
                        </transition>
                    </template>
                    <template v-else-if="navActive === 'role-permission'">
                        <transition name="slide-fade">
                            <role-list 
                                :ref="navActive" 
                                @getAppRoleId="getAppRoleId"
                            />
                        </transition>
                    </template>
                </div>
            </vs-col>
            <vs-col v-if="navActive === 'role-permission'" :w="9">
                <transition name="slide-fade">
                    <div class="box">
                        <edit-list 
                            :ref="navActive"
                            :app_role_id="listenAppRoleId"
                            :changes_form="changes_form"
                            @updateChangesForm="handleChangesForm"
                        />
                    </div>
                </transition>
            </vs-col>
        </section>
        <dialog-create-edit-application-role
            title="Create Application Role"
            :active="dialogApplicationRole" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index";
import NavItem from "@/components/navbar/navTab";

import ApplicationRole from "@/views/settings/systemScope/applicationRole/index";
import DialogCreateEditApplicationRole from "@/views/settings/systemScope/applicationRole/dialogCreateEdit";

import EditList from "@/views/settings/systemScope/rolePermission/editList";
import RoleList from "@/views/settings/systemScope/rolePermission/roleList";

export default {
    name:"setting-system-scope-index",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "nav-item": NavItem,
        "application-role": ApplicationRole,
        "edit-list": EditList,
        "role-list": RoleList,
        "dialog-create-edit-application-role": DialogCreateEditApplicationRole
    },
    data() {
        return {
            navItem: [
                {
                    label: "APPLICATION ROLE",
                    key: "application-role",
                    title: "Application Role"
                },
                {
                    label: "ROLE PERMISSION",
                    key: "role-permission",
                    title: "Role Permission"
                },
            ],
            title:"Application Role",
            navActive: "application-role",
            dialogApplicationRole: false,
            dialogRolePermission: false,
            loading: false,
            app_role_id: '',
            changes_form: []
        }
    },
    computed: {
        listenAppRoleId() {
            return this.app_role_id;
        }
    },
    methods: {
        handleChangesForm(form) {
            this.changes_form = form;
        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh()
        },
        activeTab(val) {
            this.navActive = val

            let item = this.navItem.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        getAppRoleId(id) {
            this.app_role_id = id;
        },
        async saveAll(){
            if (this.changes_form.length === 0) {
                this.openNotification("warn", '', "Warning", 'Please update permission first');
                return;
            }

            let form = {
                permission: this.changes_form
            }

            this.loading = true;
            try {
                const res = await axios.put(`${this.URL.application_role}/${this.app_role_id}/permission?n=${this.listenNodeId}`, form, this.Helper.header());

                this.openNotification('success', null, "Success", res?.data?.message || "Success Update Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.changes_form = []
            }
        },
        openDialog(){
            switch(this.navActive) {
                case "application-role":
                    this.dialogApplicationRole = true;
                    break;
                case "role-permission":
                    this.saveAll();
                    break;
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "application-role":
                    this.dialogApplicationRole = false;
                    break;
                case "role-permission":
                    this.dialogRolePermission = false;
                    break;
                default:
            }
        },
    },
}
</script>