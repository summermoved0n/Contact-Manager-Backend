const configuredBaseUrl = process.env.BASE_URL;

const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Contact Manager Backend API",
    version: "1.0.0",
    description:
      "API documentation for the Contact Manager backend. Frontend: https://summermoved0n.github.io/Contact-Manager-Frontend/",
  },
  servers: [
    ...(configuredBaseUrl
      ? [
          {
            url: configuredBaseUrl,
            description: "Configured backend URL",
          },
        ]
      : []),
    {
      url: "http://localhost:3210",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "Authentication, profile, and avatar routes",
    },
    {
      name: "Contacts",
      description: "Authenticated contact management routes",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Server error",
          },
        },
      },
      UserRegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            maxLength: 20,
            example: "Jane",
          },
          email: {
            type: "string",
            example: "user@example.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
        },
      },
      UserLoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            example: "user@example.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
        },
      },
      UserResponse: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "user@example.com",
          },
        },
      },
      AuthUserResponse: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "user@example.com",
          },
          name: {
            type: "string",
            example: "Jane",
          },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "jwt.token.value",
          },
          user: {
            $ref: "#/components/schemas/AuthUserResponse",
          },
        },
      },
      Contact: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "65f1f7e6c9f1b2a3d4e5f678",
          },
          name: {
            type: "string",
            example: "Jane Doe",
          },
          phone: {
            type: "string",
            example: "1234567890",
          },
          favorite: {
            type: "boolean",
            example: false,
          },
          owner: {
            type: "string",
            example: "65f1f7e6c9f1b2a3d4e5f678",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      ContactCreateRequest: {
        type: "object",
        required: ["name", "phone"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            maxLength: 20,
            example: "Jane Doe",
          },
          phone: {
            type: "string",
            maxLength: 10,
            example: "1234567890",
          },
        },
      },
      ContactUpdateRequest: {
        type: "object",
        minProperties: 1,
        properties: {
          name: {
            type: "string",
            minLength: 2,
            maxLength: 20,
            example: "Jane Smith",
          },
          phone: {
            type: "string",
            maxLength: 10,
            example: "1234567890",
          },
        },
      },
      FavoriteRequest: {
        type: "object",
        required: ["favorite"],
        properties: {
          favorite: {
            type: "boolean",
            example: true,
          },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      NotFound: {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
  paths: {
    "/api/users/register": {
      post: {
        tags: ["Users"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserRegisterRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/UserResponse",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Email in use",
          },
        },
      },
    },
    "/api/users/login": {
      post: {
        tags: ["Users"],
        summary: "Log in a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserLoginRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthResponse",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
    },
    "/api/users/current": {
      get: {
        tags: ["Users"],
        summary: "Get current authenticated user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Current user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserResponse",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
    },
    "/api/users/logout": {
      post: {
        tags: ["Users"],
        summary: "Log out current user",
        security: [{ bearerAuth: [] }],
        responses: {
          204: {
            description: "Logged out successfully",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
    },
    "/api/users/avatars": {
      patch: {
        tags: ["Users"],
        summary: "Update user avatar",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  avatarURL: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Avatar updated",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
    },
    "/api/contacts": {
      get: {
        tags: ["Contacts"],
        summary: "Get contacts",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              default: 20,
            },
          },
          {
            name: "favorite",
            in: "query",
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          200: {
            description: "Contacts list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Contact",
                  },
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
      post: {
        tags: ["Contacts"],
        summary: "Create contact",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ContactCreateRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Contact created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
    },
    "/api/contacts/{id}": {
      get: {
        tags: ["Contacts"],
        summary: "Get one contact",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Contact details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
        },
      },
      put: {
        tags: ["Contacts"],
        summary: "Update contact",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ContactUpdateRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Contact updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
        },
      },
      delete: {
        tags: ["Contacts"],
        summary: "Delete contact",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Contact deleted",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
        },
      },
    },
    "/api/contacts/{id}/favorite": {
      patch: {
        tags: ["Contacts"],
        summary: "Update contact favorite status",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FavoriteRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Favorite status updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
        },
      },
    },
  },
};

export default swaggerDocument;
