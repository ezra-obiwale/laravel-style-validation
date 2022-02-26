import { uuid as defaultMessage } from '../messages'
import { parseMessage } from '../utils'

const uuid = (value, { message }) => {
    const isValid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(value)

    if (isValid) {
        return true
    }

    return parseMessage(message, defaultMessage)
}

export default uuid

export const tests = () => {

}