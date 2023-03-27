import { url as defaultMessage } from '../../messages';
import { chooseMessage } from '../../utils';

const url = (value, options = {}) => {
    const { message, messageParser } = options;
    const isValid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value);

    if (isValid) {
        return true;
    }

    return chooseMessage(message, defaultMessage, {}, messageParser);
};

export default url;
