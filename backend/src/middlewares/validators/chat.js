import Joi from "joi";

const accessChatSchema = Joi.object().keys({
  userId: Joi.string().required().messages({
    "any.required": "userId is required",
  }),
});

const createGroupSchema = Joi.object().keys({
  users: Joi.array().items(Joi.string()).required().min(2).max(250).messages({
    "any.required": "users are required to create a group",
    "array.min": "Atleast 3 users are required to create a group",
    "array.max": "Max of 250 users allowed",
  }),
  name: Joi.string().required().messages({
    "any.required": "Group name is required to create a group",
  }),
});

const renameGroupSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "New group name is required to rename a group",
  }),
});

const addToGroupSchema = Joi.object().keys({
  user: Joi.string().required().messages({
    "any.required": "User required to add",
  }),
});

const accessChatValidator = (req, res, next) => {
  const { body } = req;
  const { error } = accessChatSchema.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

const createGroupChatValidator = (req, res, next) => {
  const { body } = req;
  const { error } = createGroupSchema.validate(body);

  if (error) {
    console.error(error);
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

const renameGroupChatValidator = (req, res, next) => {
  const { body } = req;
  const { error } = renameGroupSchema.validate(body);

  if (error) {
    console.error(error);
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

const addToGroupValidator = (req, res, next) => {
  const { body } = req;
  const { error } = addToGroupSchema.validate(body);

  if (error) {
    console.error(error);
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

export default {
  accessChatValidator,
  createGroupChatValidator,
  renameGroupChatValidator,
  addToGroupValidator,
};
