import { present as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const present = (value, { data = {}, field = null, message = null }) => {
    const isValid = field && data.hasOwnProperty(field)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $field: field })
}

export default present

export const tests = () => {

}