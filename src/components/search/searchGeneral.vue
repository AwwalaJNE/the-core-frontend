<template>
    <dialog-master 
        width="md"
        :actived="listenActive" 
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>
        <template v-slot:content>
            <vs-input
                v-model="searchQuery"
                icon-after
                placeholder="Search Feature"
                class="search-input"
                @input="onSearch"
                autofocus
            >
                <template #icon>
                    <i class='bx bx-search'></i>
                </template>    
            </vs-input>

            <div
                v-if="searchQuery.length"
                class="search-dropdown"
            >
                <div v-if="filteredItems.length">
                    <div
                        v-for="(item, index) in filteredItems"
                        :key="index"
                        @click="selectItem(item)"
                        class="dropdown-item"
                    >
                        <div class="dropdown-text">
                            <span v-html="highlightMatch(item.label)" />
                            <small v-html="highlightMatch(item.description)" />
                        </div>
                    </div>
                </div>
                <div v-else class="dropdown-item no-data">
                    No Data Found
                </div>
            </div>
        </template>
    </dialog-master>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"

export default {
    name:"search-general",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
    },
    data() {
        return {
            itemSearch: [],
            searchQuery: "",
            items: [],
            filteredItems: [],
            loading: false
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getFindFeature() 
            }
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenLoading(){
          return this.loading
        },
        listenUserId() {
            return this.$ls.get('user')['user_id'];
        }
    },
    methods: {
        onSearch() {
            const query = this.searchQuery.toLowerCase();
            this.filteredItems = this.items.filter(item =>
                item.label.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        },
        selectItem(item) {
            this.filteredItems = [];
            this.cancel();
            this.$router.push(`${item.url}`);
        },
        highlightMatch(text) {
            const query = this.searchQuery;
            if (!query) return text;
            const regex = new RegExp(`(${query})`, "gi");
            return text.replace(regex, "<b>$1</b>");
        },
        async getFindFeature(){
            this.loading = true
            await axios
                .get(this.URL.find_feature + `/${this.listenUserId}?n=${this.listenNodeId}`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.feature_name;
                            obj["description"] = item.description;
                            obj["url"] = item.url;

                            arr.push(obj)
                        })
                        this.items = arr
                    } else {
                        this.openNotification('warn', null, 'Feature list is empty!', ' Please create a new feature')
                    }
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate feature list', err.response ? err.response.data.message : "something went wrong")
                })
            this.loading = false
        },
        handleClear() {
            this.searchQuery = "";
            this.items = [];
            this.filteredItems = [];
        },
        cancel() {
            this.handleClear()
            this.closeDialog()
        }
    }
}
</script>
<style scoped>
.search-input {
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-dropdown {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    overflow: hidden;
    max-height: 250px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
}

.search-dropdown::-webkit-scrollbar {
    width: 6px;
    height: 0;
}

.search-dropdown::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
}

.search-dropdown::-webkit-scrollbar-track {
    background-color: transparent;
}

.dropdown-text {
    text-align: left;
}

.dropdown-item {
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}

.dropdown-text small {
    display: block;
    color: #888;
    font-size: 12px;
    margin-top: 2px;
}
</style>