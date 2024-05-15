const userResponseSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'email'],
  properties: {
    _id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string' },
  },
};

const userCreateRequestSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'password'],
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 50,
      // pattern:
      //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$', // Regex for requiring at least one uppercase letter, one lowercase letter, one digit, and one special character
    },
    role: { type: 'string' },
  },
};

const userUpdateRequestSchema = {
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      role: { type: 'string' },
    },
  },
};

export const getAllUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: userResponseSchema,
    },
  },
};

export const getUserByIdSchema = {
  response: {
    200: userResponseSchema,
  },

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};

export const signupUserSchema = {
  response: {
    201: {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
  },

  body: userCreateRequestSchema,
};

export const loginUserSchema = {
  response: {
    202: {
      type: 'object',
      required: ['token'],
      properties: {
        token: { type: 'string' },
      },
    },
  },

  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
};

export const updateUserByIdSchema = {
  response: {
    201: {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
  },

  body: userUpdateRequestSchema,

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};
export const deleteUserByIdSchema = {
  response: {
    200: {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
  },

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
};
