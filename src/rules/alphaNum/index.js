import { alphaNum as defaultMessage } from '../../messages';
import { chooseMessage } from '../../utils';

const alphaNum = (value, options = {}) => {
    const { message, messageParser } = options;
    const isValid = /^[a-zA-Z0-9]+$/.test(`${ value }`);

    if (isValid) {
        return true;
    }

    return chooseMessage(message, defaultMessage, {}, messageParser);
};

export default alphaNum;
