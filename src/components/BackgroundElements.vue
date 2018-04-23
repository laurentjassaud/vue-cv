<template>
    <div id="back-grid">
        <div class="back-grid__container">

            <filter-distorsion 
                v-if="refFilterDistort === filterCourrant"
                :bgImg="'bg/grid-anim_opt_mobile.png'"  
                :resource="[this.bgArray.bg_1,this.bgArray.distort]"
                :refId="'bg-filter-1'"
                :animate="true"/>

            <filter-glitch 
                v-if="refFilterGlitch === filterCourrant" 
                :bgImg="'bg/pirate_mobile.jpg'" 
                :resource="[this.bgArray.bg_2]"
                :refId="'bg-filter-2'"
                :cover="false"
                :animate="false"/>

            <filter-distorsion 
                v-if="refFilterDistort2 === filterCourrant" 
                :bgImg="'bg/vecto_opt_mobile.png'" 
                :resource="[this.bgArray.bg_3,this.bgArray.distort]"
                :refId="'bg-filter-3'"
                :refScale="0.65"
                :animate="false"/>

            <filter-glitch 
                v-if="refFilterGlitch2 === filterCourrant" 
                :bgImg="'bg/portrait_opt_mobile.jpg'" 
                :resource="[this.bgArray.bg_4]"
                :refId="'bg-filter-4'"
                :cover="true"
                :animate="true"/>

            <filter-distorsion 
                v-if="refFilterDistort3 === filterCourrant" 
                :bgImg="'bg/comp.png'" 
                :resource="[this.bgArray.bg_5,this.bgArray.distort]"
                :refId="'bg-filter-5'"
                :animate="false"/>
        </div> 
    </div>
</template>

<script>

    import { EventBus } from '../event-bus.js'
    import { mapGetters } from 'vuex'
    import FilterDistorsion from './FilterDistorsion'
    import FilterGlitch from './FilterGlitch'
    
    export default {

        name: 'BackgroundElements',

        data() {
            return { 
                filterCourrant: -1,
                refFilterDistort: 0,
                refFilterGlitch: 1,
                refFilterDistort2: 2,
                refFilterGlitch2: 3,
                refFilterDistort3: 4,
                onArray: [
                    'FILTER_DISTORTION_LOADED',
                    'FILTER_GLITCH_LOADED'
                ]
            }
        },

		components: {
            FilterDistorsion,
            FilterGlitch
        },
        
        created() {

        },

        mounted() {
            this.addListeners()
            
        },

        beforeDestroy() {

        },
        
        computed: {
            ...mapGetters({
                bgArray: 'bgArray',
            })
        },

		methods: {
            
            init() {

                EventBus.$off('IMG_LOADED', this.init)
                this.filterCourrant = 0
                // promesse pour les composants
				let filterOK = new Promise( (resolve) => {
					EventBus.$on(this.onArray[this.filterCourrant], () => { resolve(true) })
				})				

				Promise
					.all( [
						filterOK
					])
					.then((result) => {
						//console.log('promesses backGround:', result)
						this.ready()
                    })
            },

            addListeners() {
                EventBus.$on('IMG_LOADED', this.init)
                EventBus.$on('CHANGE_BG', (ref) => this.changeElementBG(ref)) 
            },

            changeElementBG(ref) {
                        
                //let indicePourDirection = direction ? 1 : -1   
                //this.filterCourrant = this.filterCourrant + indicePourDirection
                // rajouter un transition alpha !
                this.filterCourrant = ref
          
            },

            ready() {
                //console.log('Background component mounted !')
                this.$nextTick(() => EventBus.$emit('BACKGROUND_LOADED'))
            }            
        }
    }

</script>