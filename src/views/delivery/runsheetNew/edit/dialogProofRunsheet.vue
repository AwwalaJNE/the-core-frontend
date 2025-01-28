<template>
    <dialog-master 
        width="md"
        :actived="active" 
        :closeDialog="closeDialog"
    >
        <template v-slot:header>
            {{ title }}
        </template>

        <template v-slot:content>
            <div class="image-container">
                <img 
                    v-if="dataItem.pod_image" 
                    alt="Proof Image"
                    class="image-preview" 
                    :src="dataItem.pod_image" 
                >
                <div v-else class="no-image-placeholder">
                    No proof image available
                </div>
            </div>
        </template>
    </dialog-master>
</template>

<script>
import DialogMaster from "@/components/dialog/dialogMaster";

export default {
    name:"dialog-proof-runsheet",
    components: {
        "dialog-master": DialogMaster
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Object,
        title: String
    }
};
</script>

<style scoped>
.image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image-preview {
    object-fit: contain;
}
</style>