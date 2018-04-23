<template>
    <div ref="distort" :id="refId" class="grid-cellule-container-visuel"></div>
</template>

<script>

    import * as PIXI from 'pixi.js'
    import { mapGetters } from 'vuex'
    import { EventBus } from '../event-bus.js'
    import { DistortFilter } from '../filters/distort-filter'

    export default {

        name: 'filterDistort',

        props: {

            bgImg: {
                default: 'bg/grid-anim.png',
                type: String
            },
            refId: {
                default: 'distort',
                type: String
            },
            refScale: {
                default: 0.85,
                type: Number
            },
            animate: {
                default: true,
                type: Boolean               
            },
            resource: {
                default: null,
                type: Array
            }        
        },

        data() {
            return { 
                imgRef: null,
                //bgImg: 'bg/grid-anim.png',
                distortImg: 'distortion/noise.png',
                distortValue: 50,
            }
        },

        mounted() {
            this.init()
            this.addListeners()
        },

        beforeDestroy() {
            if(this.app){
                this.app.destroy(true)
            } 
        },
        
        computed: {
            ...mapGetters({
				isMobile: 'isMobile'
	        }),
            canvasHolder() {
                return this.$refs.distort
            }
        },

		methods: {
            
            init() {
                // crée le filter pixi 
                // sur un poste fixe
                
                if(this.animate){
                    if(this.resource === null){
                        this.imgSrc = require('../assets/images/' + this.bgImg)
                        this.loadImage()
                    }else{
                        this.createStage()
                        this.createFilter()              
                        this.resizeImages()
                        this.animateFilters()
                        // emit ready
                        this.ready()                   
                    }
                    
                // sinon sur mobile 
                // crée un bruit non animé
                }else{
                    this.imgRef = require('../assets/images/' + this.bgImg)
                    this.canvasHolder.style.backgroundImage = `url( '${this.imgRef}')`
                    this.canvasHolder.style.opacity = 1 
                    this.canvasHolder.style.backgroundPosition = 'center'
                    this.canvasHolder.style.backgroundSize = 'contain'
                    this.canvasHolder.style.backgroundRepeat = 'no-repeat'
                    // emit ready
                    this.ready()                      
                }
            },

            addListeners() {
                EventBus.$on('RESIZE', this.resizeStage)   
                EventBus.$on('CHANGE_ORIENTATION', this.resizeStage)      
            },

            loadImage() {
                this.loader = new PIXI.loaders.Loader()
                this.loader.add( 'imgRefGrid', this.imgSrc )
                this.loader.add( 'distortRefGrid', this.distortSrc )
                this.loader.load( (loader, resources) => {
                    this.imgRef = resources.imgRefGrid
                    this.distortRef = resources.distortRefGrid
                    this.createStage()
                    this.createFilter()
                    this.resizeImages()
                    this.animateFilters()
                    // emit ready
                    this.ready()    
                })    
            },
            
            createStage() {
                if(this.resource !== null) {
                    this.imgRef = this.resource[0]
                }
                // définir le ratio de l'image
                this.imgRatio = this.imgRef.data.height / this.imgRef.data.width 
                // définir la largeur du containeur
                this.appWidth = this.canvasHolder.offsetWidth
                // définir proportionnellement la hauteur du containeur
                //this.appHeight = Number( this.appWidth * this.imgRatio ).toFixed()
                this.appHeight = this.canvasHolder.offsetHeight

                // céer l'application PIXI
                this.app = new PIXI.Application(this.appWidth, this.appHeight, {transparent: true})

                // placer l'application dans le containeur
                this.canvasHolder.appendChild(this.app.view)

                // créer la texture
                this.texture = PIXI.Texture.fromImage(this.imgRef.name)  
                this.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT            

                // créer l'image de fond
                this.imgBg = new PIXI.Sprite(this.texture)
                this.imgBg.anchor.set(0.5)

                // placer l'image de fond dans l'application
                this.app.stage.addChild(this.imgBg)
           
            },

            createFilter() {
                // Creer le containeur du filtre
                // créer le filter

                if(this.resource !== null) {
                    this.distortRef = this.resource[1]
                }

                this.distortFilter = new DistortFilter()
                this.distortFilter.uniforms.noiseTexture = PIXI.Texture.fromImage(this.distortRef.name)
                this.distortFilter.uniforms.amplitude = this.distortValue

                this.distortFilter.apply = function(filterManager, input, output, refImg){

                    this.uniforms.res[0] = input.sourceFrame.width
                    this.uniforms.res[1] = input.sourceFrame.height

                    // draw the filter...
                    filterManager.applyFilter(this, input, output);
                }
                this.imgBg.filters = [this.distortFilter]
            },

            resizeImages() {
                
                // Place l'image pour 'couvrir'
                // tout le conteneur

                const ratioImgBg = (this.imgRef.data.width / this.imgRef.data.height)  
                const ratioApp = (this.appWidth / this.appHeight)

                //console.log('ratio image',ratioImgBg , 'ratio appli',ratioApp)                

                if( ratioApp >= ratioImgBg ){
                    //console.log('refscale', this.refScale)                    
                    this.imgBg.height = ( this.appHeight * this.refScale)
                    const newRatio = ( this.appHeight * this.refScale) / this.imgRef.data.height
                    this.imgBg.scale.x = newRatio
                }else{
                    this.imgBg.width = ( this.appWidth * this.refScale)
                    const newRatio = ( this.appWidth * this.refScale) / this.imgRef.data.width
                    this.imgBg.scale.y = newRatio
                }

                //console.log(this.imgBg.width , 'x',this.imgBg.height)   
                this.imgBg.x = this.appWidth / 2
                this.imgBg.y = this.appHeight / 2  
         
            }, 

            animateFilters() {
                this.app.ticker.add(() => {
                    if(this.distortFilter.uniforms.amplitude > 25){
                        this.distortFilter.uniforms.amplitude -= 1
                    }
                    this.distortFilter.uniforms.time += 0.01
                })
            },

            resizeStage() {

                if(this.app && this.app.renderer !== null) {
                    // définir la nouvelle largeur du containeur
                    this.appWidth = this.canvasHolder.offsetWidth
                    this.appHeight = this.canvasHolder.offsetHeight
                    //const newHeight = Number( this.appWidth * this.imgRatio ).toFixed()

                    // retailler l'app
                    this.app.renderer.resize(this.appWidth , this.appHeight)

                    //postionner l'image de fond 
                    this.resizeImages()
                }
            },

            ready() {
                //console.log('Distort component mounted !')
                this.$nextTick(() => EventBus.$emit('FILTER_DISTORTION_LOADED'))
            }        
        }
    }

</script>