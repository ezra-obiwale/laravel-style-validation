import declined from '../declined';
import { arrayToObject } from '../../utils';

const declinedIf = (value, options = {}) => {
    const { data = {}, params = [] } = options;
    const paramsObject = arrayToObject(params);

    let declinable = true;

    for (let targetField in paramsObject) {
        declinable = JSON.stringify(paramsObject[targetField]) === JSON.stringify(data[targetField]);

        if (!declinable) {
            break;
        }
    }

    if (!declinable) {
        return true;
    }

    return declined(value, options);

};

export default declinedIf;
