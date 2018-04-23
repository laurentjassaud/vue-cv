const state = {

    isFirstLoad: true,
    isMobile: false,
    isPortrait: true,
    isLandscape: false,
    windowSize: {},
    isModalOpen: false,
    bgArray: []

}

const getters = {

    isFirstLoad: state => state.isFirstLoad,
    isMobile: state => state.isMobile,
    isPortrait: state => state.isPortrait,
    isLandscape: state => state.isLandscape,
    windowSize: state => state.windowSize,
    isModalOpen: state => state.isModalOpen,
    bgArray: state => state.bgArray
}

const mutations = {

    SET_FIRST_LOAD(state, isFirstLoad){
        state.isFirstLoad = (typeof isFirstLoad !== 'undefined') ? isFirstLoad : true
    },

    SET_MOBILE(state, isMobile) {
        state.isMobile = (typeof isMobile !== 'undefined') ? isMobile : false
    },

    SET_PORTRAIT(state, isPortrait) {
        state.isPortrait = (typeof isPortrait !== 'undefined') ? isPortrait : true
    },

    SET_LANDSCAPE(state, isLandscape) {
        state.isLandscape = (typeof isLandscape !== 'undefined') ? isLandscape : false
    },

    SET_WINDOW_SIZE(state, windowSize) {
        state.windowSize = (typeof windowSize !== 'undefined') ? windowSize : {}
    },

    SET_MODAL(state, isModalOpen) {
        state.isModalOpen = (typeof isModalOpen !== 'undefined') ? isModalOpen : false
    },

    SET_BG_ARRAY(state, bgArray) {
        state.bgArray = (typeof bgArray !== 'undefined') ? bgArray : []
    }

}

const actions = {

    setFirstLoad: ({ commit }, isFirstLoad) => commit('SET_FIRST_LOAD', isFirstLoad),
    setMobile: ({ commit }, isMobile) => commit('SET_MOBILE', isMobile),
    setPortrait: ({ commit }, isPortrait) => commit('SET_PORTRAIT', isPortrait),
    setLandscape: ({ commit }, isLandscape) => commit('SET_LANDSCAPE', isLandscape),
    setWindowSize: ({ commit }, windowSize) => commit('SET_WINDOW_SIZE', windowSize),
    setModalOpen: ({ commit }, isModalOpen) => commit('SET_MODAL', isModalOpen),
    setBgArray: ({ commit }, bgArray) => commit('SET_BG_ARRAY', bgArray),

}

export default {

    state,
    getters,
    mutations,
    actions

}