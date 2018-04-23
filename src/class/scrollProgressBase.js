import { EventBus } from '../event-bus.js'
import TweenLite from 'gsap'

export default class ScrollProgress {

    constructor(el) {
        this.DOM = { el: el }
        this.skullVisible = false
        this.forward = true
        this.lastTime = 0
        this.init()
    }

    init() {
        //console.log('INIT ScrollProgress')
        this.resizeScroll()
        this.setTimeLine()
        this.addListeners()

    }

    addListeners() {
        EventBus.$on('SCROLL', (refScroll) => this.scrollUpdate(refScroll))
        EventBus.$on('RESIZE', () => this.resize())
    }

    changeBg(ref) {
        let refBG
        if (this.forward) {
            refBG = ref
        }else{
            refBG = ref - 1
        }
        EventBus.$emit('CHANGE_BG', refBG /*this.forward*/ )
    }

    resize() {     
        setTimeout(() => {
            //console.log('scrollRation', this.mainTL.progress())
            this.elementHeight = this.DOM.el.getBoundingClientRect().height
            this.windowHeight = window.innerHeight
            //console.log('hauteur', this.elementHeight, 'ecran',this.windowHeight)
            //console.log('old position =>', this.positionScroll )

            this.positionScroll = (this.DOM.el.getBoundingClientRect().height - this.windowHeight ) * this.mainTL.progress()
            //console.log('NEW scroll position =>', this.positionScroll)

            const container = document.querySelector('#app')
            container.scrollTop = this.positionScroll
            //EventBus.$emit('UPDATE_SCROLLPROGRESS')  
            //this.scrollUpdate(this.positionScroll)  
        }, 122)   
    }

    modifZindex() {
        const ref_4 = document.getElementById('grid-niveau-4')
        const ref_5 = document.getElementById('grid-niveau-5')
        const style = window.getComputedStyle(ref_4).getPropertyValue('z-index')
        //console.log('zindex', style)
        if (style === '5'){
            ref_4.style.zIndex = '4'
            ref_5.style.zIndex = '5'
        }else{
            ref_4.style.zIndex = '5'
            ref_5.style.zIndex = '4'
        }
    }

    resizeScroll() {
        
        this.elementHeight = this.DOM.el.getBoundingClientRect().height
        this.windowHeight = window.innerHeight
        this.positionScroll = - this.DOM.el.getBoundingClientRect().top

        //console.log('init',this.elementHeight, '/', this.windowHeight, '/', this.positionScroll )
    }

    animationOnUpdate(){
        //console.log('smooth',this.easedScroll)
        if (this.easedScroll < 0) this.easedScroll = 0
        this.mainTL.progress(this.easedScroll)
    }

    scrollUpdate(scrollValue) {    
        this.positionScroll = scrollValue
        const scrollRatio = this.positionScroll / (this.elementHeight - this.windowHeight) 
        //console.log('position scroll :', this.positionScroll)
        this.scrollTween = new TweenLite(this, 0.8, {
            easedScroll: scrollRatio,
            ease:  Power2.easeOut,
            onUpdate: () => this.animationOnUpdate()
        })
    }

    checkDirection(that) {

        let newTime = this.time()
        if ((that.forward && newTime < that.lastTime) || (!that.forward && newTime > that.lastTime)) {
            that.forward = !that.forward
            //console.log("changed direction")
        }
        that.lastTime = newTime;

    }

    setTimeLine() {

        this.mainTL && delete this.mainTL
        this.mainTL = new TimelineLite({ onUpdate: this.checkDirection, onUpdateParams:[this] })
        this.mainTL.stop()
        
        this.timeline = new TimelineLite()
        this.timeline

            .to('body',3, {
                backgroundColor: "#1f1f1f",
            })

            .to('#back-grid', 0.3, {
                opacity: 0,
            })

            /* ______________________________________________*/
            //             CHANGE FOND 
            .call(() => {
                this.changeBg(1)
            })
            /* ______________________________________________*/

            .to('#back-grid', 0.6, {
                opacity: 1,
                ease: Power3.easeOut
            })

            .to('.ref-2', 0.6, {
                y: 120,
                opacity: 0,
                ease: Power1.easeOut
            }, '-=0.8')

            .to('.ref-7', 0.6, {
                y: 500,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.6')

            .to('.ref-8', 0.6, {
                y: 400,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.5')

            .to('.ref-9', 0.6, {
                scaleY: 1.4,
                ease: Power3.easeOut
            }, '-=0.4')

            .to('.ref-9', 0.6, {
                y: 600,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.4')

            .to('.ref-10', 0.6, {
                scaleY: 1.4,
                ease: Power3.easeOut
            }, '-=0.35')

            .to('.ref-10', 0.6, {
                y: 500,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.35')

            .to('.ref-11', 0.6, {
                scaleY: 1.4,
                ease: Power3.easeOut
            }, '-=0.3')

            .to('.ref-11', 0.6, {
                y: 400,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.3')
            
            .to('.ref-4', 0.6, {
                y: 400,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.6')

            .to('.ref-5', 0.6, {
                y: 500,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.55')

            .to('.ref-6', 0.6, {
                y: 600,
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0.5')    
            
            
            // #########################################
            // 2 ECRAN
            // #########################################

            .to('#grid-niveau-2', 0.2, {
                opacity: 1,
                ease: Power3.easeOut
            }, '+=0.6')

            .from('#grid-niveau-2 .experience', 0.6, {
                scaleX: 0,
                transformOrigin: 'left top',
                x: -20,
                ease: Power3.easeOut
            }, '+=0.4')

            .from('#grid-niveau-2 .experience h5', 0.4, {
                opacity: 0,
                x: -10,
                ease: Power3.easeOut
            }, '+=0.3')

            .staggerFrom('#grid-niveau-2 .experience li', 0.3, {
                opacity: 0,
                x: -10,
                ease: Power3.easeOut
            },0.1, '+=0.2')      

            .from('#grid-niveau-2 .nav', 0.8, {
                y: -40,
                opacity: 0,
                ease: Power2.easeOut
            }, '+=0.4')

            .call(() => {
                document.querySelector('#grid-niveau-2 .nav i').style.animation = 'pulse 0.6s infinite cubic-bezier(0.66, 0, 0, 1)'
            })	

            .to('#back-grid', 0.3, {
                opacity: 0.2,
            })

            .to('#grid-niveau-2 .nav', 0.6, {
                y: 120,
                opacity: 0,
                ease: Power1.easeOut
            }, '+=3')

            .staggerTo('#grid-niveau-2 .experience li', 0.3, {
                opacity: 0,
                x: 20,
                ease: Power3.easeOut
            }, 0.1, '+=0.4')

            .to('#back-grid', 0.2, {
                opacity: 0,
                ease: Power3.easeOut
            })
            /* ______________________________________________*/
            //             CHANGE FOND 
            .call(() => {
                this.changeBg(2)
            })
            /* ______________________________________________*/

            .to('#grid-niveau-2 .experience h5', 0.4, {
                opacity: 0,
                x: 20,
                ease: Power3.easeOut
            })

            .to('#grid-niveau-2 .experience', 0.6, {
                scaleX: 0,
                transformOrigin: 'right top',
                x: 20,
                ease: Power3.easeOut
            })


            // #########################################
            // 3 ECRAN
            // #########################################

            .to('body', 4, {
                backgroundColor: "#cccccc",
            })

            .to('#back-grid', 0.2, {
                opacity: 1,
                ease: Power3.easeOut
            }, '-=2')

            .to('.ref-1 > div', 2, {
                css: {
                    color: "#1f1f1f"
                },
                ease: Power3.easeOut
            }, '-=1')

            .to('.ref-3 > div', 2, {
                css: {
                    color: "#1f1f1f"
                },
                ease: Power3.easeOut
            }, '-=0.8')

            .to('.ref-2 ul', 2, {
                css: {
                    color: "#1f1f1f"
                },
                ease: Power3.easeOut
            }, '-=0.6')

            .to('#grid-niveau-3', 0.2, {
                opacity: 1,
                ease: Power3.easeOut
            }, '-=0.4')

            .to('#back-grid', 1.6, {
                opacity: 0,
                ease: Power3.easeOut
            }, '-=0')

            .from('#grid-niveau-3 .competences', 0.6, {
                    scaleX: 0,
                    transformOrigin: 'left top',
                    x: -20,
                    ease: Power3.easeOut
            }, '-=1')

            .from('#grid-niveau-3 .competences h5', 0.4, {
                opacity: 0,
                x: -10,
                ease: Power3.easeOut
            }, '-=0.7')

            .staggerFrom('#grid-niveau-3 .competences li', 0.3, {
                opacity: 0,
                x: -10,
                ease: Power3.easeOut
            }, 0.1, '-=0.5')

            .from('#grid-niveau-3 .nav', 0.8, {
                y: -40,
                opacity: 0,
                ease: Power2.easeOut
            })

            .call(() => {
                document.querySelector('#grid-niveau-3 .nav i').style.animation = 'pulse 0.6s infinite cubic-bezier(0.66, 0, 0, 1)'
            })

            .staggerTo('#grid-niveau-3 .competences li', 0.3, {
                    opacity: 0,
                    x: 20,
                    ease: Power3.easeOut
            }, 0.1, '+=3.5')

            .to('#grid-niveau-3 .nav', 0.6, {
                y: 120,
                opacity: 0,
                ease: Power1.easeOut
            }, '+=3')

            .to('#grid-niveau-3 .competences h5', 0.4, {
                opacity: 0,
                x: 20,
                ease: Power3.easeOut
            })

            .to('#grid-niveau-3 .competences', 0.6, {
                scaleX: 0,
                transformOrigin: 'right top',
                x: 20,
                ease: Power3.easeOut
            })

            .to('#back-grid', 0.6, {
                opacity: 0,
                ease: Power3.easeOut
            })

            /* ______________________________________________*/
            //             CHANGE FOND 
            .call(() => {
                this.changeBg(3)
            })
            /* ______________________________________________*/

            .to('body', 4, {
                backgroundColor: "#1f1f1f",
                ease: Power3.easeOut
            },)

            .to('#back-grid', 0.6, {
                opacity: 1,
                ease: Power3.easeOut
            }, '-=4')
            // #########################################
            // 3 ECRAN
            // #########################################

            .to('.ref-1 > div', 2, {
                css: {
                    color: "#ffffff"
                },
                ease: Power3.easeOut
            }, '-=4')

            .to('.ref-3 > div', 2, {
                css: {
                    color: "#ffffff"
                },
                ease: Power3.easeOut
            }, '-=3.8')

            .to('.ref-2 ul', 2, {
                css: {
                    color: "#ffffff"
                },
                ease: Power3.easeOut
            }, '-=3.6')

            .to('#grid-niveau-4', 0.2, {
                opacity: 1,
                ease: Power3.easeOut
            }, '-=3.4')

            .from('#grid-niveau-4 .works', 0.6, {
                scaleX: 0,
                transformOrigin: 'left top',
                x: -20,
                ease: Power3.easeOut
            }, '-=3')

            .from('#grid-niveau-4 .works h5', 0.4, {
                opacity: 0,
                x: -10,
                ease: Power3.easeOut
            }, '-=2.7')

            .staggerFrom('#grid-niveau-4 .works li', 0.3, {
                opacity: 0,
                x: -10,
                ease: Power3.easeOut
            }, 0.1, '-=2.5')

            .from('#grid-niveau-4 .nav', 0.8, {
                y: -40,
                opacity: 0,
                ease: Power2.easeOut
            }, '-=2.5')

            .call(() => {
                document.querySelector('#grid-niveau-4 .nav i').style.animation = 'pulse 0.6s infinite cubic-bezier(0.66, 0, 0, 1)'
            })

            .staggerTo('#grid-niveau-4 .works li', 0.3, {
                opacity: 0,
                x: 20,
                ease: Power3.easeOut
            }, 0.1, '+=1.5')

            .to('#grid-niveau-4 .nav', 0.6, {
                y: 120,
                opacity: 0,
                ease: Power1.easeOut
            })

            .to('#grid-niveau-4 .works h5', 0.4, {
                opacity: 0,
                x: 20,
                ease: Power3.easeOut
            })

            .to('#grid-niveau-4 .works', 0.6, {
                scaleX: 0,
                transformOrigin: 'right top',
                x: 20,
                ease: Power3.easeOut
            })

            .to('#back-grid', 0.4, {
                opacity: 0,
                ease: Power3.easeOut
            })

            .to('body', 4, {
                backgroundColor: "#394dd0",
                ease: Power3.easeOut
            })

            .call(() => {
                this.modifZindex()
            })
            // #########################################
            // 4 ECRAN
            // #########################################

            /* ______________________________________________*/
            //             CHANGE FOND 
            .call(() => {
                this.changeBg(4)
            })
            /* ______________________________________________*/
            
            .to('#grid-niveau-5', 0.6, {
                    opacity: 1,
                    ease: Power3.easeOut
                },)

                /*.to('#back-grid', 0.6, {
                    opacity: 0.2,
                    ease: Power3.easeOut
                }, '-=3')*/

                .from('#grid-niveau-5 .contact', 0.6, {
                    scaleX: 0,
                    transformOrigin: 'left top',
                    x: -20,
                    ease: Power3.easeOut
                }, '-=0.2')

                .from('#grid-niveau-5 .contact h5', 0.4, {
                    opacity: 0,
                    x: -10,
                    ease: Power3.easeOut
                })

                .staggerFrom('#grid-niveau-5 .contact p span', 0.3, {
                    opacity: 0,
                    x: -10,
                    ease: Power3.easeOut
                }, 0.3)

                .to('#back-grid', 0.6, {
                    opacity: 1,
                    ease: Power3.easeOut
                })
                .to('#back-grid', 0.6, {
                    opacity: 1,
                    ease: Power3.easeOut
                }, '+=1')

                
        this.mainTL.add(this.timeline, 0)

    }
}
