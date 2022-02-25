import declined from './declined'
import { declined as declinedMessage, accepted as acceptedMessage } from '../messages'
import { arrayToObject, parseMessage } from '../utils'

const declinedIf = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let declinable = true

    for (let targetField in params) {
        declinable = params[targetField] == data[targetField]

        if (!declinable) {
            break
        }
    }

    const isValid = declined(value, { message })

    if (!declinable && isValid === true) {
        return parseMessage(message, acceptedMessage)
    }

    if (declinable && isValid !== true) {
        return parseMessage(message, declinedMessage)
    }

    return true
}

export default declinedIf

export const tests = () => {

}