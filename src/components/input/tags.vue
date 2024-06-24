<template>
    <div>
        
    </div>
</template>
<script>
import Tagify from '@yaireo/tagify'
export default {
    name: "tags-input",
    props: {
        arrData: Array
    },
    data() {
        return {
            tagify: null,
            whitelist_1: this.whitelist_1 || []
        }
    },
    watch: {
        arrData: function(val) {
            if(val != undefined) {
                this.whitelist_1 = val
            }
        }
    },
    methods: {
        initialize() {
            this.tagify = new Tagify(input, {
            //  mixTagsInterpolator: ["{{", "}}"],
                mode: 'mix',  // <--  Enable mixed-content
                pattern: /@|#/,  // <--  Text starting with @ or # (if single, String can be used here)

                // Array for initial interpolation, which allows only these tags to be used
                whitelist: whitelist_1.map(function(item){ return typeof item == 'string' ? {value:item} : item}),

                dropdown : {
                    enabled: 1,
                    position: "text",
                    highlightFirst: true  // automatically highlights first sugegstion item in the dropdown
                },
                callbacks: {
                    add: console.log,  // callback when adding a tag
                    remove: console.log   // callback when removing a tag
                }
            })

            this.onInput()
        },
        onInput() {
            this.tagify !== null && this.tagify.on('input', function(e){
                var prefix = e.detail.prefix;

                // first, clean the whitlist array, because the below code, while not, might be async,
                // therefore it should be up to you to decide WHEN to render the suggestions dropdown
                // tagify.settings.whitelist.length = 0;

                if( prefix ){
                    if( prefix == '@' )
                        tagify.settings.whitelist = whitelist_1;

                    if( prefix == '#' )
                        tagify.settings.whitelist = whitelist_2;

                    if( e.detail.value.length > 1 )
                        tagify.dropdown.show.call(tagify, e.detail.value);
                }



            })
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>