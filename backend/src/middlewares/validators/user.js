import Joi from "joi";

const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const userSignupSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  pic: Joi.string().allow("").allow(null).optional(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Password and Confirm password must match",
    "any.required": "Confirm password is required",
  }),
});

const loginValidator = (req, res, next) => {
  const { body } = req;
  const { error } = userLoginSchema.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

const signupValidator = (req, res, next) => {
  const { body } = req;
  const { error } = userSignupSchema.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

export default {
  loginValidator,
  signupValidator,
};
