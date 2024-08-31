const Yup = require(`yup`);
const {
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
} = require(`../utils/form.constants`);

const userRegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email(`Invalid email`)
    .required(`Email is required`)
    .min(
      EMAIL_MIN_LENGTH,
      `Email must be at least ${EMAIL_MIN_LENGTH} characters`
    )
    .max(
      EMAIL_MAX_LENGTH,
      `Email must be within ${EMAIL_MAX_LENGTH} characters`
    ),
  password: Yup.string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `Password must be within ${PASSWORD_MAX_LENGTH} characters`
    )
    .required(`Password is required`),
  firstName: Yup.string()
    .required(`First name is required`)
    .min(
      FIRST_NAME_MIN_LENGTH,
      `First name must be at least ${FIRST_NAME_MIN_LENGTH} characters`
    )
    .max(
      FIRST_NAME_MAX_LENGTH,
      `First name must be within ${FIRST_NAME_MAX_LENGTH} characters`
    ),
  lastName: Yup.string()
    .required(`Last name is required`)
    .min(
      LAST_NAME_MIN_LENGTH,
      `Last name must be at least ${LAST_NAME_MIN_LENGTH} characters`
    )
    .max(
      LAST_NAME_MAX_LENGTH,
      `Last name must be within ${LAST_NAME_MAX_LENGTH} characters`
    ),
});

module.exports = userRegistrationSchema;
