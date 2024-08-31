const logger = require("../../config/logger");
const userRegistrationSchema = require("../../schemas/userRegistrationSchema");
const { logInfo } = require("../../utils/logInfo");

const validateRegistration = (req, res, next) => {
  logger.info(logInfo({ req }));
  userRegistrationSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => {
      const errors = err.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      logger.error(
        logInfo({
          req,
          errorMessage: JSON.stringify({ errors }),
          statusCode: 422,
        })
      );
      return res.status(422).json({ errors });
    });
};

module.exports = validateRegistration;
