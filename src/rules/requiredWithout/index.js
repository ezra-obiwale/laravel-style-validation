import required from '../required';
import { isEmpty } from '../../utils';

const requiredWithout = (value, options = {}) => {
    const { data = {}, params = [] } = options;
    let isRequired = false;

    for (let targetField of params) {
        isRequired = isEmpty(data[targetField]);

        if (isRequired) {
            break;
        }
    }

    if (!isRequired) {
        return true;
    }

    return required(value, options);
};

export default requiredWithout;
