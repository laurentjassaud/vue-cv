<template>
    <div class="modal-container">
        <modals-container />
    </div>
</template>

<script>

    import Vue from 'vue'
    import VModal from 'vue-js-modal'
    import { mapGetters, mapActions  } from 'vuex'
    import { EventBus } from '../event-bus.js'
    import ImgModal from './ImgModal.vue' 

    Vue.use(VModal, { dynamic: true })
    
    export default {
        name: 'containerModal',
        props: ['img'],
        components: {
            ImgModal
        },
        mounted() {
            this.addListeners()
        },
        computed: {
            ...mapGetters({
                isModalOpen: 'isModalOpen'
            }),
        },
        methods: {  
            
			addListeners() {
                EventBus.$on('MODAL_OPEN',(element) => this.openModal(element))
                EventBus.$on('MODAL_CLOSE',this.closeModal)
            },
			
            ...mapActions({
                setModalOpen: 'setModalOpen'
            }),

            openModal(element) {
                //console.log('je suis sur modal' , element)
                this.$nextTick(() => {
                    this.$modal.show(
                        ImgModal, 
                        {
                            img: {
                                src: element.src,
                                alt: element.alt
                            }
                        },
                        {
                            name: 'activeModal',
                            delay: 300,
                            reset: true,
                            transition: "nice-modal-fade",
                            resizable: true,
                            adaptive: true,
                            scrollable: true,
                            height: 'auto',
                            width: '80%'
                        }, {
                            'before-open': this.beforeOpenNodal,
                            'before-close': this.beforeCloseNodal,
                            'opened': this.afficheButtom,
                            'closed': this.recalage
                        }
                    )
                })
            },

            closeModal() {
                this.$modal.hide('activeModal')
            },

            afficheButtom() {
                setTimeout(() => {                    
                    document.querySelector('.top-right').style.opacity = '1' 
                }, 500)
                
            },

            beforeOpenNodal(event) {
                
                if(!this.isModalOpen) {
                    this.setModalOpen(true)
                    document.getElementById('app').classList.remove('ps')
                }
            },

            beforeCloseNodal(event) {
                document.querySelector('.v--modal-overlay.scrollable').style.overflow = 'hidden'
                document.querySelector('.top-right i').style.display = 'none'                           
            },

            recalage() {
                this.setModalOpen(false) 
                document.getElementById('app').classList.add('ps')     
            }
        }
    }

</script>
