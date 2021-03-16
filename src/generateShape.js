import {v4} from 'uuid';

import {MIN_WEIGHT, MAX_WEIGHT} from '@/helpers/constants';

export default () => {
    const id = v4();

    const types = ['circle', 'square', 'triangle'];
    const type = types[Math.floor(Math.random() * types.length)];

    const shapePositionX = Math.floor(Math.random() * 20) * 10;

    const colors = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    const weight = Math.floor(Math.random() * MAX_WEIGHT) + MIN_WEIGHT;
    const size = weight * 5 + 15;

    const _defaultStyle = ({size, colors}) => ({
        'width': `${size}px`,
        'height': `${size}px`,
        'font-size': `${size - 5}px`,
        'line-height': `${size}px`,
        'font-weight': 'bold',
        'text-align': 'center',
        'text-indent': '0',
        'border-width': '0',
        'border-style': 'solid',
        'border-color': 'black',
        'border-radius': '0%',
        'background': colors,
        'box-shadow': 'none',
    });

    const _triangleStyle = ({weight, size, colors}) => ({
        'width': '0',
        'height': '0',
        'font-size': (weight === 10 ? '28px' : `${size - 12}px`),
        'line-height': (weight === 10 ? '80px' : `${size + 6}px`),
        'text-indent': `${-(size - 12) / 4}px`,
        'border-width': `0 ${size / 2}px ${size}px ${size / 2}px`,
        'border-color': `transparent transparent ${colors} transparent`,
        'background': 'none',
        'box-shadow': 'inset 0 0 0 2px black',
    });

    const _circleStyle = ({}) => ({'border-radius': '50%'});

    const _emptyStyle = ({}) => {};

    const _specificStyle = {
        'circle': _circleStyle,
        'square': _emptyStyle,
        'triangle': _triangleStyle,
    };

    const getStyle = opts => ({
        ..._defaultStyle(opts),
        ..._specificStyle[opts.type](opts),
    });

    const style = getStyle({type, size, weight, colors});

    return {id, type, shapePositionX, weight, size, style};
};