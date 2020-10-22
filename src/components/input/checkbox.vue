<template>
    <div class="center">
      <vs-checkbox v-model="option1" @change="changed" />
    </div>
</template>
<script>
export default {
    name:"checkbox",
    props: {
        isChecked: Boolean
    },
    data() {
        return {
            option1: this.isChecked
        }
    },
    methods: {
        changed() {
            this.$emit("changed", this.option1)
        }
    },
}
</script>