import array from '.'
import { array as defaultMessage } from '../../messages'

describe('array', () => {
    const customMessage = 'This is a custom message'

    test('valid', () => {
        expect(array([1, 2, 3]))
            .toBe(true)
        expect(array(['a', 'b', 'c']))
            .toBe(true)
    })

    test('invalid', () => {
        expect(array({ a: 1, arr: [] }))
            .toBe(defaultMessage)
        expect(array('This is a sentence', { message: customMessage }))
            .toBe(customMessage)
        expect(array(() => { }, { message: false }))
            .toBe(false)
    })
})