import { regex as defaultMessage } from '../../messages';
import { chooseMessage, regexFromString } from '../../utils';

const regex = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options;
    const regex = regexFromString(params[0]);

    const isValid = regex.test(`${ value }`);

    if (isValid) {
        return true;
    }

    return chooseMessage(message, defaultMessage, {}, messageParser);
};

export default regex;
