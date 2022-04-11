# Usage guide

## Validate a single value

See [signature](./api.md#validate).

```javascript
import { validate } from '@ezraobiwale/laravel-style-validation'

const username = 'ezra-obiwale'

validate(username, 'required|alpha_num') // TRUE
validate(username, ['required', 'alpha']) // "Value must only contain alphabets"
validate(username, 'required|alpha', false) // FALSE

const messages = {
  required: 'Please provide a username',
  alpha: 'Username can only be alphabets',
}
validate(username, 'required|alpha', messages) // "Username can only be alphabets"

const year = 2022
validate(year, ['required', 'numeric', 'between:2000,2050']) // TRUE

// With other data
validate(year, 'required|numeric|between:2000,2050|different:nextYear', null, { nextYear: 2023 }) // true

// For rules that require checking the field and not the value, provide the field as the last parameter
validate(year, 'present', false, { nextYear: 2023 }, 'year') // FALSE
```

## Validate a data object

See [signature](./api.md#validatedata).

```javascript
import { validateData } from '@ezraobiwale/laravel-style-validation'

const data = {
  username: 'ezra-obiwale',
  year: 2022,
  nextYear: 2023,
  ids: [1, 3, 5],
}

const rules = {
  username: 'required|alpha',
  year: ['required', 'numeric', 'between:2000,2050', 'different:nextYear'],
  ids: ['required', 'array'],
  'ids.*': ['required', 'numeric'],
}

validateData(data, rules)

// {
//     username: "Value must only contain alphabets",
//     year: true
// }

const messages = {
  username: {
    required: 'You must provide a username',
    alpha: 'Username can only be alphabets',
  },
  year: {
    required: 'Year cannot be empty',
    numeric: 'Year must be a number',
    between: 'Year must be between 2000, 2050',
    different: 'Year must not be 2023',
  },
  'ids.*': {
    required: 'ids must be provided',
    numeric: 'ids must be numbers',
  }
}

validateData(data, rules, messages)

// {
//     username: "Username can only be alphabets",
//     year: true,
//     ids: true,
//     'ids.*': true,
// }

const messages = {
  username: false, // disable error message for username only
  year: {
    required: 'Year cannot be empty',
    numeric: 'Year must be a number',
    between: 'Year must be between 2000, 2050',
    different: 'Year must not be 2023',
  },
}

validateData(data, rules, messages)

validateData(data, rules, false) // Disable error messages for all fields

// {
//     username: false,
//     year: true,
//     ids: true,
//     'ids.*': true,
// }
```


## Create custom rules

See [signature](./api.md#customrule).

```javascript
import { customRule, validate } from '@ezraobiwale/laravel-style-validation'

// define the rule
const allowedOptions = (value, { data, field, message, params, rules }) => {
  const isValid = params.includes(value)

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
  return 'Allowed parameters include ' + params.join(', ')
}

// Second parameter
{
    data, // Object contain all field to values
    field, // string
    message, // string (to override default)|null (to use default)|false(to simply return FALSE)
    params, // array of parameters applied to the rule
    rules // array of rule names applied to the field
}

// register the rule
customRule('allowed_options', allowedOptions)

// override existing custom rule
customRule('allowed_options', newAllowedOptions, true)

// use with other rules
validate('yes', 'allowed_options:yes,no,maybe|accepted') // TRUE
```

## Set a custom message parser

See [signature](./api.md#setmessageparser)

```javascript
import { setMessageParser } from '@ezraobiwale/laravel-style-validation'

const customParser = (message, params) => {
  let translatedMessage = trans(message)

  for (let tokenName in params) {
    const tokenValue = params[tokenName]
    const regex = new RegExp(tokenName, 'g')

    translatedMessage = translatedMessage.replace(regex, tokenValue)
  }

  return translatedMessage
}

setMessageParser(customParser)

// validation now uses the custom parser
```

## Reset to default message parser

See [signature](./api.md#resetmessageparser)

```javascript
import { resetMessageParser } from '@ezraobiwale/laravel-style-valdiation'

resetMessageParser()

// validation now uses the default parser
```