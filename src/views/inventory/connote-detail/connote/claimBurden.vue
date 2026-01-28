<template>
    <div>
        <template v-if="claimBurden.status != null">
            <vs-row>
                <!-- Card Claim -->
                <vs-col xs="12" sm="6" lg="6">
                    <div class="custom-card" v-if="!loading">
                        <h4 align="left">Claim</h4>
                        <vs-row>
                            <!-- Kolom Kiri -->
                            <vs-col xs="12" sm="6" lg="6">
                                <h5>Status</h5>
                                <p>{{ claimBurden.status }}</p>

                                <h5>Proposed Claim</h5>
                                <p>{{ formatCurrency(claimBurden.proposed_claim) }}</p>

                                <h5>Claim Date</h5>
                                <p>{{ claimBurden.created_at }}</p>
                            </vs-col>

                            <!-- Kolom Kanan -->
                            <vs-col xs="12" sm="6" lg="6">
                                <h5>Reason</h5>
                                <p>{{ claimBurden.reason }}</p>

                                <h5>Approved Claim</h5>
                                <p>{{ formatCurrency(claimBurden.approved_claim) }}</p>

                                <h5>Charge Date</h5>
                                <p>{{ claimBurden.created_at }}</p>
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-col>
                <!-- Card Burden -->
                <vs-col xs="12" sm="6" lg="6">
                    <div class="custom-card" v-if="!loading">
                        <h4 align="left">Charge</h4>
                        <template v-if="claimBurden.burdened_pic_1 != null">
                            <vs-row>
                                <!-- Kolom 1 -->
                                <vs-col xs="12" sm="4" lg="4">
                                    <h5>PIC 1</h5>
                                    <p>{{ claimBurden.burdened_pic_1 }}</p>

                                    <h5>PIC 2</h5>
                                    <p>{{ claimBurden.burdened_pic_2 }}</p>

                                    <h5>PIC 3</h5>
                                    <p>{{ claimBurden.burdened_pic_3 }}</p>
                                </vs-col>

                                <!-- Kolom 2 -->
                                <vs-col xs="12" sm="4" lg="4">
                                    <h5>Charge Percentage 1</h5>
                                    <p>{{ claimBurden.burden_percentage_1 }}</p>

                                    <h5>Charge Percentage 2</h5>
                                    <p>{{ claimBurden.burden_percentage_2 }}</p>

                                    <h5>Charge Percentage 3</h5>
                                    <p>{{ claimBurden.burden_percentage_3 }}</p>
                                </vs-col>

                                <!-- Kolom 3 -->
                                <vs-col xs="12" sm="4" lg="4">
                                    <h5>Charge Value 1</h5>
                                    <p>{{ formatCurrency(claimBurden.burden_value_1) }}</p>

                                    <h5>Charge Value 2</h5>
                                    <p>{{ formatCurrency(claimBurden.burden_value_2) }}</p>

                                    <h5>Charge Value 3</h5>
                                    <p>{{ formatCurrency(claimBurden.burden_value_3) }}</p>
                                </vs-col>
                            </vs-row>
                        </template>
                        <template v-else>
                            <div
                                style="
                                    height: 170px;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    text-align: center;
                                "
                            >
                                <span style="color: #6b7280; font-size: 14px"
                                    >No records found</span
                                >
                            </div>
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </template>
        <template v-else>
            <vs-col xs="12" sm="12" lg="12">
                <div
                    v-if="!loading"
                    class="custom-card"
                    style="
                        height: 200px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    "
                >
                    <img
                        :src="notFoundPlaceholder"
                        alt="No records"
                        style="height: 80px; margin-bottom: 12px"
                    />
                    <span style="color: #6b7280; font-size: 14px">No records found</span>
                </div>
            </vs-col>
        </template>
    </div>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'
import notFoundPlaceholder from '@/assets/img/not-found.png'

export default {
    name: 'claim-and-burden',
    mixins: [master],
    props: {
        connoteNumber: String,
    },
    data() {
        return {
            notFoundPlaceholder,
            loading: false,
            claimBurden: {},
        }
    },
    computed: {
        listenConnoteNumber() {
            return this.connoteNumber
        },
    },
    methods: {
        async getClaimAndBurdenData() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.claim_and_burden}/${this.listenConnoteNumber}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                this.claimBurden = res.data.data
            } catch (error) {
            } finally {
                this.loading = false
            }
        },
        formatCurrency(value) {
            if (!value) return 'Rp. 0'
            return 'Rp. ' + Number(value).toLocaleString('id-ID')
        },
    },
    mounted() {
        this.getClaimAndBurdenData()
    },
}
</script>

<style scoped>
.custom-card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-bottom: 20px;
}

h4,
h5,
p {
    text-align: left;
}

h4 {
    margin-bottom: 20px;
    font-weight: bold;
}

h5 {
    margin: 10px 0 5px;
    font-size: 12px;
    font-weight: bold;
    color: #555;
}

p {
    margin: 0 0 15px;
    font-size: 13px;
}
</style>
