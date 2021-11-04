<template>
    <div class="breadcrumb">
        <template v-for="(item,i) in crumbs">
            <span :key="i">
                {{`${i == 0 ? '': ' / '}`+item.text.replace('-','/')}}
            </span>
        </template>
    </div>
</template>
<script>
export default {
    name:"breadcrumb",
    computed: {
        crumbs(){
            let pathArray = this.$route.path.split("/")
            // console.log('pathArray', pathArray)
            pathArray.shift()
            if(pathArray.length > 2){
              pathArray = pathArray.slice(0, -1);
            }
            // console.log('pathArray l 2', pathArray)
            let route = this.$route.matched.filter(item => item.path !== '')
            let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                  breadcrumbArray.push({
                  path: path,
                  to: breadcrumbArray[idx - 1]
                      ? "/" + breadcrumbArray[idx - 1].path + "/" + path
                      : "/" + path,
                  text: route[idx] ? route[idx].meta.breadCrumb : null || path,
                  });
                  return breadcrumbArray;
              }, [])
              // console.log('breadcrumbs', breadcrumbs, route)
            return breadcrumbs;
        }
    },
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
    }
</style>