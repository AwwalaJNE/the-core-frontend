<template>
    <div class="custom">
        <div class="row">
            <div class="col">
                <vs-row justify="flex-end">
                    <vs-col w="6">
                        <p>Rows per page: </p>
                    </vs-col>
                    <vs-col w="4">
                        <vs-select placeholder="Limit" v-model="limit_page" @change="actionLimit">
                            <vs-option v-for="(item,key) in limitSelector" :key="key" :label="item" :value="item">
                                {{item}}
                            </vs-option>
                        </vs-select>
                    </vs-col>
                </vs-row>
            </div>
            <div class="col">
                <vs-pagination 
                v-model="current_page" 
                :dotted-number="listenPageLimit"
                :length="listenPageSize" 
                @input="actionPagination" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"pagination-component",
    props: {
        page: [Number,String],
        limit: [Number,String],
        pageSize: [Number,String]
    },
    data() {
        return {
            current_page: this.page ? this.page : 1,
            page_size:1,
            limit_page:5,
            limitSelector: [5,10,20],
            value:''
        }
    },
    computed: {
        listenPageSize() {
            return this.pageSize
        },
        listenPageLimit() {
            return this.limit
        },
        // listenPage() {
        //     return this.page <= this.pageSize ? this.page : this.pageSize
        // },
    },
    methods: {
        actionLimit(val) {
            this.$emit("actionLimit", val)
        },
        actionPagination(val) {
            this.$emit("actionPagination", val)
        }
    },
}
</script>
<style lang="scss">
    .custom{
        position: relative;
        .row{
            position: relative;
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
            .col{
                position: relative;
                width: auto;
                padding: 0 5px;
            }
        }
        p{
            text-align: right;
            font-size: .8em;
            margin: .5em 0;
        }
    }
</style>