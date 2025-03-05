<template>
    <div>
      <vs-row>
        <!-- Bagian Kiri (Card Claim) -->
        <vs-col xs="12" sm="6" lg="6">
            <div class="custom-card">
              <h4 align="left">Claim</h4>
              <h5 align="left">Status</h5>
              <p align="left">CLOSED</p>
              
              <h5 align="left">Proposed Claim</h5>
              <p align="left">Rp 12.000</p>
              <h5 align="left">Claim Date</h5>
              <p align="left">2025-02-24  17:12:20</p>
             
            </div>
        </vs-col>
  
        <!-- Bagian Kanan (Card Burden) -->
        <vs-col xs="12" sm="6" lg="6">
            <div class="custom-card">
              <h4 align="left">Burden</h4>
              <h2></h2>
            </div>
        </vs-col>
  
      </vs-row>
    </div>
  </template>
  
  
  <script>
  import axios from "axios";
  
  export default {
    name: "claim-and-burden",
    props: {
      connoteNumber: String
    },
    computed: {
      listenConnoteNumber() {
        return this.connoteNumber;
      }
    },
    data() {
      return {
        claimBurden: {
          status: "CLOSEDDDD",
          reason: "HILANG",
          proposed_claim: 120000,
          approved_claim: 100000,
          created_at: "2024-04-30 11:15:01",
          updated_at: "2024-04-30 11:15:01"
        },
        burdenList: [
          { pic: "RUDY TABOOTIE", percentage: "20", value: 20000 },
          { pic: "RUDY TABOOTIE", percentage: "80", value: 80000 },
          { pic: "RUDY TABOOTIE", percentage: "0", value: 0 }
        ]
      };
    },
    methods: {
      async fetchClaimAndBurden() {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/claim-and-burden/${this.listenConnoteNumber}`,
            this.Helper.header()
          );
  
          console.log(response.data);
          const data = response.data.data;
  
          this.claimBurden = data;
  
          this.burdenList = [
            {
              pic: data.burdened_pic_1,
              percentage: data.burden_percentage_1,
              value: this.calculateBurdenValue(data.approved_claim, data.burden_percentage_1)
            },
            {
              pic: data.burdened_pic_2,
              percentage: data.burden_percentage_2,
              value: this.calculateBurdenValue(data.approved_claim, data.burden_percentage_2)
            },
            {
              pic: data.burdened_pic_3,
              percentage: data.burden_percentage_3,
              value: this.calculateBurdenValue(data.approved_claim, data.burden_percentage_3)
            }
          ];
        } catch (error) {
          console.error("Error fetching claim and burden data:", error);
          // Jika error, dummy data tetap dipakai
        }
      },
      calculateBurdenValue(approvedClaim, percentage) {
        if (!approvedClaim || !percentage) return 0;
        return (parseFloat(approvedClaim) * parseFloat(percentage)) / 100;
      },
      formatCurrency(value) {
        if (!value) return '-';
        return 'Rp' + Number(value).toLocaleString('id-ID');
      }
    },
    mounted() {
      this.fetchClaimAndBurden();
    }
  };
  </script>
  
  <style scoped>
  .custom-card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 20px;
  }
  p {
    margin: 8px 0;
    font-size: 12px;
  }
  </style>
  
  