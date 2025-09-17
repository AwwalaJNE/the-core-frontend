<template>
    <a :href="jne_core">
        <img 
            :src="require('../../assets/img/jne.jpg')" 
            class="logo" 
            alt="jne"
        >
    </a>
</template>
<script>
import master from "@/mixins/master";

export default {
    name: "logo",
    mixins: [master],
    computed: {
        jne_core() {
            return this.URL.app_jne_main;
        },
    },
};
</script>

