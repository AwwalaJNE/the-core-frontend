import { extend } from 'vee-validate';
import { required, email, min, min_value, max_value, numeric, double } from 'vee-validate/dist/rules';

const phoneRule = {
  message: 'The {_field_} must be either a valid phone number',
  validate(value, args) {
    //   /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g;
    // /^(^\+62|62|^0)(\d{3,4}-?){2}\d{3,4}$/g
    const REGEX = /^[\+]?(\d{7,14})$/;

    return REGEX.test(value);
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

const maxlength = {
  getMessage(field, args) {
    return `${field} not valid`;
  },
  validate(value, args) {
    return value.length > args ? false : true;
  }
};

extend('maxlength', maxlength);

// Numeric
extend('numeric', numeric);

const decimal = {
  getMessage(field, args) {
    return `${field} not valid`;
  },
  validate(value, args) {
    //  /^\d*\.?\d+$/
    //  /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/
    const REGEX = /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/
    
    return REGEX.test(value);
  }
};

extend('decimal', decimal);

const coordinate = {
  message: `{_field_} field don't have a valid coordinate`,
  validate(value, args) {
    const REGEX = /^[\d\.?\,]{0,14}([\.?\,]\d{3})?$/
    
    return REGEX.test(value);
  }
};

extend('coordinate', coordinate);




