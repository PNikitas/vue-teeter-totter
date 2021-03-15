import generateShape from '@/generateShape';

export default {
    state: () => ({
        leftShape: generateShape(),
        rightShape: generateShape(),
        shapes: {leftShapes: [], rightShapes: []},
        totalWeight: {leftTotalWeight: 0, rightTotalWeight: 0},
        totalMomentum: {leftTotalMomentum: 0, rightTotalMomentum: 0},
        totalAllWeight: 0,
        shapesWeight: [],
        shapesPosition: [],
        angle: 0,
    }),
    getters: {
        leftShape: state => state.leftShape,
        rightShape: state => state.rightShape,
        shapes: state => state.shapes,
        totalWeight: state => state.totalWeight,
        totalMomentum: state => state.totalMomentum,
        totalAllWeight: state => state.totalAllWeight,
        shapesWeight: state => state.shapesWeight,
        shapesPosition: state => state.shapesPosition,
        angle: state => state.angle,
    },
    actions: {
        setLeftShapes: (context, newLeftShapes) => {
            context.commit('updateLeftShapes', newLeftShapes);
        },
        setRightShapes: (context, newRightShapes) => {
            context.commit('updateRightShapes', newRightShapes);
        },
        setLeftTotalWeight: (context, newLeftTotalWeight) => {
            context.commit('updateLeftTotalWeight', newLeftTotalWeight);
        },
        setRightTotalWeight: (context, newRightTotalWeight) => {
            context.commit('updateRightTotalWeight', newRightTotalWeight);
        },
        setLeftTotalMomentum: (context, newLeftTotalMomentum) => {
            context.commit('updateLeftTotalMomentum', newLeftTotalMomentum);
        },
        setRightTotalMomentum: (context, newRightTotalMomentum) => {
            context.commit('updateRightTotalMomentum', newRightTotalMomentum);
        },
        setTotalAllWeight: (context, newTotalAllWeight) => {
            context.commit('updateTotalAllWeight', newTotalAllWeight);
        },
        setShapesWeight: (context, newShapesWeight) => {
            context.commit('updateShapesWeight', newShapesWeight);
        },
        setShapesPosition: (context, newShapesPosition) => {
            context.commit('updateShapesPosition', newShapesPosition);
        },
        setAngle: (context, newAngle) => {
            context.commit('updateAngle', newAngle);
        },
    },
    mutations: {
        updateLeftShape: state => {
            state.leftShape = generateShape();
        },
        updateRightShape: state => {
            state.rightShape = generateShape();
        },
        updateLeftShapes: (state, newLeftShapes) => {
            state.shapes.leftShapes = [...state.shapes.leftShapes, newLeftShapes];
        },
        updateRightShapes: (state, newRightShapes) => {
            state.shapes.rightShapes = [...state.shapes.rightShapes, newRightShapes];
        },
        updateLeftTotalWeight: (state, newLeftTotalWeight) => {
            state.totalWeight.leftTotalWeight += newLeftTotalWeight;
        },
        updateRightTotalWeight: (state, newRightTotalWeight) => {
            state.totalWeight.rightTotalWeight += newRightTotalWeight;
        },
        updateLeftTotalMomentum: (state, newLeftTotalMomentum) => {
            state.totalMomentum.leftTotalMomentum += newLeftTotalMomentum;
        },
        updateRightTotalMomentum: (state, newRightTotalMomentum) => {
            state.totalMomentum.rightTotalMomentum += newRightTotalMomentum;
        },
        updateTotalAllWeight: (state, newTotalAllWeight) => {
            state.totalAllWeight = newTotalAllWeight;
        },
        updateShapesWeight: (state, newShapesWeight) => {
            state.shapesWeight = [...state.shapesWeight, newShapesWeight.leftShapeWeight, newShapesWeight.rightShapeWeight];
        },
        updateShapesPosition: (state, newShapesPosition) => {
            state.shapesPosition = [...state.shapesPosition, newShapesPosition.leftShapePosition, newShapesPosition.rightShapePosition];
        },
        updateLeftShapePosition: (state, newLeftShapePosition) => {
            state.leftShape.shapePositionX = newLeftShapePosition;
        },
        updateAngle: (state, newAngle) => {
            state.angle += newAngle;
        }
    },
};
