import {BOARD_WIDTH_PX, BOARD_LENGTH_PX, LENGTH_MULTIPLIER, BOARD_INERTIA} from '@/helpers/constants';

export const assembleShape = (shape, startPositionX = null, shapePositionY = null) => {
    shape.startPositionX = startPositionX;
    shape.shapePositionY = shapePositionY;
    return shape;
};

export const calculateLandingPosition = (className, leftShape, angle) => {
    const boardBoundingRect = document.querySelector(className).getBoundingClientRect();
    const boardCenter = (boardBoundingRect.bottom - BOARD_WIDTH_PX * Math.cos(angle) - boardBoundingRect.top) / 2;

    return boardBoundingRect.top + boardCenter * (leftShape.shapePositionX / (BOARD_LENGTH_PX / 2)) - leftShape.size;
};

/* J = m * R^2 */
export const calculateInertia = (shapesWeight, shapesPosition) => {
    const mr2 = shapesWeight.map((item, index) => item * Math.pow(shapesPosition[index] / LENGTH_MULTIPLIER, 2));
    return mr2.reduce((acc, item) => acc + item);
};

/* E = M / J */
export const calculateAcceleration = (totalMomentum, inertia) => {
    return (totalMomentum.rightTotalMomentum - totalMomentum.leftTotalMomentum) / (inertia + BOARD_INERTIA);
};
