import accepted from './accepted'
import { accepted as acceptedMessage, declined as declinedMessage } from '../messages'
import { arrayToObject, parseMessage } from '../utils'

export default acceptedIf = (value, { data = {}, message = null, params = [] }) => {
    params = arrayToObject(params)

    let acceptable = true

    for (let targetField in params) {
        acceptable = params[targetField] == data[targetField]

        if (!acceptable) {
            break
        }
    }

    const isValid = accepted(value, { message })

    if (!acceptable && isValid === true) {
        return parseMessage(message, declinedMessage)
    }

    if (acceptable && isValid !== true) {
        return parseMessage(message, acceptedMessage)
    }

    return true
}

export const tests = () => {

}