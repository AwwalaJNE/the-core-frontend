import { extend } from 'vee-validate';
import { required, email, min, min_value, numeric } from 'vee-validate/dist/rules';

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

