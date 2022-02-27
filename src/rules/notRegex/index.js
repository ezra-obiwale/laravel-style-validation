import { notRegex as defaultMessage } from '../../messages'
import { chooseMessage, regexFromString } from '../../utils'

const notRegex = (value, { message = null, params = [] }) => {
    const regex = regexFromString(params[0])

    const isValid = !regex.test(`${value}`)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage)
}

export default notRegex

export const tests = () => {

}