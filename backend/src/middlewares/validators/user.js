import Joi from "joi";

const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSignupSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  pic: Joi.string().allow("").allow(null).optional(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Password must match",
    "any.required": "Confirm password is required",
  }),
});

const loginValidator = (req, res, next) => {
  const { body } = req;
  const { error } = userLoginSchema.validate(body);

  if (error) {
    console.error(error);
    const err = new Error(error.details[0].message);
    throw err;
  }
  next();
};

const signupValidator = (req, res, next) => {
  const { body } = req;
  console.log(body);
  const { error } = userSignupSchema.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    throw err;
  }
  next();
};

export default {
  loginValidator,
  signupValidator,
};
