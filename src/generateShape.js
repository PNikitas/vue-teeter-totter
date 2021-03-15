import { v4 } from 'uuid';

import {MIN_WEIGHT, MAX_WEIGHT} from '@/helpers/constants';

export default () => {
    const id = v4();

    const types = ['circle', 'square', 'triangle'];
    const type = types[Math.floor(Math.random() * types.length)];

    const shapePositionX = Math.floor(Math.random() * 20) * 10;

    const colors = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    const weight = Math.floor(Math.random() * MAX_WEIGHT) + MIN_WEIGHT;
    const size = weight * 5 + 15;

    const style = {
        'width': type === 'triangle' ? '0' : `${size}px`,
        'height': type === 'triangle' ? '0' : `${size}px`,
        'font-size': type === 'triangle' ? (weight === 10 ? '28px' : `${size - 12}px`) : `${size - 5}px`,
        'line-height': type === 'triangle' ? (weight === 10 ? '80px' : `${size + 6}px`) : `${size}px`,
        'font-weight': 'bold',
        'text-align': 'center',
        'text-indent': type === 'triangle' ? `${-(size - 12)/4}px` : '0',
        'border-width': type === 'triangle' ? `0 ${size / 2}px ${size}px ${size / 2}px` : '0',
        'border-style': 'solid',
        'border-color': type === 'triangle' ? `transparent transparent ${colors} transparent` : 'black',
        'border-radius': type === 'circle' ? '50%' : '0%',
        'background': type === 'triangle' ? 'none' : colors,
        'box-shadow': type === 'triangle' ? 'inset 0 0 0 2px black' : 'none',
    };

    return {id, type, shapePositionX, weight, size, style};
};