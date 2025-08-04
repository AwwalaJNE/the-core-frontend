<template>
    <div class="box view">
        <h3 class="title">{{ title }}</h3>
        <vs-row>
            <vs-col 
                v-for="(item, index) in dataLabel" 
                :w="item.width || 12"
                :key="index"
            >
                <p class="label">{{ item.label }}</p>
                <p class="value">{{ dataItem[item.key] || '-' }}</p>
            </vs-col>
        </vs-row>
    </div>
</template>
  
<script>

import master from "@/mixins/master";

export default {
    name: "card-info",
    mixins: [master],
    props: {
        dataLabel: Array,
        dataItem: Object,
        title: String
    }
};
</script>

<style scoped>
.title {
    margin-bottom: 15px;
    text-transform: capitalize;
    font-size: 0.8em;
    font-weight: bold;
    color: #333;
    text-align: left;
}

.label {
  font-size: 0.75rem;
  color: #7f8c8d;
  margin-bottom: 0.2rem;
  text-align: left;
}

.value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3436;
  text-align: left;
}
</style>
