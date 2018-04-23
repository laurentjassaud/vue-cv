import MobileDetect from 'mobile-detect'
import Breakpoints from './breakpoints'
import bowser from 'bowser'

export default class Detector {

    constructor() {
        this.ua = window.navigator.userAgent
        this.md = new MobileDetect(this.ua)
    }

    isWindow7() {
        return this.ua.indexOf('Windows NT 5.1') > 0
    }

    isOld() {
        if (bowser.msie && bowser.version < 10) {
            return true
        }

        if (bowser.safari && bowser.version < 8) {
            return true
        }

        return false
    }

    isMobile() {
        if (this.md.mobile()) {
            return true
        } else {
            return false
        }
    }

    isPhone() {
        return this.md.phone()
    }

    isTablet() {
        return this.md.tablet()
    }

    isChromeSimulator() {
        if (window.navigator.vendor) {
            return window.navigator.vendor.indexOf('Google Inc.') !== -1 && window.navigator.maxTouchPoints < 2
        } else {
            return
        }
    }

    is(test) {
        return this.md.is(test)
    }

    isLandscape() {
        return (Math.abs(window.orientation) === 90)
    }

    isPortrait() {
        return (Math.abs(window.orientation) === 0)
    }

    getScreenSize() {
        let isMobile = this.isMobile()
        let urlBar = this.getOffsetUrlBar()

        let size = {
            w: (isMobile) ? screen.width : window.innerWidth,
            h: (isMobile) ? window.innerHeight/* - urlBar */: window.innerHeight
        }

        if (isMobile && this.md.is('iOS')) {
            if (this.isLandscape()) {
                size = {
                    w: screen.height,
                    h: screen.width - urlBar
                }
            }
        }

        size.hW = size.w / 2
        size.hH = size.h / 2

        size.BP = this.getBreakpoint(size.w)
        return size
    }

    getOffsetUrlBar() {
        let offset = 0
        if (this.isChromeSimulator()) {
            return 0
        }
        if (this.md.is('AndroidOS')) {
            offset = (this.isLandscape()) ? 20 : 56
            // offset = 0
        } else if (this.md.is('iOS')) {
            if (this.md.is('Chrome')) {
                offset = 20
            } else {
                offset = (this.is('iPhone') && this.isLandscape()) ? 0 : 40
            }
        }
        return offset
    }

    getBreakpoint(w) {
        return Breakpoints.detect(w)
    }
}