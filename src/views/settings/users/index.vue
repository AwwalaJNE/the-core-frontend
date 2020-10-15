<template>
    <div>
        <h3 style="text-align:left">[Breadcrumb Component]</h3>
        <section class="box users">
            <div class="view">
                <div class="nav-box">
                    <nav-item :navItem="navItemm" @activeTab="activeTab" />
                </div>
                
                <transition name="slide-fade">
                    <div v-if="navActive === 'k-USER'"><user-list /></div>
                </transition>
            </div>
            <div class="view hide"></div>
        </section>
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab.vue"
import UserList from '@/views/settings/users/userList.vue'
export default {
    name:"Users",
    components: {
        "nav-item": NavItem,
        "user-list" : UserList
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
            navActive: "k-USER"
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val
        }
    },
}
</script>
<style lang="scss">
    .users{
        min-height: 50vh;
        .view{
            position: relative;
            display: block;
            visibility: visible;
            width: 100%;
            transition: all .3 ease-in;
            &.hide{
                visibility: hidden;
                width: 0;
            }
        }
        .nav-box{
            position: relative;
            top: 0;
            left: 0;
            width: auto;
            max-width: 350px;
        }
    }
    .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>