<template>
    <div class="print-koli">
        <center>
				<div class="wrapper page-break">

					<table border="1" style="width:98mm;height:80mm;margin-bottom: 0.5mm" rules="none">
						<tbody><tr>
							<td colspan="5" style="height:5mm;border-bottom: none;font-size: 9pt">
								<img :src="require('../../assets/img/jneexpressbw.png')" style="height:3mm">
								Nomor Connote : {{boldLast(transaction_code)}}
							</td>
						</tr>
						<tr>
							<td colspan="5" style="height:30mm;border-top: none;padding: 0mm 2mm;">
								<center>
                                    <barcode v-bind:value="transaction_code" :width="2.7" :displayValue="false" :margin="0">
                                        Barcode Broken ({{`NO: ${transaction_code}`}})
                                    </barcode>
									<!-- <input type="hidden" id="koli-number-0" value="0200181400700000200">
									<svg class="barcode-0" width="422px" height="100px" x="0px" y="0px" viewBox="0 0 422 100" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0,0)"><rect x="0" y="0" width="422" height="100" style="fill:#ffffff;"></rect><g transform="translate(0, 0)" style="fill:#000000;"><rect x="0" y="0" width="5.4" height="100"></rect><rect x="8.100000000000001" y="0" width="2.7" height="100"></rect><rect x="16.2" y="0" width="8.100000000000001" height="100"></rect><rect x="29.700000000000003" y="0" width="5.4" height="100"></rect><rect x="40.50000000000001" y="0" width="5.4" height="100"></rect><rect x="51.300000000000004" y="0" width="5.4" height="100"></rect><rect x="59.40000000000001" y="0" width="5.4" height="100"></rect><rect x="67.5" y="0" width="5.4" height="100"></rect><rect x="78.3" y="0" width="5.4" height="100"></rect><rect x="89.1" y="0" width="5.4" height="100"></rect><rect x="99.9" y="0" width="8.100000000000001" height="100"></rect><rect x="113.4" y="0" width="2.7" height="100"></rect><rect x="118.80000000000001" y="0" width="2.7" height="100"></rect><rect x="126.9" y="0" width="5.4" height="100"></rect><rect x="137.70000000000002" y="0" width="8.100000000000001" height="100"></rect><rect x="148.5" y="0" width="5.4" height="100"></rect><rect x="156.6" y="0" width="5.4" height="100"></rect><rect x="167.4" y="0" width="5.4" height="100"></rect><rect x="178.20000000000002" y="0" width="2.7" height="100"></rect><rect x="183.6" y="0" width="5.4" height="100"></rect><rect x="199.8" y="0" width="2.7" height="100"></rect><rect x="207.9" y="0" width="5.4" height="100"></rect><rect x="216" y="0" width="5.4" height="100"></rect><rect x="226.8" y="0" width="5.4" height="100"></rect><rect x="237.60000000000002" y="0" width="5.4" height="100"></rect><rect x="245.70000000000002" y="0" width="5.4" height="100"></rect><rect x="256.50000000000006" y="0" width="5.4" height="100"></rect><rect x="267.30000000000007" y="0" width="5.4" height="100"></rect><rect x="278.1" y="0" width="2.7" height="100"></rect><rect x="286.2" y="0" width="8.100000000000001" height="100"></rect><rect x="297" y="0" width="8.100000000000001" height="100"></rect><rect x="307.8" y="0" width="2.7" height="100"></rect><rect x="313.2" y="0" width="10.8" height="100"></rect><rect x="326.70000000000005" y="0" width="2.7" height="100"></rect><rect x="334.8" y="0" width="8.100000000000001" height="100"></rect><rect x="345.6" y="0" width="5.4" height="100"></rect><rect x="356.40000000000003" y="0" width="2.7" height="100"></rect><rect x="361.8" y="0" width="8.100000000000001" height="100"></rect><rect x="378.00000000000006" y="0" width="5.4" height="100"></rect><rect x="386.1" y="0" width="5.4" height="100"></rect><rect x="399.6" y="0" width="8.100000000000001" height="100"></rect><rect x="410.40000000000003" y="0" width="2.7" height="100"></rect><rect x="415.8" y="0" width="5.4" height="100"></rect></g></svg> -->
								</center>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="height:10mm !important;">
								<div class="scrollable">						
									Pengirim : {{pengirim.nama}}
									<br>{{pengirim.address}}
									<br>Telp {{pengirim.tlp}}
								</div>
							</td>
							<td style="width:13.33mm;text-align: center;font-weight: bold;font-size: 9pt">
								{{service}}
							</td>
							<td style="width:13.33mm;text-align: center;font-weight: bold;font-size: 9pt">
								{{payment_method}}						
							</td>					
						</tr>
						<tr>
							<td colspan="2" style="height:10mm !important;">
								<div class="scrollable">
									Penerima : {{penerima.nama}}
									<br> ALAMAT PENERIMA
									<br> {{penerima.address}}
									<br> Telp {{penerima.tlp}}							
								</div>
							</td>
							<td style="width:7mm;text-align: center;font-weight: bold;font-size: 11pt">
								R
							</td>
							<td style="width:13.33mm; text-align: center;font-weight: bold;font-size: 9pt" colspan="2">
								{{moneyformat(price)}}
							</td>					
						</tr>
						<tr>
							<td style="width: 25mm;vertical-align: top;">
								<div class="scrollable">
									Deskripsi : {{koli.desc}}
								</div>
							</td>
							<td style="width: 43mm;" rowspan="2">
								<div class="scrollable">
									Tanggal : {{date_time}}
									<br> No. Pelanggan : {{no_pelanggan}}
									<br> Kota Asal : JAKARTA BARAT
									<br> Berat : {{koli.chargeble_weight}}
									<br> Jumlah Kiriman : {{koli.jumlah}}
									<br> Jenis Kiriman : Parcel
								</div>
							</td>
							<td rowspan="2" style="width:7mm;text-align: center;font-weight: bold;font-size: 11pt">
							</td>
							<td colspan="2" rowspan="2" style="font-weight: bold;font-size: 12pt">
								<center>
									MES								
                                </center>
								<center>
									MES10018
								</center>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">
								<div class="scrollable">						
									Instruksi Khusus : 
									<br>
                                    {{koli.intruksi_khusus}}
									<!-- Nanti ini dilimit -->
									
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="5" style="height: 6mm; border:solid 0.5mm #FFF;">&nbsp;</td>
						</tr>				
						<tr style="border-top:solid 0.53mm #000;">
							<td colspan="2" class="kolom-barcode-bawah" valign="top">
								<img :src="require('../../assets/img/jneexpressbw.png')" style="width:50px;height: 31px;padding-right: 2px;">
                                <barcode v-bind:value="transaction_code" :width="1.3" :height="20" :displayValue="true" :margin="0" :fontSize="9">
                                        Barcode Broken ({{`NO: ${transaction_code}`}})
                                </barcode>
								<!-- <svg class="barcode-bawah-0" width="203px" height="31px" x="0px" y="0px" viewBox="0 0 203 31" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0,0)"><rect x="0" y="0" width="203" height="31" style="fill:#ffffff;"></rect><g transform="translate(0, 0)" style="fill:#000000;"><rect x="0" y="0" width="2.6" height="20"></rect><rect x="3.9000000000000004" y="0" width="1.3" height="20"></rect><rect x="7.800000000000001" y="0" width="3.9000000000000004" height="20"></rect><rect x="14.300000000000002" y="0" width="2.6" height="20"></rect><rect x="19.5" y="0" width="2.6" height="20"></rect><rect x="24.7" y="0" width="2.6" height="20"></rect><rect x="28.6" y="0" width="2.6" height="20"></rect><rect x="32.5" y="0" width="2.6" height="20"></rect><rect x="37.7" y="0" width="2.6" height="20"></rect><rect x="42.9" y="0" width="2.6" height="20"></rect><rect x="48.1" y="0" width="3.9000000000000004" height="20"></rect><rect x="54.6" y="0" width="1.3" height="20"></rect><rect x="57.2" y="0" width="1.3" height="20"></rect><rect x="61.1" y="0" width="2.6" height="20"></rect><rect x="66.3" y="0" width="3.9000000000000004" height="20"></rect><rect x="71.50000000000001" y="0" width="2.6" height="20"></rect><rect x="75.4" y="0" width="2.6" height="20"></rect><rect x="80.60000000000001" y="0" width="2.6" height="20"></rect><rect x="85.80000000000001" y="0" width="1.3" height="20"></rect><rect x="88.4" y="0" width="2.6" height="20"></rect><rect x="96.2" y="0" width="1.3" height="20"></rect><rect x="100.10000000000001" y="0" width="2.6" height="20"></rect><rect x="104.00000000000001" y="0" width="2.6" height="20"></rect><rect x="109.2" y="0" width="2.6" height="20"></rect><rect x="114.4" y="0" width="2.6" height="20"></rect><rect x="118.30000000000001" y="0" width="2.6" height="20"></rect><rect x="123.50000000000001" y="0" width="2.6" height="20"></rect><rect x="128.70000000000002" y="0" width="2.6" height="20"></rect><rect x="133.9" y="0" width="1.3" height="20"></rect><rect x="137.8" y="0" width="3.9000000000000004" height="20"></rect><rect x="143" y="0" width="3.9000000000000004" height="20"></rect><rect x="148.2" y="0" width="1.3" height="20"></rect><rect x="150.8" y="0" width="5.2" height="20"></rect><rect x="157.29999999999998" y="0" width="1.3" height="20"></rect><rect x="161.2" y="0" width="3.9000000000000004" height="20"></rect><rect x="166.4" y="0" width="2.6" height="20"></rect><rect x="171.6" y="0" width="1.3" height="20"></rect><rect x="174.2" y="0" width="3.9000000000000004" height="20"></rect><rect x="182" y="0" width="2.6" height="20"></rect><rect x="185.9" y="0" width="2.6" height="20"></rect><rect x="192.4" y="0" width="3.9000000000000004" height="20"></rect><rect x="197.6" y="0" width="1.3" height="20"></rect><rect x="200.2" y="0" width="2.6" height="20"></rect><text style="font: 9px monospace" text-anchor="middle" x="101.5" y="31">0200181400700000200</text></g></svg> -->
							</td>
							<td rowspan="3" colspan="3">
								<div class="scrollable">
									Deskripsi : {{koli.desc}}
									<br> Berat : {{koli.chargeble_weight}} Kg
									<br> Jumlah Kiriman : {{koli.jumlah}}
									<br> Biaya Kirim : {{moneyformat(price)}}
									<br> Nilai COD : {{koli.cod}}
									<br> Kota Tujuan : {{kota_tujuan}}
									<br> Packing Kayu : {{koli.packing_kayu == false ? 'Tidak': 'Ya'}}
																
									<br> Kategori : {{koli.kategori}}
									<br> Diantar Maks : {{koli.diantar_tgl}}
								</div>
							</td>					
						</tr>

						<tr>
							<td style="padding-left: 5px">
								<strong>08-01-2021 05:56
								<br>CGK11TMG00
								<br>A_GITA</strong>
								&nbsp;
							</td>
							<td rowspan="2" style="vertical-align: top;text-align: left;">
								Pengirim : 
								<br> SELAMET
								<p>
									Penerima : 
									<br> PENERIMA
								</p>

							</td>
						</tr>
						<tr>
							<td style="font-size: 9pt;font-weight: bold;">
								<center>
									REG
								</center>
							</td>
						</tr>				
					</tbody></table>			
					<div style="text-align: left;">
						Dengan  menyerahkan kiriman, anda setuju syarat &amp; ketentuan yang tertera pada www.jne.co.id
						<br>PT. TIKI JALUR NUGRAHA EKAKURIR. Jl Tomang Raya No 6, NPWP  01.539.710.2-123.000
						<br>*Harga Kirim sudah termasuk Ppn
					</div>
				</div>
		</center>
        {{dat}}
        {{active}}
    </div>
</template>
<script>
import master from "@/mixins/master"
import VueBarcode from 'vue-barcode'
import moment from "moment"
export default {
    name: "print_trasaction_code",
    mixins: [master],
    components: {
        "barcode": VueBarcode
    },
    props: {
        active: Boolean,
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {
                    this.initialize()
                }
            }
        },
    },
    data() {
        return {
            transaction_code: '',
            connote: [],
            dat: {},
            no_pelanggan: '',
            pengirim: {
                nama: '-',
                address: '-',
                tlp: '-'
            },
            penerima: {
                nama: '-',
                address: '-',
                tlp: '-'
            },
            service: '-',
            payment_method: '-',
            price: 0,
            koli: {
                desc: '-',
                berat: 1,
                jumlah: 1,
                cod: 0,
                kode_tujuan: '',
                packing_kayu: false,
                kategori: '',
                diantar_tgl: '',
                chargeble_weight: 0,
                intruksi_khusus: ''
            },
            date_time: '',
            admin: {
                username: '',
                node_code: '',
            },
            kota_asal: '',
            kota_tujuan: ''
        }
    },
    methods: {
        initialize() {
            let data = this.$store.getters.getTransaction.transaction
            this.dat = data
            this.date_time = moment().format("DD-MM-YYYY h:mm")
            if(data['transaction_id'] !== '' && data['transaction_finished'] == true) {
                this.transaction_code = data['transaction_id']
                this.connote = data['connote']
            }
            console.log('PRINT TRANSACTION', this.transaction_code, this.connote)
        },
        boldLast(str){
            let first = str.substring(0, str.length - 2);
            let last = str.substring(str.length - 2, str.length);

            return first + `<b>${last}</b>`
        },
    },
}
</script>
<style lang="scss">
    .print-koli{
        font-size: 11px;
        table{
			/*border: solid 0.5mm #000;*/
			border-collapse: collapse; 
		}

		td{
			border: solid 0.5mm #000;			
			vertical-align: middle;
		}
		.wrapper{
			margin-top:23mm;
			margin-bottom: 2mm;
		}
		.page-break { 
			display: block; 
			page-break-before: always; 
			page-break-after: avoid;
			
		}
		.scrollable{
			height: 100%;
		}

		.kolom-barcode-bawah{
			padding:5px;
			vertical-align:top;height: 40px;
		}
    }
		// body{
		// 	font-size: 6pt !important;
		// 	font-family: Arial, Helvetica, sans-serif;			
		// 	width:99mm;
		// 	height:152.4mm;
		// }
		

		// @media  print { 
		// 	html, body {
		// 		height:100%; 
		// 		margin-left: 2mm;  
		// 		margin-top: 2mm;				
		// 		margin: 0 auto; 
		// 		padding: 0 !important;
		// 		/*overflow: hidden;*/
		// 	}
		// }
	
</style>