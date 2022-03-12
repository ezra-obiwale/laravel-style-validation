# API

## validate()

> Validates a single value

```javascript
import { validate } from '@ezraobiwale/laravel-style-validation'

const parameters = [
  // ...
]
const isValid = validate(...parameters)
```

### Parameters

- `<any> value` (required): The value to be validated

- `<string|array> rules` (required): The rules to validate the given value with.

  > `string`: 'required|same:another_field'\
  > `array`: ['required', 'same:another_field']

  See [available rules](./rules.md)

- `<string|null|false> message` (optional): The custom error message to return if validation fails

  > `string`: The error message to return\
  > `null`: Returns the default error message\
  > `false`: Returns false

- `<object> data` (optional): The data containing all field values

  > Required when validation requires comparison with another field. For example, `same:another_field`.

- `<string> field` (optional): The data key holding the value being validated.

  > Required in rules like `present`.

### Return value

`<string|false>`

> `string`: Rule default message if no message parameter is provided or the parameter is `null`\
> `string`: Custom message if message parameter is a `string`\
> `false`: If message parameter is `false`

See [usage examples](./guide.md#validate-a-single-value)

## validateData()

> Validates a data object

```javascript
import { validateData } from '@ezraobiwale/laravel-style-validation'

const parameters = [
  // ...
]
const isValid = validateData(...parameters)

// Signature: validateData(<object> data, <object> rules[, <object|false> messages])
```

### Parameters

- `<object> data` (required): The data containing all field values to validate

- `<object> rules` (required): The object of field to rules

  ```javascript
  {
    username: 'required|alpha_dash',
    password: 'required',
    password_confirmation: 'required|same:password'
  }
  ```

- `<object|false> messages` (optional): The custom error messages for each field to return if validation fails

  ```javascript
  // object
  {
    username: {
      alpha_dash: false, // Return false if this rule fails
      // ...
    },
    password: {
      required: 'You must provide a password',
      // ...
    }
    // ...
  }
  ```

  > `false`; All failed validations would return false

### Return value

`<object>`

```javascript
// object

{
  username: true, // validation passes
  password: 'Value is required', // fails with message omitted or null
  password_confirmation: false, // fails with message parameter as FALSE
}
```

See [usage examples](./guide.md#validate-a-data-object)

## asFunctionArray()

> Converts a string of rules to the appropriate functions by calling [asFunction](#asfunction) on each rule group.

- `asFunctionArray(<string|array> rules[, <object> messages, <object> data, <string> field])`

  ```javascript
  import { asFunctionArray } from '@ezraobiwale/laravel-style-validation'

  const parameters = [
    // ...
  ]

  const functionArray = asFunctionArray(...parameters)
  ```

### Parameters

- `<string|array> rules` (required): The rules to turn into functions

  > `string`: 'required|same:another_field'\
  > `array`: ['required', 'same:another_field']

- `<object|false> messages` (optional): The custom error messages for each rule to return if validation fails

  ```javascript
  // object
  {
    required: 'Some custom message to return if this rule fails',
    alpha_dash: false, // Return false if this rule fails
    // ...
  }
  ```

  > `false`; All failed validations would return false

- `<object> data` (optional): The data containing all field values

  > Required when validation requires comparison with another field. For example, `same:another_field`.

- `<string> field` (optional): The data key holding the value to be validated.

  > Required in rules like `present`.

### Return value
> An array of functions where each is the return value of [asFunction](#asfunction).

See [usage examples](./guide.md#convert-string-rules-to-array)

## asFunction()

>  Converts a string of rule group to a function which takes just the value as the parameter.

- `asFunction(<string> ruleGroup[, <object> options])`

  > The options object would be passed onto the rule function with an addition of `params` which holds the parameters applied to the rule.

  ```javascript
  import { asFunction } from '@ezraobiwale/laravel-style-validation'

  const parameters = [
    // ...
  ]

  const ruleFunc = asFunction(...parameters)
  ```

### Parameters

- `<string> ruleGroup` (required): The rule and its parameters

  > Example: `'between:2000,2050'`

- `<object> options` (optional): The options for the rule

  ```javascript
  // object
  {
    // object: the data object
    data,
    // string: the data key holding the value to be validated
    field,
    // string|false: The custom message if validation fails
    message,
     // function: A function which receive the string error message
     // and an object of param to value to apply on the message.
     // The function should return a string of ready to use message.
    messageParser,
  }
  ```

### Return value

`<function>`

> The function takes only one parameter which is the value to validate.

See [usage examples](./guide.md#convert-string-rule-group-to-function)

## rulesAsFunctionArray()

> Converts an object of field to rules to the appropriate functions by calling [asFunction](#asfunctionarray) on each rule set.

  ```javascript
  import { rulesAsFunctionArray } from '@ezraobiwale/laravel-style-validation'

  const parameters = []

  const rules = rulesAsFunctionArray(...parameters)
  ```

### Parameters

- `<object> rules` (required): The object of field to rules

  ```javascript
  {
    username: 'required|alpha_dash',
    password: 'required',
    password_confirmation: 'required|same:password'
  }
  ```

- `<object|false> messages` (optional): The custom error messages for each field to return if validation fails

  ```javascript
  // object
  {
    username: {
      alpha_dash: false, // Return false if this rule fails
      // ...
    },
    password: {
      required: 'You must provide a password',
      // ...
    }
    // ...
  }
  ```

  > `false`; All failed validations would return false

- `<object> data` (optional): The data containing all field values to validate

### Return value

`<object>`

```javascript
// object

/*
{
  username: [function, function],
  password: [function],
  password_confirmation: [function, function],
}
*/
```

See [usage examples](./guide.md#create-rules-object-of-functions)

## customRule()

> Adds a custom rule, which does not already exist as an in-built rule.

```javascript
import { customRule, validate } from '@ezraobiwale/laravel-style-validation'

const allowedOptions = (value, options) => {
  // implement
}

// register the rule
customRule('allowed_options', allowedOptions)
```

### Parameters

- `<string> name` (required): The name of the rule as it should be used for valdiations

- `<function> validator` (required): The function to be executed when validating a value

  - Parameters are `<any> value` and `<object> options`

    ```javascript
    // options
    {
        // object: the data object
        data,
        // string: the data key holding the value to be validated
        field,
        // string|null|undefined|false: The custom message if validation fails
        message,
        // function: A function which receive the string error message
        // and an object of param to value to apply on the message.
        // The function should return a string of ready to use message.
        messageParser,
        // array: parameters applied to the rule
        params,
        // array: rule names applied to the field
        rules,
    }
    ```

See [usage examples](./guide.md#create-custom-rules)

## setMessageParser()

> Overrides the default message parser.

```javascript
import { setMessageParser } from '@ezraobiwale/laravel-style-valdiation'

const parameters = [
  // ...
]

setMessageParser(...parameters)
```

### Parameters

- `<function> parser` (required)

  ```javascript
  // function

  (message, params) => parsedMessage
  ```
  - `<string> message`: The message to parse

    > `':firsttoken is a good message for :anothertoken'`

  - `<object> params`: Object of token to value where the tokens need to be replaced in the message with the values.

    ```javascript
    { firsttoken: 'Some value', anothertoken: 'Some other value' }
    ```

### Return value

`<undefined>`

The function returns nothing

See [usage examples](./guide.md#set-a-custom-message-parser)

## resetMessageParser()

> Resets the message parser to the default parser function.

```javascript
import { resetMessageParser } from '@ezraobiwale/laravel-style-valdiation'

const parameters = [
  // ...
]

resetMessageParser(...parameters)
```

### Parameters

> The function has no parameters

### Return value

`<undefined>`

The function returns nothing

See [usage examples](./guide.md#reset-to-default-message-parser)
