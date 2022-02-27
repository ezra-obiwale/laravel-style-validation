import { prohibits as defaultMessage } from '../../messages'
import { chooseMessage } from '../../utils'

const prohibits = (value, { data = {}, message = null, params = [] }) => {
    const prohibitable = !isEmpty(value)

    if (!prohibitable) {
        return true
    }

    let isValid = true
    let targetField

    for (targetField of params) {
        isValid = !data.hasOwnProperty(targetField) || isEmpty(data[targetField])

        if (!isValid) {
            break
        }
    }

    if (isValid) {
        return true
    }

    return chooseMessage(message, defaultMessage, { $otherfield: targetField })
}

export default prohibits

export const tests = () => {

}