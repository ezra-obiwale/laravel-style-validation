import { notRegex as defaultMessage } from '../messages'
import { parseMessage, regexFromString } from '../utils'

export default notRegex = (value, { message = null, params = [] }) => {
    const regex = regexFromString(params[0])

    const isValid = !regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export const tests = () => {

}