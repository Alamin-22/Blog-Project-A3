# Story Sync Blog Server - Backend

## Overview

This is a professional backend project built with **TypeScript**, **Express.js**, **Mongoose**, and **Zod**. The project follows a modular design pattern to ensure scalability, maintainability, and clean code.

---

🔗 Live API URL: [ https://story-sync-blog-server.vercel.app ]


## Prerequisites

Make sure you have the following installed:

- **Node.js** (latest stable version)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **TypeScript** as a development dependency

---

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository_url>
cd story_sync_blog2
```

### Step 2: Install Dependencies

```bash
# Install runtime dependencies
npm install express mongoose dotenv cors zod bcrypt cookie-parser http-status jsonwebtoken

# Install development dependencies
npm install -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcrypt eslint prettier
```

---

## Project Structure

```
story_sync_blog2/
├── src/
│   ├── app/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── Admin/
│   │   │   │   ├── admin.controller.ts
│   │   │   │   ├── admin.route.ts
│   │   │   │   ├── admin.service.ts
│   │   │   ├── Auth/
│   │   │   │   ├── auth.constant.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.interface.ts
│   │   │   │   ├── auth.route.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.utils.ts
│   │   │   │   ├── auth.validation.ts
│   │   │   ├── Blog/
│   │   │   │   ├── blog.constant.ts
│   │   │   │   ├── blog.controller.ts
│   │   │   │   ├── blog.interface.ts
│   │   │   │   ├── blog.model.ts
│   │   │   │   ├── blog.route.ts
│   │   │   │   ├── blog.service.ts
│   │   │   │   ├── blog.validation.ts
│   │   │   ├── User/
│   │   │   │   ├── user.constant.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.route.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.validation.ts
│   │   ├── routers/
│   │   │   ├── index.ts
│   │   ├── utils/
│   │   │   ├── catchAsync.ts
│   │   │   ├── sendResponse.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── README.md
```

---

## Configuration

### Environment Variables

Create a `.env` file in the project root and add the following:

```ini
PORT=5000
DATABASE_URL=mongodb://localhost:27017/story_sync_blog
JWT_SECRET=your_jwt_secret
```

---

## Running the Project

### Start the Development Server

```bash
npm run start:dev
```

### Start the Production Server

```bash
npm run start:prod
```

## Code Quality & Formatting

### Linting & Formatting

```bash
npm run lint      # Check lint errors
npm run lint:fix  # Fix lint errors
```

---

## Scripts in `package.json`

```json
"scripts": {
  "start:prod": "node ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix"
}
```

---

## License

This project is licensed under the ISC License.

---

## Author

Developed by Md. Al Amin Mollik.

