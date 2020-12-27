<template>
    <div class="container mt-2 print">
        <table style="border: 1px solid black; width: 100%; text-align: center;">
            <tbody>
                <tr style="border: 1px solid black;">
                    <th rowspan="2" colspan="2" style="border: 1px solid black;">
                        <div style="text-align: center;"><img src="data:image/png;base64,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" alt="Logo"></div>
                    </th>
                    <th colspan="6" style="border: 1px solid black; text-align: center;">
                        <h2>BUKTI PEMERIKSAAN ISI KIRIMAN PT TIKI JALUR NUGRAHA EKAKURIR</h2>
                    </th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black;">ORIGIN</th>
                    <th style="border: 1px solid black;">PENGIRIM</th>
                    <th colspan="2" style="border: 1px solid black;">PETUGAS PEMERIKSA</th>
                    <th colspan="2" style="border: 1px solid black;">PETUGAS COUNTER</th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; background-color: grey;">No Connote</th>
                    <th style="border: 1px solid black;">-</th>
                    <th rowspan="2" style="border: 1px solid black;">CGK10000</th>
                    <th rowspan="5" style="border: 1px solid black;">TTD &amp; NAMA JELAS</th>
                    <th rowspan="5" colspan="2" style="border: 1px solid black;">TTD &amp; NAMA JELAS</th>
                    <th rowspan="5" colspan="2" style="border: 1px solid black;">TTD &amp; NAMA JELAS</th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; background-color: grey;">Tanggal</th>
                    <th style="border: 1px solid black;"><time datetime="1607587242000">10 Des 2020/15:00</time></th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; background-color: grey;">Counter</th>
                    <th style="border: 1px solid black;">JAKARTA, TOMANG 45</th>
                    <th style="border: 1px solid black; background-color: grey;">DESTINATION</th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; background-color: grey;">Pengirim</th>
                    <th style="border: 1px solid black;"></th>
                    <th rowspan="2" style="border: 1px solid black;"></th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; background-color: grey;">Penerima</th>
                    <th style="border: 1px solid black;"></th>
                </tr>
                <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; background-color: grey;">No</th>
                    <th style="border: 1px solid black; background-color: grey;">NAMA KIRIMAN</th>
                    <th style="border: 1px solid black; background-color: grey;">JENIS KIRIMAN</th>
                    <th style="border: 1px solid black; background-color: grey;">NOMOR SERI/IMEI(*/**)</th>
                    <th style="border: 1px solid black; background-color: grey;">JUMLAH</th>
                    <th style="border: 1px solid black; background-color: grey;">WARNA</th>
                    <th style="border: 1px solid black; background-color: grey;">KONDISI(***)</th>
                    <th style="border: 1px solid black; background-color: grey;">KELENGKAPAN</th>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">1</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;">0</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">2</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">3</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">4</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">5</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">6</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">7</td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                    <td style="border: 1px solid black;"></td>
                </tr>
            </tbody>
        </table>
        <br>
        <div>
            <vs-row justify="">
                <vs-col w="6" justify="flex-end">
                    <table style="width: 100%; text-align: left;">
                        <tbody>
                        <tr>
                            <th style="width: 150px;">ASURANSI ****</th>
                            <th style="width: 120px;"><input type="checkbox" readonly="readonly" @click.prevent='0'> YA</th>
                            <th style="width: 120px;"><input type="checkbox" :checked="true" readonly="readonly" @click.prevent='0'> TIDAK</th>
                        </tr>
                        <tr>
                            <th style="width: 150px;">VOLUME</th>
                            <th style="width: 120px;"><input type="checkbox" readonly="readonly" @click.prevent='0'> YA</th>
                            <th style="width: 120px;"><input type="checkbox" :checked="true" readonly="readonly" @click.prevent='0'> TIDAK</th>
                        </tr>
                        <tr>
                            <th style="width: 120px;">PACKING KAYU ****</th>
                            <th style="width: 120px;"><input type="checkbox" readonly="readonly" @click.prevent='0'> YA</th>
                            <th style="width: 120px;"><input type="checkbox" readonly="readonly" @click.prevent='0'> TIDAK</th>
                        </tr>
                        <tr>
                            <th colspan="1">
                                <h6>* Berlaku untuk kiriman Voucher dan Kategori HVS lainnya</h6>
                            </th>
                            <th colspan="2" style="width: 150px;">
                                <h6>***Kondisi Baru, second/bekas, service/rusak</h6>
                            </th>
                        </tr>
                        <tr>
                            <th colspan="1">
                                <h6>** Berlaku untuk kiriman Handphone/Gadget</h6>
                            </th>
                            <th colspan="2" style="width: 150px;">
                                <h6>****Kondisi Baru, second/bekas, service/rusak</h6>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </vs-col>
                <vs-col w="4" justify="flex-end">
                    <table style="width: 100%; text-align: left;">
                        <tbody>
                        <tr>
                            <th style="width: 150px;">NILAI BARANG</th>
                            <th style="width: 100px;">Rp.</th>
                            <th colspan="2" style="width: 100px;">0.00</th>
                        </tr>
                        <tr>
                            <th style="width: 100px;">UKURAN</th>
                            <th style="width: 100px;">P:&nbsp;&nbsp;&nbsp;&nbsp; <span>0&nbsp;&nbsp;cm</span></th>
                            <th style="width: 100px;">L:&nbsp;&nbsp;&nbsp;&nbsp; <span>0&nbsp;&nbsp;cm</span></th>
                            <th style="width: 100px;">T:&nbsp;&nbsp;&nbsp;&nbsp; <span>0&nbsp;&nbsp;cm</span></th>
                        </tr>
                        </tbody>
                    </table>
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>
<script>
export default {
    name: "print-BPIK",
    props: {
        typePrint: String
    },
    computed: {
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    data() {
        return {
            dataConnote : {},
            pengirim: '',
            penerima: '',
            date: '',
            no_connote: '',
            bpik: [],
            koli: [],
            asuransi: false,
            volume: false,
            packing_kayu: false,
            nilai_barang: 0
        }
    },
    methods: {
        initialize() {
            this.dataConnote = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive] || {}
            console.log('data connote', this.dataConnote)
        },
    },
    created() {
        this.initialize()
    },
}
</script>
<style lang="scss">
    .print{
        h6{
            margin: 0;
        }
    }
</style>