<template>
    <div class="container print sppap">
        <div class="jss4" style="padding-bottom:3em;">
            <div class="jss5" style="text-align: left;"><img src="data:image/png;base64,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" alt="Logo" class="jss6"></div>
                <div class="jss7">
                    <hr style="display: block;">
                    <hr style="display: block;">
                    <h2 style="text-align: center; color: blue;">SURAT PERNYATAAN PENOLAKAN ASURANSI DAN/ATAU PACKING KAYU &nbsp;&nbsp;( SPPAP )</h2>
                    <hr style="display: block;">
                    <hr style="display: block;">
                    <div style="display: inline;">
                        <ul class="jss8 jss9 jss1 check">
                            <li class="jss12 jss15 jss19" style="padding-bottom: 0px; padding-top: 0px;">
                            <label class="jss22" style="padding-bottom: 0px; padding-top: 0px;">
                                <input type="checkbox" class="cb" :checked="packing_kayu" readonly="readonly" @click.prevent='0'>
                                <span class="jss58 jss67 jss24">Tidak Packing Kayu</span>
                            </label>
                            </li>
                            <li class="jss12 jss15 jss19" style="padding-bottom: 0px; padding-top: 0px;">
                            <label class="jss22" style="padding-bottom: 0px; padding-top: 0px;">
                                <input type="checkbox" class="cb" :checked="asuransi" readonly="readonly" @click.prevent='0'>
                                <span class="jss58 jss67 jss24">Tidak Asuransi</span>
                            </label>
                            </li>
                        </ul>
                    </div>
                    <ol>
                        <li>
                            <p>Berdasarkan ketentuan dalam Syarat Standar Pengiriman (SSP) JNE poin 8.1. yang menyatakan bahwa barang atau dokumen yang memiliki harga/nilai di atas 10 [sepuluh] kali biaya kirim disarankan untuk diasuransikan oleh Pengirim. dan ketentuan dalam SSP JNE poin 3.3. bahwa Pengemasan suatu Kiriman yang sesuai dengan standar keamanan yang berlaku merupakan tanggung jawab Pengirim.</p>
                        </li>
                        <li>
                            <p>Saya yang bertandatangan di bawah ini menyatakan tidak bersedia atau menolak untuk mengasuransikan dan/atau menggunakan packing kayu pada barang atau dokumen yang saya kirimkan, yaitu: <br>Nomor Connote : <br>Isi Kiriman   : <br>Nilai Kiriman : <br></p>
                        </li>
                        <li>
                            <p>Dan oleh karena itu apabila terjadi kerusakan/cacat dan/atau kehilangan terhadap paket/dokumen kiriman selama dalam prosses pengiriman, maka saya menyatakan bersedia menanggung segala resiko dan membebaskan JNE dari segala tuntutan/penggantian/kewajiban  pembayaran ganti rugi atas nilai paket/dokumen kiriman dan/atau nilai komersil lainnya dari paket/dokumen kiriman tersebut serta bersedia untuk tunduk dan  mengikuti segala ketentuan yang ditetapkan oleh JNE. <br><br>Dengan ditandatanganinya Surat Pernyataan Penolakan Asuransi dan/atau Packing Kayu ini, saya menyatakan telah menerima, menyetujui, mengetahui, dan memahami seluruh isi ketentuan dan pernyatan di atas.</p>
                        </li>
                    </ol>
                    <table style="border: 1px solid black; height: 300px; width: 100%; text-align: center;">
                        <tr>
                            <th style="border: 1px solid black;">Nama Petugas JNE</th>
                            <th style="border: 1px solid black;">Nama Pengirim</th>
                        </tr>
                        <tr>
                            <th rowspan="3" style="border: 1px solid black; height: 150px; margin-top: 10px; margin-bottom: 10px;">(Tanda tangan &amp; Nama jelas)</th>
                            <th rowspan="3" style="border: 1px solid black; height: 150px; margin-top: 10px; margin-bottom: 10px;">(Tanda tangan &amp; Nama jelas)</th>
                        </tr>
                        <tfoot>
                            <tr>
                            <td style="border: 1px solid black;">Sales Counter:</td>
                            <td style="border: 1px solid black;"> Tanggal:</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
        </div>
    </div>
</template>
<script>
import moment from "moment"
export default {
    name: "print-SPPAP",
    props: {
        typePrint: String
    },
    data() {
        return {
            dataPrint: [],
            packing_kayu: false,
            asuransi: false,
            date: ''
        }
    },
    methods: {
        initialize() {
            let printSPPAP = this.$ls.get('printSPPAP')
            let date = new Date()
            this.date = moment(date).format("DD MMM YYYY/h:mm")
            this.asuransi = printSPPAP['tidak_asuransi'] || false
            this.packing_kayu = printSPPAP['tidak_packing_kayu'] || false
        }
    },
    created() {
        this.initialize()
    },
}
</script>
<style lang="scss"> 
.sppap{
    background: #f1f4f5!important;
    min-height: 100vh;
    label,p,span{
        text-align: left;
        font-size: 14px;
    } 
    ul{
        li{
            text-align: left;
        }
        &.check{
            li{
                margin-top: .8em;
            }
        }
    }
    
    .cb{
        left: -20px;
        position: relative;
        width: 20px;
        height: 20px;
        top: 5px;
    }
} 

.jss36 {
  flex: 0 0 auto;
  width: 48px;
  color: rgba(0, 0, 0, 0.54);
  height: 48px;
  padding: 0;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
}
.jss37 {
  color: inherit;
}
.jss38 {
  color: #3f51b5;
}
.jss39 {
  color: #2979ff;
}
.jss40 {
  color: rgba(0, 0, 0, 0.26);
}
.jss41 {
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
}
svg:not(:root) {
    overflow: hidden;
}
.jss45 {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 24px;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    flex-shrink: 0;
}
</style>