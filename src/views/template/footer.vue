<template>
    <footer class="footer">
        <vs-row justify="space-between" style="padding: 0 2em;">
            <p>Core JNE</p>
            <p>&copy; 2024 JNE. All rights reserved</p>
            <p>v.{{ version }}</p>
        </vs-row>
    </footer>
</template>
<script>

export default {
    name:"footer",
    data() {
        return {
            version: process.env.VUE_APP_VERSION
        }
    },
}
</script>
<style lang="scss">
.footer{
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    padding: .5em 0;
    background-color: $bgWhite;
    position: sticky;
}
</style>