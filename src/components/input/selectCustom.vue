<template>
  <div>
    <vs-select filter placeholder="Filter" v-model="data">
      <vs-option
        :key="key"
        v-for="(item, key) in data"
        :value="item.value"
        :label="item.text"
        @change="eventDong"
        @formchange="eventDong"
      >
        {{item.text}}
      </vs-option>
    </vs-select>
  </div>
</template>
<script>
export default {
  name: "select-custom",
  components: {},
  props: {
    // name: String,
    // rules: String,
    // data: Array,
    // dataObj: [Object, String, Array],
    // loadingData: Boolean,
    // selectedValue: [Array, String, Number],
    // formKey: String,
    // isMultiple: Boolean,
    // border: Boolean,
    // placeholder: String,
    // tabindex: [Number, String],
  },
  data() {
    return {
        data:[
            {
                text:'Node JS',
                value:1
            },
            {
                text:'Vue',
                value:2
            },
            {
                text:'Python',
                value:3
            },
            {
                text:`Java`,
                value:4
            },
            {
                text:`Php`,
                value:5
            }
        ]
    };
  },
  watch: {
      data: function (val) {
          console.log(val.length);
        },
  },
  methods: {
      eventDong:() =>{
          console.log('sss');
      }
  },
};
</script>
