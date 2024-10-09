<template>
    <vs-row>
        <vs-col xs="12" sm="12" lg="12">
            <div class="box" style="text-align: left">
                <vs-row>
                    <vs-col xs="9" sm="9" lg="9">
                        <vs-col xs="12" sm="12" lg="12" class="mb-15">
                            <h2 class="mb-15">Good {{ timeOfDay }}, {{ user_login }} !</h2>
                            <span>{{ role_name }} - {{ node_name }} ( {{ node_code }} )</span>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="12" class="mb-15">
                            <span>See other apps</span>
                        </vs-col>
                        <vs-row>
                            <vs-col 
                                v-for="(button, index) in buttons" 
                                :key="index" 
                                xs="3" sm="3" lg="3"
                            >
                                <vs-button 
                                    active
                                    block
                                    type="submit" 
                                    @click="handleRedirect(button.url)"
                                >
                                    {{ button.label }}
                                </vs-button>
                            </vs-col>
                        </vs-row>
                    </vs-col>
                    
                    <vs-col xs="3" sm="3" lg="3" class="avatar-column">
                        <img src="@/assets/svg/mascot.svg" alt="Mascot JNE" style="width: 100%; height: 100%;"/>
                    </vs-col>
                </vs-row>
            </div>
        </vs-col>
    </vs-row>
</template>
<script>

import master from "@/mixins/master";

export default {
    name: "main-page",
    mixins: [master],
    computed: {
        listenUser() {
            return this.listenActiveUser;
        }
    },
    watch: {
        listenUser(val) {
            if (val) {
                getInfo(val);
            }
        }
    },
    data() {
        return {
            role_name: "",
            node_name: "",
            node_code: "",
            user_login: "",
            buttons: [
                { 
                    label: "Dashboard Core",
                    url: "https://dashboard-core.jne.co.id/dashboard/home#/login"
                },
                { 
                    label: "Helpdesk Core",
                    url: "https://core.jne.co.id/"
                },
                { 
                    label: "JNE Main Page",
                    url: "https://core.jne.co.id/"
                }
            ]
        };
    },
    methods: {
        getInfo(val) {
            this.role_name = val?.role?.user_role_name || "";
            this.node_name = val?.nodes?.[0]?.node_name || "";
            this.node_code = val?.nodes?.[0]?.node_code || "";
            this.user_login = val?.user_login || "";
        },
        handleRedirect(url) {
            const newWindow = window.open(url, '_blank', 'noopener');
      
            if (newWindow) {
                newWindow.onload = function() {
                    newWindow.print();
                    newWindow.onafterprint = () => newWindow.close();
                };
            }
        },
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString();
            this.timeOfDay = this.getTimeOfDay(now.getHours());
        },
        getTimeOfDay(hour) {
            if (hour >= 5 && hour < 12) {
                return "Morning";
            } else if (hour >= 12 && hour < 17) {
                return "Afternoon";
            } else {
                return "Evening";
            }
        }
    },
    mounted() {
        this.updateTime();

        if (this.listenUser) {
            this.getInfo(this.listenUser);
        }
    },
};
</script>