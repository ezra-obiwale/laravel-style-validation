import { digits as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const digits = (value, { message = null, params = [] }) => {
    const floatValue = parseFloat(value)
    const intValue = parstInt(value)
    const length = parseInt(params[0])

    let isValid = (`${value}` === `${floatValue}` || `${value}` === `${intValue}`)

    if (params.length) {
        isValid = isValid && `${value}`.length === length
    }

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage, { $value: params[0] })
}

export default digits

export const tests = () => {

}