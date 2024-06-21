<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">
        <template v-slot:content>
            <div>
            <vs-row>
                <vs-col xs="12" sm="12" lg="12" class="mb-15" align="right">
                    <!-- <search-input class="cus-search" ref="searchInput" @searchValue="searchValue"/> -->
                    <div class="searchGeneral">
                        <vs-input icon-after v-model="tempSearch" autocomplete="chrome-off" placeholder="Search" @change="searchValue">
                            <template #icon>
                                <i class='bx bx-search' @click="clear"></i>
                            </template>
                        </vs-input>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="12" lg="12" class="mb-15">
                    <div v-if="itemSearch.length > 0">
                        <template v-for="item in itemSearch">
                            <div class="itemSearch" @click="detail(item)">
                                <i class='bx bx-detail'></i> {{ item.koli_number }}
                            </div>
                        </template>
                    </div>
                    <div v-else class="itemNotFound">
                        Data tidak ada
                    </div>
                    <!-- <transition name="slide-fade"> -->
                        <!-- <connote-list :query="tempSearch"/> -->
                    <!-- </transition> -->
                </vs-col>
            </vs-row>
            </div>
        </template>

    </dialog-master>


</template>

<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"
import SearchInput from "@/components/search/searchInput"
// Connote
import ConnoteList from "@/views/inventory/connote/item/connoteList"

export default {
    name:"dialog-create-edit-node",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "search-input": SearchInput,
        "connote-list": ConnoteList,
    },
    props: {
       closeDialog: Function,
       query: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String,
       withSchedule: Boolean,
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.querySearch(this.tempSearch)
                }
            }
        },
    },
    data() {
        return {
            form: {},
            node_id: '',
            dialogGetCustomer:false,
            tempSearch: "",
            pickup_number:'',
            hasClicked: false,
            itemSearch: [],
            itemNum: 0
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenDataSchedule() {
            return this.$store.getters.getInputs.pickup_list.pickup_schedule || []
        },
        listenwithSchedule() {
            return this.withSchedule || false
        }
    },
    methods: {
        searchValue(){
            this.$emit("searchValue",this.tempSearch)

            this.querySearch(this.tempSearch)
        },
        clear() {
            this.tempSearch = ""
            this.$emit("searchValue",this.tempSearch)
            this.itemSearch = []
            this.itemNum = 0
        },
        async querySearch(query){
            const loading = this.$vs.loading({
                type:'scale',
                text: 'Loading...',
                background: '#EAEAEA',
            })
            let limit = 20;
            let page = "1";
            let isOnBag = "";
            let isInventory = "";
            await axios.get(this.URL.koli +
                    `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&is_confirmed=${isInventory}&is_on_bag=${isOnBag}&page=${page}&s=${query}`,
                    this.Helper.header())
            .then(res => {
                let arr = res.data.data
                arr.map(item => {
                    item["is_confirmed"] = item.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed'
                    item["packing_kayu_type"] = item.packing_kayu_type != null ? 'PK-'+item.packing_kayu_type : '-'                        
                })
                this.itemSearch = arr
                this.itemNum = arr.length
                loading.close()

            })
            .catch(error => {
                loading.close()

            });
        },
        detail(row){
          this.$router.push(`/connote-detail/${row.koli_number}`);
          this.cancel()
        },
        cancel() {
            this.closeDialog()
            this.clear()
        }
    },
    mounted() {
        // this.getDataNodeDestination()
    },
}
</script>
<style lang="scss">
    .searchGeneral{
        .vs-input-content{
            position: relative;
            width: 100%;
            display: flex;
            align-self: flex-end;
        }
        .clear{
            position: absolute;
            right: 35px;
            width: 35px;
            top: 0;
            height: 100%;
        }
    }
    .itemNotFound{
        width: 100%;
        padding: 15px 0;
        font-size: 0.9rem;
    }
    .itemSearch{
        width: 100%;
        text-align: left;
        padding: 15px 0;
        font-size: 0.9rem;
    }
    .itemSearch:hover{
        cursor: pointer;
        background: #355cff0f;
    }
    .itemSearch i {
        padding: 0 10px;
    }
</style>