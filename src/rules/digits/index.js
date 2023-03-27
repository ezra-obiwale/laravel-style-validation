import { digits as defaultMessage } from '../../messages';
import { chooseMessage } from '../../utils';

const digits = (value, options = {}) => {
    const { message = null, messageParser, params = [] } = options;
    const numberValue = Number(value);
    const length = Number(params[0]);

    const isValid = (`${ value }` === `${ numberValue }`) &&
        `${ value }`.length === length;

    if (isValid) {
        return true;
    }

    return chooseMessage(message, defaultMessage, { $value: params[0] }, messageParser);
};

export default digits;
