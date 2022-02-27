import { prohibited as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const prohibited = (value, { field = null, message = null }) => {
    const isValid = !field || !data.hasOwnProperty(field) || isEmpty(value)

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $field: field })
}

export default prohibited

export const tests = () => {

}