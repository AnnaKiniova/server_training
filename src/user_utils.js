const joi = require("@hapi/joi");

exports.createUser = (reqBody, users) => {
  console.log("in val 1");
  console.log(reqBody, users);
  if (validateData(reqBody)) {
    console.log("in val 2");
    const newUser = reqBody;
    newUser.id = getId(users);
    users.push(newUser);
    console.log(users);
    return true;
  }
  return false;
};

const getId = users => {
  let max = 0;
  users.map(key => {
    if (parseInt(key.id) > max) {
      max = key.id;
    }
  });
  return max + 1;
};

const validateData = input => {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required()
  });
  const result = schema.validate(input);
  return !result.error;
};
