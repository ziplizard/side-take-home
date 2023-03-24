const createHttpError = require('http-errors');
const validators = require('../validators');

module.exports = (validate) => {
  // If validate does not exist, throw err
  if (!validators.hasOwnProperty(validate))
    throw new Error(`'${validate}' validator does not exist`);

  return async (req, _res, next) => {
    try {
      const valid = await validators[validate].validateAsync(req.body);
      req.body = valid;
      next();
    } catch (err) {
      // If JOI validation error occurs call next with HTTP 422 Unprocessable Content
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message })); // 400 would be used if the request could not be parsed

      // Otherwise HTTP 500
      next(createHttpError(500)); // unknown whether user(4xx) or server(5xx) error; fail on the side of the server
    }
  };
};
