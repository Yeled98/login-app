# Login App - Ionic & Angular Web Application

This is a web application built with **Ionic** and **Angular**, designed as a demonstration to implement user authentication and management using a RESTful backend.

## Features

- **Authentication**: Login and logout with credential validation.
- **User Management**: Register, update, and retrieve user information.
- **Protected Routes**: Restricted access to specific routes using `AuthGuard`.
- **Responsive Design**: Interface built with Ionic for an optimized experience on both mobile and desktop devices.
- **Angular Reactive Forms**: Dynamic form handling with real-time validation and error feedback.

## Technologies

- **Frontend**: Angular 16, Ionic 7
- **Backend**: [Backend Login App](https://github.com/Yeled98/backend-login-app)
- **Services Used**:
  - **JWT Authentication**: Session management using `sessionStorage`.
  - **HTTP Client**: Communication with the backend for CRUD operations.

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment file:

   - Edit `src/environments/environment.ts` with the backend URL:
     ```typescript
     export const environment = {
       production: false,
       api: "https://<backend-url>/api/",
     };
     ```

4. Start the development server:

   ```bash
   ionic serve
   ```

5. Access the application:
   - Navigate to `http://localhost:8100`.

## Key Functionalities

### Pages

1. **Home (`/home`)**

   - Public page with a welcome message.
   - Includes a button to navigate to the login form.

2. **Login (`/login`)**

   - Form with validations:
     - Email is required and must be valid.
     - Password is required and must have at least 6 characters.
   - Calls the authentication service to log in.

3. **Register (`/register`)**

   - Allows new users to register.

4. **Dashboard (`/dashboard`)**
   - Private page accessible only after authentication.
   - Automatic redirection when trying to access without a valid session.

### Services

- **AuthService**:
  - Handles authentication and session management.
  - Methods to log in and log out.
- **UserService**:
  - CRUD operations for registered users.

### Security

- `AuthGuard` to protect private routes.
- Secure storage of the JWT token in `sessionStorage`.

## Backend

The backend is available in the following repository:
[Backend Login App](https://github.com/Yeled98/backend-login-app)
