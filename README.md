``
project-root
├── src/
│   ├── app.ts           // Initializes middleware, routes, etc.
│   ├── server.ts        // Bootstraps the server (e.g., connecting to DB, listening on a port)
│   ├── config/
│   │   └── index.ts     // Holds configuration (e.g., DB URI, port, JWT secret)
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.interface.ts      // Interfaces/types for authentication
│   │   │   ├── auth.controller.ts     // Handlers for /register and /login
│   │   │   ├── auth.route.ts          // Express routes for authentication
│   │   │   ├── auth.validation.ts     // Request payload validations (e.g., using Zod/Joi)
│   │   │   └── auth.service.ts        // Business logic for auth (e.g., token generation, password hashing)
│   │   ├── blog/
│   │   │   ├── blog.interface.ts      // Interfaces/types for blog posts
│   │   │   ├── blog.model.ts          // Mongoose schema and model for blogs
│   │   │   ├── blog.controller.ts     // Handlers for blog CRUD operations
│   │   │   ├── blog.route.ts          // Express routes for blog endpoints (public and protected)
│   │   │   ├── blog.validation.ts     // Request validations for creating/updating blogs
│   │   │   └── blog.service.ts        // Business logic for blog operations (e.g., searching, filtering)
│   │   ├── user/
│   │   │   ├── user.interface.ts      // Interfaces/types for user data
│   │   │   ├── user.model.ts          // Mongoose schema and model for users
│   │   │   ├── user.controller.ts     // Handlers for user-specific actions (if needed)
│   │   │   ├── user.route.ts          // Express routes for user-related endpoints
│   │   │   ├── user.validation.ts     // Validations for user updates, etc.
│   │   │   └── user.service.ts        // Business logic for user operations (e.g., blocking a user)
│   │   └── admin/
│   │       ├── admin.controller.ts    // Admin-specific actions (e.g., blocking users, deleting any blog)
│   │       ├── admin.route.ts         // Express routes for admin actions
│   │       └── admin.validation.ts    // Validations for admin actions if needed
├── .env
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── README.md
``