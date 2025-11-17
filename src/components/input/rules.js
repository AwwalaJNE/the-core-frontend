import { extend } from 'vee-validate'
import {
    required,
    email,
    min,
    min_value,
    max_value,
    numeric,
    double,
} from 'vee-validate/dist/rules'

const phoneRule = {
    message: 'The {_field_} must be either a valid phone number',
    validate(value, args) {
        const REGEX = /^62\d{9,12}$/

        return REGEX.test(value)
    },
}

extend('phone', phoneRule)

// No message specified.
extend('email', email)

// Override the default message.
extend('required', {
    ...required,
    message: '{_field_} is required',
})

// Override the default message.
extend('min', min)

// Override the default message.
extend('min_value', min_value)

const maxlength = {
    getMessage(field, args) {
        return `${field} not valid`
    },
    validate(value, args) {
        return value.length > args ? false : true
    },
}

extend('maxlength', maxlength)

// Numeric
extend('numeric', numeric)

const decimal = {
    getMessage(field, args) {
        return `${field} not valid`
    },
    validate(value, args) {
        //  /^\d*\.?\d+$/
        //  /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/
        const REGEX = /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/

        return REGEX.test(value)
    },
}

extend('decimal', decimal)

const coordinate = {
    message: `{_field_} field don't have a valid coordinate`,
    validate(value, args) {
        const REGEX = /^[\-?\d\.?\,]{0,20}([\.?\,]\d{3})?$/

        return REGEX.test(value)
    },
}

extend('coordinate', coordinate)

const validString = {
    message: `{_field_} field don't have a valid input`,
    validate(value, args) {
        //regex ini validasi kata pertama hanya alphabet
        //dan kata2 setelah pertama bisa menggunakan sesuai di array kedua regex dengan \s berarti spasi atau white space
        //intinya supaya ga bisa special karakter untuk field string
        //tetap bisa spasi atau whitespace karena digunakan untuk address
        const REGEX = /^[a-zA-Z][a-zA-Z0-9\._-\s]+$/g

        return REGEX.test(value)
    },
}

extend('validString', validString)
