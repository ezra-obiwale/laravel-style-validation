import { different as defaultMessage } from '../../messages';
import { chooseMessage } from '../../utils';

const different = (value, options = {}) => {
    const { data = {}, message = null, messageParser, params = [] } = options;
    const otherfield = params[0];
    const otherfieldValue = data[otherfield];

    const isValid = value !== otherfieldValue;

    if (isValid) {
        return true;
    }

    return chooseMessage(message, defaultMessage, { $otherfieldValue: otherfieldValue }, messageParser);
};

export default different;