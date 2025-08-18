<template>
    <div style="position: relative; width: 100%;">
        <vs-row justify="space-between">
            <vs-col xs="6" sm="6" lg="6">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ listenTitle }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <vs-row>
            <tab-menu :tab="childrenData" />
        </vs-row>

        <router-view />
    </div>
</template>

<script>
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index";
import TabMenu from "@/components/tab/tabMenu";

export default {
    name: "content-child-with-tab",
    mixins: [master],
    components: { 
        "breadcrumb": Breadcrumb, 
        "tab-menu": TabMenu 
    },
    data() {
        return {
            title: "",
            childrenData: [],
        }
    },
    computed: {
        listenTitle() {
            return this.title || ''
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler: "buildTabs",
        },
    },
    methods: {
        buildTabs() {
            const matched = this.$route.matched || [];
            if (matched.length < 1) {
                this.childrenData = [];
                this.title = '';
                return;
            }

            const parentRecord = matched.length > 1 && matched[matched.length - 2]?.path !== '' 
                ? matched[matched.length - 2] 
                : matched[matched.length - 1];

            if (!parentRecord) {
                this.childrenData = [];
                this.title = '';
                return;
            }

            const parentRoute = this.findRouteByName(this.$router.options.routes || [], parentRecord.name);
            if (!parentRoute) {
                this.childrenData = [];
                this.title = '';
                return;
            }

            const parentPath = parentRoute.path.replace(/^\/?/, "");
            this.childrenData = (parentRoute.children || [])
                .filter(child => {
                    const perm = child.meta?.permission;
                    return (
                        perm === '' ||
                        (typeof perm === 'string' && this.listenPermissions?.core?.includes(perm)) ||
                        (Array.isArray(perm) && perm.some(p => this.listenPermissions?.core?.includes(p)))
                    );
                })
                .map(child => {
                    const childPath = child.path.replace(/^\/?/, "");
                    return {
                        label: child.name,
                        url: `/${parentPath}/${childPath}`.replace(/\/+/g, "/"),
                        permission: child.meta.permission,
                        icon: child?.meta?.icon || 'bx bxs-checkbox'
                    };
                });


            // Redirect otomatis ke child pertama jika route saat ini parent
            if (this.childrenData.length && this.$route.path === `/${parentPath}`) {
                this.$router.replace(this.childrenData[0].url);
            }

            // Update title sesuai child aktif
            const activeChild = this.childrenData.find(c => c.url === this.$route.path);
            this.title = activeChild ? activeChild.label : (this.childrenData[0]?.label || '');
        },
        findRouteByName(routes, name) {
            for (const route of routes) {
                if (route.name === name) return route;
                const found = this.findRouteByName(route.children || [], name);
                if (found) return found;
            }
            return null;
        },
    },
};
</script>
