const userRegistrationSchema = require("../../schemas/userRegistrationSchema");

const validateRegistration = (req, res, next) => {
  userRegistrationSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errors = err.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return res.status(422).json({ errors });
    });
};

module.exports = validateRegistration;
