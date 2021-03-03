import { extend } from 'vee-validate';
import { required, email, min, min_value, numeric, double } from 'vee-validate/dist/rules';

const phoneRule = {
  getMessage(field, args) {
    return `The ${field} must be either a valid phone number`;
  },
  validate(value, args) {

    const MOBILEREG = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g;

    return MOBILEREG.test(value);
  }
};

extend('phone', phoneRule);

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: '{_field_} is required'
});

// Override the default message.
extend('min', min);

// Override the default message.
extend('min_value', min_value);

// Numeric
extend('numeric', numeric);

const decimal = {
  getMessage(field, args) {
    return `${field} not valid`;
  },
  validate(value, args) {
    //  /^\d*\.?\d+$/
    //  /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/
    const MOBILEREG = /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/
    
    return MOBILEREG.test(value);
  }
};

extend('decimal', decimal);




