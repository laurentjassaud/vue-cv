import WebFont from 'webfontloader'

const fontAwesomeCustom = {
    families: ['Font Awesome 5 Free', 'Font Awesome 5 Brands'],
    urls: ['./assets/cssfont-awesome/fa-solid.scss', './assets/cssfont-awesome/fa-brands.scss']
}

const webFontsLoaderTool = (ref, fontAwesome = true, callback) => {
    
    let objFonts = {
        classes: false,
        google: {
            families: ref
        },
        async: false,
        active: () => {
            callback()
        }
    }

    if (fontAwesome) {
        objFonts.custom = fontAwesomeCustom
    }

    WebFont.load(objFonts)
}

export default webFontsLoaderTool