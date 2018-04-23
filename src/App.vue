<template>
	<div id="app" ref="app">
		<div ref="containerLoader">
			<loader :arrayImg="arrayImg" :arrayImgPIXI="arrayImgPIXI" />
		</div>
		<Noise />	
		<ModalContainer/>	
		<div id="scroll-container" ref="scrollContainer">
			<Grid />			
		</div>

		<BackgroundElements /> 

	</div>
</template>

<script>

	import PerfectScrollbar from 'perfect-scrollbar'
	import TweenLite from 'gsap'
	
	import config from './config.json'
	import { EventBus } from './event-bus.js'
	import { mapGetters, mapActions } from 'vuex'
	import Detector from './utils/Detector'
	import webFontsLoaderTool from './utils/webFontsLoaderTool'
	import ScrollProgress from './class/scrollProgressBase'

	import Noise from './components/TonalNoise'
	import ModalContainer from './components/ModalContainer'
	import BackgroundElements from './components/BackgroundElements'
	import Grid from './components/Grid'
	import Loader from './components/Loader.vue'

	export default {
		name: 'app',
		data() {
			return {
				ticking: false
			}
		},

		components: {
			Noise,
			ModalContainer,
			BackgroundElements,
			Grid,
			Loader
		},

		beforeCreate() {
			// load fonts
			webFontsLoaderTool(
				config.families, 
				config.fontAwesome,
				() => {  
					console.log('fonts... ok!') 			
					this.$nextTick(() => EventBus.$emit('FONTS_LOADED'))
				}
			)
		},

		created(){
			// create Detector
			this.detector = new Detector()
			this.setMobile(this.detector.isMobile())
			console.log('isMobile:',this.isMobile)
			this.resize()

		},

		mounted() {
			this.init()
			this.addListeners()
			console.log('app mounted !')
		},

        computed: {
			arrayImg() {
				let arrayIMG = []
				let dep = config.content
				dep.map( (el) => {
					if(this.isMobile){
						arrayIMG = [...arrayIMG, `projets/${el.image.mobile}`]
					}else{
						arrayIMG = [...arrayIMG, `projets/${el.image.desk}`]
					}
				})
				return arrayIMG
			},

			arrayImgPIXI() {
				let arrayIMGPIXI = []
				const dep = config.bg
				dep.map( (el) => {
					if(this.isMobile){
						arrayIMGPIXI = [...arrayIMGPIXI, {'ref': el.ref, 'image' : el.image.mobile }]
					}else{
						arrayIMGPIXI = [...arrayIMGPIXI, {'ref': el.ref, 'image' : el.image.desk }]
					}
				})
				return arrayIMGPIXI
			},

        	...mapGetters({
				isFirstLoad: 'isFirstLoad',
				isMobile: 'isMobile',
				isPortrait: 'isPortrait',
				isLandscape: 'isLandscape',
				windowSize: 'windowSize',
                isModalOpen: 'isModalOpen'
	        })
		},
		
		methods: {       
		
			...mapActions({
				setFirstLoad: 'setFirstLoad',
				setMobile: 'setMobile',
				setPortrait: 'setPortrait',
				setLandscape: 'setLandscape',
				setWindowSize: 'setWindowSize',
				setModalOpen: 'setModalOpen'
			}),

			init(){

				// promesse pour les composants
				let noiseOK = new Promise( (resolve) => {
					EventBus.$on('TONAL_NOISE_LOADED', () => { resolve(true) })
				})	

				let backgroundOK = new Promise( (resolve) => {
					EventBus.$on('BACKGROUND_LOADED', () => { resolve(true) })
				})

				let preloaderOK = new Promise( (resolve) => {
					EventBus.$on('IMG_LOADED', () => { resolve(true) })
				})	

				let fontsOK = new Promise( (resolve) => {
					EventBus.$on('FONTS_LOADED', () => { resolve(true) })
				})	

				Promise
					.all( [
						noiseOK,
						backgroundOK,
						preloaderOK,
						fontsOK
					])
					.then((result) => {
						//console.log('promesses:', result)
						this.readyForIntro()
					})
			},

			addListeners() {
				window.addEventListener('resize', this.resizeThrottler, false)
				window.addEventListener("orientationchange", this.changeOrientation)
				this.scrollEvent = this.$refs.app.addEventListener('ps-scroll-y', this.scrollThrottler, false)
				EventBus.$on('UPDATE_SCROLLPROGRESS', this.updateScrollProgress)
			},

			resizeThrottler() {
				if (!this.ticking) {
					window.requestAnimationFrame( () => {	
						this.resize()					
						this.ticking = false
					})
				}
				this.ticking = true
			},

            scrollThrottler() {
				if(!this.isModalOpen) {
					if (!this.ticking) {
						window.requestAnimationFrame( () => {							
							this.refScroll = -this.$refs.scrollContainer.getBoundingClientRect().top
							this.$nextTick(() => EventBus.$emit('SCROLL', this.refScroll))
							this.ticking = false
						})
					}
					this.ticking = true
				}else{				
					
				}
			},

			resize() {
				let size = this.detector.getScreenSize()
				this.$nextTick(() => EventBus.$emit('RESIZE', {
					size: size.w
				}))

				this.setWindowSize(size)
				console.log('size',this.windowSize)

				this.setPortrait(this.detector.isPortrait())
				this.setLandscape(this.detector.isLandscape())
				console.log('orientation portrait:',this.isPortrait, 'orientation paysage:',this.isLandscape)
			},	

			changeOrientation() {
				this.resize()
				this.$nextTick(() => EventBus.$emit('CHANGE_ORIENTATION'))			
			},

			readyForIntro() {
				this.playIntro()		
			},

			ready() {
				this.$refs.containerLoader.style.display = 'none'
				this.$refs.scrollContainer.style.height = '600vh'
 				// create PerfectScroll
				this.ps = new PerfectScrollbar('#app', {
					suppressScrollX: true,
					swipeEasing: true
				})
				this.scrollProgress = new ScrollProgress(this.$refs.scrollContainer)
			},

			updateScrollProgress(newOffset) {
				//console.log('UPDATE *********************')
				this.ps.update()

			},

			playIntro() {

				this.timeline = new TimelineLite({onComplete:this.ready})
				this.timeline

					.to(this.$refs.containerLoader, 2, {
						opacity: 0
						}
					)
					.fromTo('.ref-9', 0.4, {
						y: 800,
						scaleY: 7,
						ease: Power2.easeOut
						}, {
						y: -40,
						scaleY: 0.1,
						ease: Power2.easeOut
						}, '-=2'
					)
					.to('.ref-9', 0.2, {
						y: 0,
						scaleY: 1,
						ease: Power2.easeIn
						}, '-=1.6'
					)
					.fromTo('.ref-10', 0.4, {
						y: 800,
						scaleY: 7,
						ease: Power2.easeOut
						}, {
						y: -40,
						scaleY: 0.1,
						ease: Power2.easeOut
						},'-=1.8'
					)
					.to('.ref-10', 0.2, {
						y: 0,
						scaleY: 1,
						ease: Power2.easeIn
						},'-=1.4'
					)
					.fromTo('.ref-11', 0.4, {
						y: 800,
						scaleY: 7,
						ease: Power2.easeOut
						}, {
						y: -40,
						scaleY: 0.1,
						ease: Power2.easeOut
						},'-=1.6'
					)
					.to('.ref-11', 0.2, {
						y: 0,
						scaleY: 1,
						ease: Power2.easeIn
						},'-=1.2'
					)					
					.from('.ref-4', 0.6, {
						y: -10,
						opacity: 0,
						ease: Power2.easeOut
						},'-=1'
					)
					.from('.ref-5', 0.6, {
						y: -10,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=1.2'
					)
					.from('.ref-6', 0.6, {
						y: -10,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=1.4'
					)
					.from('.ref-1', 1.8, {
						x: -20,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=1'
					)			
					.from('.ref-3', 1.2, {
						x: -20,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=0.6'
					)
					.from('.ref-7', 1.8, {
						y: 20,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=1.8'
					)			
					.from('.ref-8', 1.8, {
						y: 20,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=1.4'
					)
					.from('.ref-2', 0.8, {
						y: -40,
						opacity: 0,
						ease: Power2.easeOut
						}, '-=1.4'
					)
					.call(() => {
						document.querySelector('.ref-2 i').style.animation = 'pulse 0.6s infinite cubic-bezier(0.66, 0, 0, 1)'
					})	
					
			}
		}
	}

</script>

<style lang="scss">
	@import "./assets/css/main";
</style>
