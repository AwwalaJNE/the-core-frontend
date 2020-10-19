<template>
    <div>
        <h3 style="text-align:left">[Breadcrumb Component]</h3>
        <vs-button
            flat
            :active="dialogUser == true"
            @click="openDialogUser"
        >
            Active
        </vs-button>
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">
                        <div class="nav-box">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </div>
                        <template v-if="navActive === 'k-USER'">
                            <transition name="slide-fade">
                                <user-list />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-ROLES'">
                            <transition name="slide-fade">
                                <role-list />
                            </transition>
                        </template>
                    </div>
                </vs-col>
                <template v-if="navActive === 'k-PERMISSIONS'">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="8">
                       <div class="box">[content]</div>
                    </vs-col>
                </template>
            </vs-row>
        </section>

        <!--Create Edit User Dialog-->
            <dialog-create-edit-user 
            :active="dialogUser" 
            :closeDialogUser="closeDialogUser"
            title="New users"
            />
        <!--Create Edit User Dialog end-->
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
// users
import UserList from "@/views/settings/users/userList/userList"
import DialogCreateEditUser from "@/views/settings/users/userList/dialogCreateEditUser"
// role
import RoleList from "@/views/settings/users/roleList"

export default {
    name:"Users",
    components: {
        "nav-item": NavItem,
        "user-list": UserList,
        "role-list": RoleList,
        "dialog-create-edit-user": DialogCreateEditUser
    },
    data() {
        return {
            navItemm: [
                {
                    label: "USER",
                    key: "k-USER"
                },
                {
                    label: "ROLES",
                    key: "k-ROLES"
                },
                {
                    label: "PERMISSIONS",
                    key: "k-PERMISSIONS"
                },
            ],
            navActive: "k-USER",
            dialogUser: false
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val
        },
        openDialogUser(){
            this.dialogUser = true
        },
        closeDialogUser() {
            this.dialogUser = false
        }
    },
}
</script>
<style lang="scss">
    .users{
        min-height: 50vh;
        .view{
            min-height: 400px;
        }
        .nav-box{
            position: relative;
            top: 0;
            left: 0;
            width: auto;
            max-width: 350px;
        }
    }
</style>