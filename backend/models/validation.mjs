import joi from 'joi'; // Import Joi for schema validation

// Function to validate user registration data
function validateRegisterUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(6).max(20).required(), // Username must be 6-20 characters long, trimmed, and required
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj); // Validate the input object against the schema
}

// Function to validate user login data
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Function to validate user update data
function validateUpdateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(20),
    password: joi.string().trim().min(8),
    bio: joi.string(), // Bio can be any string (optional)
  });
  return schema.validate(obj);
}


// Function to validate user update data
function validateCreatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(6).max(200).required(),
    description: joi.string().trim().min(8).required(),
    category: joi.string().trim().required(), // Bio can be any string (optional)
  });
  return schema.validate(obj);
}

// Function to validate user update data
function validateUpdatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(6).max(200),
    description: joi.string().trim().min(8),
    category: joi.string().trim(), // Bio can be any string (optional)
  });
  return schema.validate(obj);
}


// Function to validate comment data
function validateCreateComment(obj) {
  const schema = joi.object({
    postId: joi.string().required(),
    text: joi.string().trim().required()
  });
  return schema.validate(obj);
}

// Function to validate update comment
function validateUpdateComment(obj) {
  const schema = joi.object({
    text: joi.string().trim().required()
  });
  return schema.validate(obj);
}

export { validateRegisterUser, validateLoginUser, validateUpdateUser, validateCreatePost, validateUpdatePost, validateCreateComment, validateUpdateComment };
