import { regex as defaultMessage } from '../messages'
import { parseMessage, regexFromString } from '../utils'

const regex = (value, { message = null, params = [] }) => {
    const regex = regexFromString(params[0])

    const isValid = regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default regex

export const tests = () => {

}