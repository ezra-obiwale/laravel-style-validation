import { prohibits as defaultMessage } from '../../messages'
import { chooseMessage, isEmpty } from '../../utils'

const prohibits = (value, options = {}) => {
    const { data = {}, message = null, messageParser, params = [] } = options
    const prohibitable = !isEmpty(value)

    if (!prohibitable) {
        return true
    }

    let isValid = true
    let targetField

    for (targetField of params) {
        isValid = !data.hasOwnProperty(targetField)

        if (!isValid) {
            break
        }
    }

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $otherfield: targetField }, messageParser)
}

export default prohibits
