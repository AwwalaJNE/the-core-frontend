<template>
    <a :href="jne_core">
        <img :src="jneLogo" class="logo" alt="jne" />
    </a>
</template>

<script>
import master from '@/mixins/master'
import jneLogo from '@/assets/img/jne.jpg'

export default {
    name: 'logo',
    mixins: [master],
    computed: {
        jne_core() {
            return this.URL.app_jne_core
        },
    },
    data() {
        return {
            jneLogo,
        }
    },
}
</script>
