import joi from 'joi'; // Import Joi for schema validation

// Function to validate user registration data
function validateRegisterUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(6).max(20).required(), // Username must be 6-20 characters long, trimmed, and required
    email: joi.string().trim().email().required(), // Email must be a valid format, trimmed, and required
    password: joi.string().trim().min(8).required(), // Password must be at least 8 characters, trimmed, and required
  });
  return schema.validate(obj); // Validate the input object against the schema
}

// Function to validate user login data
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().email().required(), // Email must be valid, trimmed, and required
    password: joi.string().trim().min(8).required(), // Password must be at least 8 characters, trimmed, and required
  });
  return schema.validate(obj); // Validate the input object against the schema
}

// Function to validate user update data
function validateUpdateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(20), // Username must be 2-20 characters long and trimmed (optional)
    password: joi.string().trim().min(8), // Password must be at least 8 characters and trimmed (optional)
    bio: joi.string(), // Bio can be any string (optional)
  });
  return schema.validate(obj); // Validate the input object against the schema
}

// Export validation functions for use in other parts of the application
export { validateRegisterUser, validateLoginUser, validateUpdateUser };
