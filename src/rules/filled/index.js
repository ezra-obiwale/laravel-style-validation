import { filled as defaultMessage } from '../../messages';
import { chooseMessage, isEmpty } from '../../utils';

const filled = (value, options = {}) => {
    const { message, messageParser } = options;
    const isValid = !isEmpty(value);

    if (isValid) {
        return true;
    }

    return chooseMessage(message, defaultMessage, {}, messageParser);
};

export default filled;
