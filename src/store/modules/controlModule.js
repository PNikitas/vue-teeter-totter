import {BOARD_LENGTH_PX, HORIZONTAL_SPEED} from '@/helpers/constants';

export default {
    state: {
        isPause: false,
        isSimulationOver: false,
        isAutoplay: false,
        isSimulationStart: false,
    },
    getters: {
        isPause: state => state.isPause,
        isSimulationOver: state => state.isSimulationOver,
        leftShapePosition: (state, rootGetters) => rootGetters.leftShape.shapePositionX,
        leftShapeSize: (state, rootGetters) => rootGetters.leftShape.size,
        isAutoplay: state => state.isAutoplay,
        isSimulationStart: state => state.isSimulationStart,
    },
    actions: {
        moveRight: ({ commit, getters, rootState }) => {
            if (getters.leftShapePosition < BOARD_LENGTH_PX / 2 - getters.leftShapeSize && !getters.isPause && !getters.isSimulationOver) {
                commit('updateLeftShapePosition', rootState.simulationModule.leftShape.shapePositionX += HORIZONTAL_SPEED, {root: true});
            }
        },
        moveLeft: ({ commit, getters, rootState }) => {
            if (getters.leftShapePosition > 0 && !getters.isPause && !getters.isSimulationOver) {
                commit('updateLeftShapePosition', rootState.simulationModule.leftShape.shapePositionX -= HORIZONTAL_SPEED, {root: true});
            }
        },
    },
    mutations: {
        updatePause: state => {
            state.isPause = !state.isPause;
        },
        updateSimulationOver: state => {
            state.isSimulationOver = !state.isSimulationOver;
        },
        updateAutoplay: state => {
            state.isAutoplay = !state.isAutoplay;
        },
        startSimulation: (state) => {
            state.isSimulationStart = true;
        }
    },
};
