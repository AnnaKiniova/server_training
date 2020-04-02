const joi = require("@hapi/joi");

exports.getId = users => {
  let max = 0;
  users.map(key => {
    if (parseInt(key.id) > max) {
      max = key.id;
    }
  });
  return max + 1;
};

exports.validateData = input => {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required()
  });
  const result = schema.validate(input);
  return !result.error;
};
