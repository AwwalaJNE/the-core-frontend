import { extend } from 'vee-validate';
import { required, email, min, numeric } from 'vee-validate/dist/rules';

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: '{_field_} is required'
});

// Override the default message.
extend('min_value', min);

// Numeric
extend('numeric', numeric);

