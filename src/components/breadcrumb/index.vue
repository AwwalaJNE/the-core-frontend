<template>
    <div class="breadcrumb">
        <template v-for="(item,i) in crumbs">
            <span :key="i" @click="back(item, i)" :class="[item.back && i === 0 ? 'pointer' : '']">
                {{`${i == 0 ? '': ' / '}`+item.text}}
            </span>
        </template>
    </div>
</template>
<script>

import master from "@/mixins/master";

export default {
    name:"breadcrumb",
    mixins: [master],
    computed: {
        crumbs(){
            let pathArray = this.$route.path.split("/")
            pathArray.shift()
            if(pathArray.length > 2){
              pathArray = pathArray.slice(0, -1);
            }
            let route = this.$route.matched.filter(item => item.path !== '')
            let back = route.filter(el => el.meta.hasOwnProperty('backPath'))
            let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                  breadcrumbArray.push({
                  path: path,
                  to: breadcrumbArray[idx - 1]
                      ? "/" + breadcrumbArray[idx - 1].path + "/" + path
                      : "/" + path,
                  text: route[idx] ? route[idx].meta.breadCrumb : null || path,
                  back: back[0]?.meta?.backPath ?? null,
                  resource_type: back[0]?.meta?.resource_type ?? null,
                  resource_code: back[0]?.meta?.resource_code ?? null,
                  resource_name: back[0]?.meta?.resource_name ?? null
                  });
                  return breadcrumbArray;
              }, [])
            return breadcrumbs;
        }
    },
    methods: {
        back(breadcrumb, i){
            if (i === 0 && breadcrumb.back !== null) {
                this.$router.push(breadcrumb.back);
                this.setRoutePageHistory(breadcrumb, false);
            } 
        }
    }
}
</script>
<style lang="scss">
    .breadcrumb{
        span{
            text-transform: capitalize;
            &:first-of-type{
                color: $jneBlue;
            }
        }
        .pointer {
            cursor: pointer;
        }
        .pointer:hover {
            text-decoration: underline;
        }
    }
</style>