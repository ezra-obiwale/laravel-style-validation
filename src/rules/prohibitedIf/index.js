import prohibited from '../prohibited';
import { arrayToObject } from '../../utils';

const prohibitedIf = (value, options = {}) => {
    const { data = {}, params = [] } = options;
    const paramsObject = arrayToObject(params);

    let prohibitable = true;

    for (let targetField in paramsObject) {
        prohibitable = JSON.stringify(data[targetField]) === JSON.stringify(paramsObject[targetField]);

        if (!prohibitable) {
            break;
        }
    }

    if (!prohibitable) {
        return true;
    }

    return prohibited(value, options);
};

export default prohibitedIf;
