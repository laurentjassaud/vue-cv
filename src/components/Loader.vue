<template>
    <div id="loader" ref="loader"> 
        <div class="loading" ref="loading">
            <svg x="0px" y="0px" width="200px" height="40px" viewBox="0 0 200 40" enable-background="new 0 0 200 40" xml:space="preserve">
                <g>
                    <path fill="#FFFFFF" d="M50.546,24.76c-0.579,0-1.111-0.107-1.597-0.321c-0.485-0.215-0.908-0.525-1.267-0.932
                        c-0.359-0.406-0.64-0.905-0.841-1.498c-0.2-0.593-0.301-1.262-0.301-2.009c0-0.737,0.103-1.4,0.309-1.988
                        c0.205-0.588,0.489-1.087,0.854-1.498c0.364-0.41,0.793-0.726,1.288-0.944c0.495-0.22,1.036-0.329,1.624-0.329
                        c0.561,0,1.053,0.114,1.478,0.343c0.424,0.229,0.771,0.492,1.043,0.791l-0.63,0.756c-0.243-0.261-0.519-0.471-0.826-0.63
                        c-0.309-0.158-0.658-0.238-1.05-0.238c-0.439,0-0.836,0.087-1.19,0.26s-0.658,0.42-0.91,0.741
                        c-0.252,0.322-0.446,0.712-0.581,1.169c-0.136,0.458-0.203,0.972-0.203,1.54c0,0.579,0.067,1.1,0.203,1.562
                        c0.135,0.462,0.324,0.856,0.567,1.183c0.242,0.327,0.539,0.579,0.889,0.756c0.351,0.178,0.744,0.267,1.184,0.267
                        c0.447,0,0.84-0.091,1.176-0.273c0.336-0.182,0.653-0.436,0.952-0.763l0.644,0.728c-0.364,0.42-0.774,0.747-1.231,0.98
                        C51.67,24.644,51.143,24.76,50.546,24.76z"/>
                    <path fill="#FFFFFF" d="M57.867,24.592v-9.184h1.162v3.85H63.3v-3.85h1.176v9.184H63.3v-4.326h-4.271v4.326H57.867z"/>
                    <path fill="#FFFFFF" d="M68.577,24.592l3.108-9.184h1.315l3.108,9.184h-1.246l-0.868-2.8h-3.346l-0.882,2.8H68.577z M71.377,19.454
                        l-0.434,1.4h2.758l-0.434-1.4c-0.168-0.514-0.327-1.024-0.477-1.533s-0.299-1.029-0.448-1.561h-0.056
                        c-0.14,0.531-0.285,1.052-0.434,1.561C71.704,18.43,71.545,18.94,71.377,19.454z"/>
                    <path fill="#FFFFFF" d="M80.211,24.592v-9.184h2.87c0.467,0,0.898,0.044,1.295,0.133s0.737,0.235,1.022,0.441
                        c0.284,0.205,0.506,0.471,0.665,0.798c0.158,0.326,0.237,0.728,0.237,1.204c0,0.719-0.187,1.292-0.56,1.722
                        s-0.878,0.724-1.512,0.882l2.338,4.004h-1.316l-2.212-3.878h-1.666v3.878H80.211z M81.373,19.762h1.54
                        c0.719,0,1.27-0.146,1.652-0.44s0.574-0.74,0.574-1.337c0-0.606-0.191-1.031-0.574-1.274c-0.383-0.242-0.934-0.364-1.652-0.364
                        h-1.54V19.762z"/>
                    <path fill="#FFFFFF" d="M94.589,24.76c-0.606,0-1.164-0.107-1.673-0.321c-0.509-0.215-0.945-0.525-1.31-0.932
                        c-0.363-0.406-0.648-0.905-0.854-1.498S90.444,20.747,90.444,20c0-0.737,0.105-1.4,0.315-1.988s0.502-1.087,0.875-1.498
                        c0.373-0.41,0.819-0.726,1.337-0.944c0.519-0.22,1.08-0.329,1.688-0.329c0.316,0,0.608,0.032,0.875,0.098
                        c0.266,0.065,0.508,0.152,0.728,0.259c0.22,0.107,0.415,0.229,0.588,0.364c0.173,0.136,0.324,0.273,0.455,0.413l-0.644,0.756
                        c-0.233-0.242-0.504-0.448-0.813-0.616c-0.308-0.168-0.695-0.252-1.162-0.252s-0.887,0.087-1.26,0.26s-0.69,0.42-0.952,0.741
                        c-0.261,0.322-0.464,0.712-0.608,1.169c-0.146,0.458-0.218,0.972-0.218,1.54c0,0.579,0.068,1.1,0.203,1.562
                        c0.136,0.462,0.331,0.856,0.588,1.183c0.257,0.327,0.574,0.579,0.952,0.756c0.378,0.178,0.814,0.267,1.31,0.267
                        c0.326,0,0.637-0.049,0.931-0.147c0.294-0.098,0.534-0.23,0.721-0.398v-2.395h-1.945v-0.966h3.01v3.864
                        c-0.299,0.308-0.691,0.563-1.176,0.763C95.756,24.659,95.205,24.76,94.589,24.76z"/>
                    <path fill="#FFFFFF" d="M102.415,24.592v-9.184h5.292v0.979h-4.13v2.885h3.486v0.993h-3.486v3.332h4.271v0.994H102.415z"/>
                    <path fill="#FFFFFF" d="M112.593,24.592v-9.184h1.4l1.764,4.899c0.112,0.317,0.222,0.638,0.329,0.959
                        c0.107,0.322,0.217,0.643,0.329,0.959h0.056c0.112-0.316,0.218-0.637,0.315-0.959c0.098-0.321,0.203-0.642,0.314-0.959l1.736-4.899
                        h1.414v9.184h-1.092v-5.054c0-0.41,0.019-0.863,0.056-1.358c0.037-0.494,0.07-0.947,0.099-1.357h-0.057l-0.728,2.086l-1.736,4.76
                        h-0.77l-1.736-4.76l-0.729-2.086h-0.056c0.028,0.41,0.059,0.863,0.091,1.357c0.033,0.495,0.049,0.948,0.049,1.358v5.054H112.593z"
                        />
                    <path fill="#FFFFFF" d="M125.57,24.592v-9.184h5.292v0.979h-4.13v2.885h3.486v0.993h-3.486v3.332h4.271v0.994H125.57z"/>
                    <path fill="#FFFFFF" d="M135.748,24.592v-9.184h1.204l3.318,5.768l0.994,1.904h0.056c-0.028-0.467-0.059-0.949-0.091-1.449
                        c-0.033-0.499-0.049-0.991-0.049-1.477v-4.746h1.105v9.184h-1.204l-3.332-5.782l-0.994-1.89H136.7
                        c0.037,0.467,0.072,0.94,0.105,1.421c0.032,0.481,0.049,0.964,0.049,1.449v4.802H135.748z"/>
                    <path fill="#FFFFFF" d="M149.511,24.592v-8.204h-2.772v-0.979h6.721v0.979h-2.772v8.204H149.511z"/>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>

import * as PIXI from 'pixi.js'
import imagesLoaded from 'imagesloaded'
import TweenLite from 'gsap'
import { EventBus } from '../event-bus.js'
import { mapGetters, mapActions } from 'vuex'

export default {

    name: 'loader',

    props: ['arrayImg','arrayImgPIXI'],

    data() {

        return {
            imgLoad: null,
            arrayFinalImages: [],
            imagesToLoad: 0,
            progCount: 0
        }
    },

    mounted(){
        this.addEventsListeners()
        this.init()
    },

    computed: {
        ...mapGetters({
            bgArray: 'bgArray'
        })
    },

    methods: {
        ...mapActions({
            setBgArray: 'setBgArray'
        }),

        addEventsListeners() {
            //EventBus.$on('FONTS_LOADED', this.chargementMedia)
        },

        init() {

            this.chargementMedia()
        },

        chargementMedia() {
            //EventBus.$off('FONTS_LOADED', this.chargementMedia)
            /*             
                TweenLite.to('.loading', 0.3, { opacity: 1, ease: Power1.easeOut, onComplete: () => {
                    this.loading.style.animation = 'pulse 0.6s infinite cubic-bezier(0.66, 0, 0, 1)'
                }})  
            */
              
            // definit le tableau des images à charger 
            // avec la bonne url
            this.arrayImg.forEach( (ref) => {
                let img = new Image()
                let media
                media = require.context('../assets/images/', true)
                img.src = media('./' + ref )
                this.arrayFinalImages.push(img)
            })

            // librairie 'imagesLoaded'
            this.imgLoad = imagesLoaded(this.arrayFinalImages)                        
            this.imgLoad.on( 'done', () => {
                this.chargePIXI()
            } )
        },

        chargePIXI() {
            // definit le tableau des images à charger 
            // avec la bonne url
            this.loader = new PIXI.loaders.Loader()
            this.arrayImgPIXI.forEach( (ref) => {
                let imgSrc = require('../assets/images/' + ref.image)
                this.loader.add( ref.ref, imgSrc )
            })

            this.loader.load( (loader, resources) => {
                this.setBgArray(resources)
                this.$nextTick(() => this.imgReady()) 
            } )
        },

        imgReady(){

            this.$refs.loading.style.webkitAnimationPlayState = 'paused'
            this.$refs.loading.style.display = 'none'
            this.$nextTick(() => EventBus.$emit('IMG_LOADED'))
            
        }
    }
}
</script>

