<template>
    <div>
        <vs-row>
            <vs-col xs="12" sm="12" lg="12" align="left" style="display: flex; align-items: center;">
                <i class="bx bx-paper-plane" style="font-size: 24px;"></i>
                <span><b>{{ listenConnoteNumber }}</b></span>
            </vs-col>
        </vs-row>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <div class="box view mb-15">
                    <vs-row xs="12" sm="12" lg="12" justify="space-between">
                        <vs-col 
                            xs="12" sm="2" lg="2"
                            v-for="(info, index) in masterInfo" 
                            :key="index" 
                            class="info-row"
                        >
                            <vs-row>
                                <h4>{{ info.label }}</h4>
                            </vs-row>
                            <vs-row>
                                <p>{{ activity_master_info[info.value] || '-' }}</p>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col xs="12" sm="12" lg="12" align="left" style="display: flex; align-items: center;">
                <i class="bx bx-history" style="font-size: 24px;"></i>
                <span><b>History Status</b></span>
            </vs-col>
        </vs-row>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <div class="box view mb-15">
                    <div  
                        class="timeline" 
                        v-for="(info, index) in activity_detail_info" 
                        :key="index"
                    >
                        <div class="timeline-item">
                            <i class="timeline-icon"></i>
                            <div class="timeline-content">
                                <p>{{ info.description || '-' }}</p>
                                <span>{{ info.created_at || '-' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

export default {
    name:"connote-customer-view",
    mixins: [master],
    props: {
        connoteNumber: String,
        koliNumber: String
    },
    computed: {
        listenConnoteNumber() {
            return this.connoteNumber;
        },
        listenKoliNumber() {
            return this.koliNumber;
        }
    },
    data() {
        return {
            connote_number: this.listenConnoteNumber,
            activity_master_info: {},
            activity_detail_info: [],
            masterInfo: [
                { 
                    label: 'Shipment Service', 
                    value: 'service' 
                },
                { 
                    label: 'From', 
                    value: 'from' 
                },
                { 
                    label: 'To', 
                    value: 'to' 
                },
                { 
                    label: 'Estimate Delivery', 
                    value: 'sla' 
                },
                { 
                    label: 'Pod Date', 
                    value: 'pod_date' 
                },
                { 
                    label: 'Receiver Name', 
                    value: 'receiver_name' 
                }
            ]
        }
    },
    methods: {
        async getMasterData() {
            try {
                const res = await axios.get(`${this.URL.connote}/${this.listenConnoteNumber}/activity-customer?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data) {
                    this.activity_master_info = {
                        ...res.data,
                        from: [res?.data?.district_origin ?? "", res?.data?.city_origin ?? ""].filter(Boolean).join(", "),
                        to: [res?.data?.district_destination ?? "", res?.data?.city_destination ?? ""].filter(Boolean).join(", "),
                        sla: res.data.sla_days ? res.data.sla_days + ' days' : '-'
                    }
                }
                
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            }
        },
        async getDetailData() {
            try {
                const res = await axios.get(`${this.URL.connote}/${this.listenKoliNumber}/activity-customer/detail?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data.length > 0) {
                    this.activity_detail_info = res.data.data
                }
                
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            }
        },
    },
    mounted() {
        this.getMasterData();
        this.getDetailData();
    },
}
</script>
<style scoped>
.info-row {
    border-right: 0.1em solid #eaeaea;
    padding: 0 1em;
}

.timeline {
    border-bottom: 0.1em solid #eaeaea;
}

.timeline-item {
  display: flex;
  align-items: center;
  padding: 1em 0px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #ddd;
}

.timeline-icon {
  width: 20px;
  height: 20px;
  background-color: white;
  border: 2px solid #ddd;
  border-radius: 50%;
  z-index: 1;
  position: relative;
}

.timeline-content {
  margin-left: 2em;
  text-align: left;
}

.timeline-content p {
  margin: 0;
  font-size: 14px;
}

.timeline-content span {
  font-size: 12px;
  color: gray;
}

</style>