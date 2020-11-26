<template >
    <div class="box">
        <div class="con-form form-package">
            <template v-if="Object.keys(InputObject).length > 0">
                <vs-row justify="center">
                    <vs-col xs="12" md="6" lg="6">
                        <input-general 
                            :name="InputObject['package_description'].label" 
                            :rules="InputObject['package_description'].rule" 
                            :formKey="InputObject['package_description'].key"
                            :valueData="InputObject['package_description'].value"
                            :typeInput="InputObject['package_description'].typeInput"
                            @updateValue="updateValue" />
                        
                        <p>{{InputObject['package_category'].label}}</p>
                        <selector 
                            :ref="InputObject['package_category'].key"
                            :name="''" 
                            :rules="InputObject['package_category'].rule" 
                            :formKey="InputObject['package_category'].key"
                            :valueData="InputObject['package_category'].arrData"
                            :selectedValue="InputObject['package_category'].value"
                            :isMultiple="false"
                            @updateValue="updateValue" />

                        <p>{{InputObject['package_service'].label}}</p>
                        <template v-if="InputObject['package_service'].arrData.length > 0">
                            <radio 
                            :ref="InputObject['package_service'].key"
                            :name="''" 
                            :rules="InputObject['package_service'].rule" 
                            :formKey="InputObject['package_service'].key"
                            :valueData="InputObject['package_service'].arrData"
                            :selectedValue="InputObject['package_service'].value"
                            @updateValue="updateValue" />
                        </template>
    
                        <input-general 
                            :name="InputObject['package_price'].label" 
                            :rules="InputObject['package_price'].rule" 
                            :formKey="InputObject['package_price'].key"
                            :valueData="InputObject['package_price'].value"
                            :typeInput="InputObject['package_price'].typeInput"
                            @updateValue="updateValue" />
                        
                        <input-general 
                            :name="InputObject['package_diskon'].label" 
                            :rules="InputObject['package_diskon'].rule" 
                            :formKey="InputObject['package_diskon'].key"
                            :valueData="InputObject['package_diskon'].value"
                            :typeInput="InputObject['package_diskon'].typeInput"
                            @updateValue="updateValue" />
                        
                        <input-general 
                            :name="InputObject['package_instruksi'].label" 
                            :rules="InputObject['package_instruksi'].rule" 
                            :formKey="InputObject['package_instruksi'].key"
                            :valueData="InputObject['package_instruksi'].value"
                            :typeInput="InputObject['package_instruksi'].typeInput"
                            @updateValue="updateValue" />
                    </vs-col>
                    <vs-col xs="12" md="6" lg="6">
                        <vs-row>
                            <vs-col xs="12" md="6" lg="6">
                                <input-general 
                                    :name="InputObject['package_jumlah'].label" 
                                    :rules="InputObject['package_jumlah'].rule" 
                                    :formKey="InputObject['package_jumlah'].key"
                                    :valueData="InputObject['package_jumlah'].value"
                                    :typeInput="InputObject['package_jumlah'].typeInput"
                                    @updateValue="updateValue" />
                            </vs-col>
                            <vs-col xs="12" md="6" lg="6">
                                <vs-button
                                    shadow
                                    :active="false"
                                    style="margin-top:1.5em"
                                >
                                    <i class='bx bx-layer-plus' style="margin-right:5px"></i> Atur Berat
                                </vs-button>
                            </vs-col>
                        </vs-row> 

                        <vs-row>
                            <vs-col xs="6" md="3" lg="3">
                                <input-general 
                                    :name="InputObject['package_dimensi_weight'].label" 
                                    :rules="InputObject['package_dimensi_weight'].rule" 
                                    :formKey="InputObject['package_dimensi_weight'].key"
                                    :valueData="InputObject['package_dimensi_weight'].value"
                                    :typeInput="InputObject['package_dimensi_weight'].typeInput"
                                    @updateValue="updateValue" />
                            </vs-col>
                            <vs-col xs="6" md="3" lg="3">
                                <input-general 
                                    :name="InputObject['package_dimensi_length'].label" 
                                    :rules="InputObject['package_dimensi_length'].rule" 
                                    :formKey="InputObject['package_dimensi_length'].key"
                                    :valueData="InputObject['package_dimensi_length'].value"
                                    :typeInput="InputObject['package_dimensi_length'].typeInput"
                                    @updateValue="updateValue" />
                            </vs-col>
                            <vs-col xs="6" md="3" lg="3">
                                <input-general 
                                    :name="InputObject['package_dimensi_width'].label" 
                                    :rules="InputObject['package_dimensi_width'].rule" 
                                    :formKey="InputObject['package_dimensi_width'].key"
                                    :valueData="InputObject['package_dimensi_width'].value"
                                    :typeInput="InputObject['package_dimensi_width'].typeInput"
                                    @updateValue="updateValue" />
                            </vs-col>
                            <vs-col xs="6" md="3" lg="3">
                                <input-general 
                                    :name="InputObject['package_dimensi_height'].label" 
                                    :rules="InputObject['package_dimensi_height'].rule" 
                                    :formKey="InputObject['package_dimensi_height'].key"
                                    :valueData="InputObject['package_dimensi_height'].value"
                                    :typeInput="InputObject['package_dimensi_height'].typeInput"
                                    @updateValue="updateValue" />
                            </vs-col>
                        </vs-row>  

                        <vs-row>
                            <vs-col xs="12" md="6" lg="6">
                                <div class="chekboxgroup">
                                    <checkbox
                                        :formKey="InputObject['package_tidak_packing_kayu'].key"
                                        :isChecked="InputObject['package_tidak_packing_kayu'].value"
                                        :typeInput="InputObject['package_tidak_packing_kayu'].typeInput"
                                        @updateValue="updateValue" /> 
                                    <a href="javascript:void(0)">
                                        <p>{{InputObject['package_tidak_packing_kayu'].titleLabel}}</p>
                                    </a>
                                </div>
                            </vs-col>
                            <vs-col xs="12" md="6" lg="6">
                                <div class="chekboxgroup">
                                    <checkbox
                                        :formKey="InputObject['package_tidak_asuransi'].key"
                                        :isChecked="InputObject['package_tidak_asuransi'].value"
                                        :typeInput="InputObject['package_tidak_asuransi'].typeInput"
                                        @updateValue="updateValue" /> 
                                    <a href="javascript:void(0)">
                                        <p>{{InputObject['package_tidak_asuransi'].titleLabel}}</p>
                                    </a>
                                </div>
                            </vs-col>
                        </vs-row>

                        <vs-row class="mt-1">
                            <vs-col xs="12" md="6" lg="6">
                                <vs-button
                                    shadow
                                    :active="false"
                                >
                                    <i class='bx bx-plus' style="margin-right:5px"></i> SURCHARGE
                                </vs-button>
                            </vs-col>
                            <vs-col xs="12" md="6" lg="6">
                                <div class="chekboxgroup">
                                    <checkbox
                                        :formKey="InputObject['package_do_return'].key"
                                        :isChecked="InputObject['package_do_return'].value"
                                        :typeInput="InputObject['package_do_return'].typeInput"
                                        @updateValue="updateValue" /> 
                                    <a href="javascript:void(0)">
                                        <p>{{InputObject['package_do_return'].titleLabel}}</p>
                                    </a>
                                </div>
                            </vs-col>
                        </vs-row> 

                    </vs-col>
                </vs-row>  
            </template>
                    <!-- <vs-row justify="center">
                        <vs-col xs="12" md="6" lg="6">
                            <div>
                                <vs-row v-for="(item, keys) in keysLeft" :key="keys">
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                                            <input-general 
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            @updateValue="updateValue" />
                                        </template>
                                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('select')">
                                            <p>{{InputObject[item].label}}</p>
                                            <template>
                                                <selector 
                                                :ref="InputObject[item].key"
                                                :name="''" 
                                                :rules="InputObject[item].rule" 
                                                :formKey="InputObject[item].key"
                                                :valueData="InputObject[item].arrData"
                                                :selectedValue="InputObject[item].value"
                                                :isMultiple="false"
                                                @updateValue="updateValue" />
                                            </template>
                                        </template>
                                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('radio')">
                                            <p>{{InputObject[item].label}}</p>
                                            <template v-if="InputObject[item].arrData.length > 0">
                                                <radio 
                                                :ref="InputObject[item].key"
                                                :name="''" 
                                                :rules="InputObject[item].rule" 
                                                :formKey="InputObject[item].key"
                                                :valueData="InputObject[item].arrData"
                                                :selectedValue="InputObject[item].value"
                                                @updateValue="updateValue" />
                                            </template>
                                        </template>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </vs-col>
                        <vs-col xs="12" md="6" lg="6">
                            <div>
                                <vs-row v-for="(item, keys) in keysRight" :key="keys">
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                                            <input-general 
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            @updateValue="updateValue" />
                                        </template>
                                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('row')">
                                            <vs-row justify="center">
                                                <template v-if="InputObject[item].input.length > 0">
                                                    <vs-col xs="12" :w="InputObject[item]['col']" v-for="(inp, i) in InputObject[item].input" :key="i">
                                                        <input-general 
                                                        :name="inp.label" 
                                                        :rules="inp.rule" 
                                                        :formKey="inp.key"
                                                        :valueData="inp.value"
                                                        :typeInput="inp.typeInput"
                                                        @updateValue="updateValue" />
                                                    </vs-col>
                                                </template>
                                            </vs-row>
                                        </template>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </vs-col>
                    </vs-row> -->
        </div>
    </div>
</template>
<script>
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
import Radio from "@/components/input/radio"
import Checkbox from "@/components/input/checkbox"
export default {
    name: "package-information",
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
        "radio": Radio,
        "checkbox": Checkbox
    },
    data() {
        return {
            keysLeft: [],
            keysRight: [],
            InputObject: {},
            form: {}
        }
    },
    computed: {
        listen_package_category_arrData() {
            return this.$store.getters['getTransaction']['package']
        }
    },
    methods: {
        initialize() {
            let obj = this.$store.getters['getTransaction']['package'] || {}
                if (Object.keys(obj).length > 0) {
                    let keys = Object.keys(obj)
                    keys.map(item => {
                        if(obj[item].typeInput.includes('col_left')) {
                            this.keysLeft.push(item)
                        } else if(obj[item].typeInput.includes('col_right')) {
                            this.keysRight.push(item)
                        }
                    })
                    this.InputObject = obj
                    console.log('ini inputObject', this.InputObject, this.keysLeft, this.keysRight)
                } else {
                    this.keysLeft = []
                    this.keysRight = []
                    this.InputObject = {}
                }
        },
        updateValue() {}
    },
    mounted() {
        this.initialize()
    },
}
</script>
<style lang="scss">
    .form-package{
        text-align: left;
        p{
            margin: .5em;
            font-size: 14px;
            &.surcharge{
                margin: 0 .5em;
            }
        }
        .chekboxgroup{
            position: relative;
            display: flex;
            justify-content: flex-start;
            margin-top: .5em;
            p{
                margin: 0 .5em 0 0;
                font-size: 14px;
            }
        }
    }
</style>