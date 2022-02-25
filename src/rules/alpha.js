import { alpha as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const alpha = (value, { message }) => {
    const isValid = /^[a-zA-Z]*$/.test(`${value}`)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default alpha

export const tests = () => {

}