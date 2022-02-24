# vuravel-validation
Vue validations, the Laravel way

## Installation

```javascript
yarn add @ezraobiwale/vuravel-validation
// or
npm install @ezraobiwale/vuravel-validation
```

## Usage

### Validate a single value

```javascript
import { validate } from '@ezraobiwale/vuravel-validation'

// Signature: validate(<any> value[, <string> rules, <string|null|false> message, <object> data, <string> field])

const username = 'ezra-obiwale'

validate(username, 'required|alpha_num') // TRUE
validate(username, 'required|alpha') // "Value must only contain alphabets"
validate(username, 'required|alpha', false) // FALSE

const messages = {
    required: 'Please provide a username',
    alpha: 'Username can only be alphabets'
}
validate(username, 'required|alpha', messages) // "Username can only be alphabets"

const year = 2022
validate(year, 'required|numeric|between:2000,2050') // TRUE

// With other data
validate(year, 'required|numeric|between:2000,2050|different:nextYear', null, { nextYear: 2023 }) // true

// For rules that require checking the field and not the value, provide the field as the last parameter
validate(year, 'present', false, { nextYear: 2023 }, 'year') // FALSE
```

### Validate a data object

```javascript
import { validateData } from '@ezraobiwale/vuravel-validation'

// Signature: validateData(<object> data, <object> rules[, <object|false> messages])

const data = {
    username: 'ezra-obiwale',
    year: 2022,
    nextYear: 2023
}

const rules = {
    username: 'required|alpha',
    year: 'required|numeric|between:2000,2050|different:nextYear',
}

validateData(data, rules)

// {
//     username: "Value must only contain alphabets",
//     year: true
// }

const messages = {
    username: {
        required: 'You must provide a username',
        alpha: 'Username can only be alphabets'
    },
    year: {
        required: 'Year cannot be empty',
        numeric: 'Year must be a number',
        between: 'Year must be between 2000, 2050',
        different: 'Year must not be 2023'
    }
}

validateData(data, rules, messages)

// {
//     username: "Username can only be alphabets",
//     year: true
// }

const messages = {
    username: false, // disable error message for username only
    year: {
        required: 'Year cannot be empty',
        numeric: 'Year must be a number',
        between: 'Year must be between 2000, 2050',
        different: 'Year must not be 2023'
    }
}

validateData(data, rules, messages)

validateData(data, rules, false) // Disable error messages for all fields

// {
//     username: false,
//     year: true
// }

```

### Helper functions

- `asArray(<string> rules[, <object> messages, <object> data, <string> field])`

    Converts a string of rules to the appropriate functions, which then takes just the value.

    ```javascript
    import { asArray } from '@ezraobiwale/vuravel-validation'

    asArray('required|numeric|between:2000,2050|different:nextYear')
    // [function, function, function, function]
    ```

    > Each function is a return value of `asFunction`.

- `asFunction(<string> ruleGroup[, <string> message, <object> data, <string> field
.])`

    Converts a rule group to a function which accepts the value to validate.

    ```javascript
    import { asFunction } from '@ezraobiwale/vuravel-validation'

    asFunction('between:2000,2050') // function
    ```

    > The returned function takes only one parameter which is the value to validate.

- `rulesAsArray(<object> rules[, <object> messages, <object> data])`

    Applies `asArray` to an object of field to rules.

    ```javascript
    import { rulesAsArray } from '@ezraobiwale/vuravel-validation'

    rulesAsArray({
        username: 'required|alpha',
        year: 'required|numeric|between:2000,2050|different:nextYear',
    })
    // {
    //    username: [function, function],
    //    year: [function, function, function, function]
    //}
    ```

## Rules and error messages

Rule                                            | Error message
------------------------------------------------|----------------------------------------------
`accepted`                                      | This must be accepted
`accepted_if`                                   | This must be accepted
`alpha`                                         | Value must only contain alphabets
`alpha_dash`                                    | Value must only contain alpha-numeric characters, dashes and underscores
`alpha_num`                                     | Value must only contain alpha-numeric characters
`array`                                         | Value must be an array
`between:min,max`                               | Value must be between [min] and [max]
`bool`                                          | Value must be a boolean
`boolean`                                       | Value must be a boolean
`declined`                                      | This must be declined
`declined_if`                                   | This must be declined
`different:otherfield`                          | Value must not be [otherfieldValue]
`digits:value`                                  | Value must be numeric and have an exact length of [value]
`digits_between:min,max`                        | Value must be numeric and have a length between [min] and [max]
`email`                                         | Value must be a valid email address
`ends_with:foo,bar,...`                         | Value must end with any of [foo, bar, ...]
`filled`                                        | Value must not be empty
`gt:otherfield`                                 | Value must be greater than [otherfieldValue]
`gte:otherfield`                                | Value must be greater than or equal to [otherfieldValue]
`in:foo,bar,...`                                | Value must be one of [foo, bar, ...]
`in_array:otherfield`                           | Value must exist in [foo, bar, ...]
`integer`                                       | Value must be an integer
`lt:otherfield`                                 | Value must be less than [otherfieldValue]
`lte:otherfield`                                | Value must be less than or equal to [otherfieldValue]
`max:value`                                     | Value must be less than or equal to [value]
`min:value`                                     | Value must be more than or equal to [value]
`not_in:foo,bar,...`                            | Value must not be one of [foo, bar, ...]
`not_regex:pattern`                             | Value is invalid
`nullable`                                      | -
`numeric`                                       | Value must be a number
`object[:foo,bar,...]`                          | Value must be an object [with keys [foo, bar, ...]]
`present`                                       | [field] is required
`prohibited`                                    | [field] is not allowed
`prohibited_if:otherfield,value,...`            | [field] is not allowed
`prohibited_unless:otherfield,value,...`        | [field] is not allowed
`prohibits:otherfield,...`                      | [otherfield] is not allowed
`regex:pattern`                                 | Value is invalid
`required`                                      | Value is required
`required_if:anotherfield,value,...`            | Value is required
`required_unless:anotherfield,value,...`        | Value is required
`required_with:anotherfield,...`                | Value is required
`required_with_all:anotherfield,...`            | Value is required
`required_without:anotherfield,...`             | Value is required
`required_without_all:anotherfield,...`         | Value is required
`same:otherfield`                               | Value must be [otherfieldValue]
`starts_with:foo,bar,...`                       | Value must starts with any of [foo, bar, ...]
`string`                                        | Value must be a string
`url`                                           | Value must be a valid url
`uuid`                                          | Value must a valid uuid

### Custom rules

Rules that are not created by default can be added and used like regular rules.

```javascript
import { customRule, validate } from '@ezraobiwale/vuravel-validation'

// define the rule
const allowedOptions = (value, { field, message, options = [], data = {} }) => {
    const isValid = options.includes(value)

    // valiation passes
    if (isValid) {
        return true
    }

    // validation fails and message is disabled
    if (message === false) {
        return false
    }

    // validation failed and custom message exists
    if (message) {
        return message
    }

    // validation failed: return default message
    return 'Allowed options include ' + options.join(', ')
}

// register the rule
customRule('allowed_options', allowedOptions)

// use with other rules
validate('yes', 'allowed_options:yes,no,maybe|accepted') // TRUE
```