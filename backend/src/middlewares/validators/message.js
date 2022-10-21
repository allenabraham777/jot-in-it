import Joi from "joi";

const sendMessageSchema = Joi.object().keys({
  content: Joi.string().required().messages({
    "any.required": "Message content must be present",
  }),
});

const sendMessageValidator = (req, res, next) => {
  const { body } = req;
  const { error } = sendMessageSchema.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

export default {
  sendMessageValidator,
};
