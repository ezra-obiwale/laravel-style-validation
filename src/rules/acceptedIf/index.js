import accepted from '../accepted';
import { arrayToObject } from '../../utils';

const acceptedIf = (value, options = {}) => {
    const { data = {}, params = [] } = options;
    const paramsObject = arrayToObject(params);

    let acceptable = true;

    for (let targetField in paramsObject) {
        acceptable = JSON.stringify(paramsObject[targetField]) === JSON.stringify(data[targetField]);

        if (!acceptable) {
            break;
        }
    }

    if (!acceptable) {
        return true;
    }

    return accepted(value, options);
};

export default acceptedIf;
