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
        if (!matched.length) {
        this.childrenData = [];
        this.title = '';
        return;
        }

        const parentRecord = matched.length > 1 && matched[matched.length - 2]?.path !== ''
        ? matched[matched.length - 2]
        : matched[matched.length - 1];

        const parentRoute = this.findRouteByName(this.$router.options.routes || [], parentRecord?.name);
        if (!parentRoute) {
        this.childrenData = [];
        this.title = '';
        return;
        }

        const parentPath = parentRoute.path.replace(/^\/?/, '');

        // Build daftar tab
        this.childrenData = (parentRoute.children || [])
        .filter(child => {
            const perm = child.meta?.permission;
            // izinkan jika:
            // - permission tidak didefinisikan, atau
            // - string kosong, atau
            // - ada di permission user (string/array)
            if (perm === undefined || perm === '') return true;
            if (typeof perm === 'string') return this.listenPermissions?.core?.includes(perm);
            if (Array.isArray(perm)) return perm.some(p => this.listenPermissions?.core?.includes(p));
            return false;
        })
        .map(child => {
            const childPath = child.path.replace(/^\/?/, '');
            // BUANG segmen parameter opsional, contoh: "trace-bag/:bag_number?"
            const baseChildPath = childPath.replace(/\/:.*\??$/, '');

            const url = `/${parentPath}/${baseChildPath}`.replace(/\/+/g, '/');
            const label = child.meta?.breadCrumb || child.meta?.title || child.name;

            return {
                name: child.name,
                label,
                url,                    // fallback kalau TabMenu masih pakai string
                to: { name: child.name }, // PAKAI INI di <router-link> (tanpa params)
                permission: child.meta?.permission,
                icon: child?.meta?.icon || 'bx bxs-checkbox'
            };
        });

        // Redirect ke child pertama jika sedang di parent persis
        if (this.childrenData.length && this.$route.path.replace(/\/+$/, '') === `/${parentPath}`) {
        this.$router.replace(this.childrenData[0].url);
        }

        // Tandai tab aktif (cocokkan berdasarkan name atau prefix path)
        const activeByName = this.childrenData.find(c => c.name === this.$route.name);
        const activeByPath = this.childrenData.find(c => this.$route.path.startsWith(c.url));
        const activeChild = activeByName || activeByPath;

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
    }
};
</script>
