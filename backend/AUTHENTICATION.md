# Authentication Module

This document provides detailed information about the authentication module implementation in the backend template.

## Overview

The authentication module provides complete user authentication functionality including:
- User registration
- User login/logout
- JWT token management (access and refresh tokens)
- Password reset functionality
- Email verification
- Secure password handling with bcrypt

## API Endpoints

### Public Endpoints (No Authentication Required)

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER",
    "isEmailVerified": false,
    "createdAt": "2025-10-24T10:00:00Z",
    "updatedAt": "2025-10-24T10:00:00Z"
  },
  "tokens": {
    "access": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires": "2025-10-24T10:15:00Z"
    },
    "refresh": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires": "2025-10-31T10:00:00Z"
    }
  }
}
```

#### POST /auth/login
Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe", 
    "role": "USER",
    "isEmailVerified": true,
    "createdAt": "2025-10-24T10:00:00Z",
    "updatedAt": "2025-10-24T10:00:00Z"
  },
  "tokens": {
    "access": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires": "2025-10-24T10:15:00Z"
    },
    "refresh": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires": "2025-10-31T10:00:00Z"
    }
  }
}
```

#### POST /auth/logout
Logout user by invalidating refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (204):** Empty response

#### POST /auth/refresh-tokens
Refresh access and refresh tokens using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "access": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires": "2025-10-24T10:15:00Z"
  },
  "refresh": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires": "2025-10-31T10:00:00Z"
  }
}
```

#### POST /auth/forgot-password
Send password reset email to user.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (204):** Empty response

#### POST /auth/reset-password
Reset user password using reset token.

**Query Parameters:**
- `token`: Reset password token (string, required)

**Request Body:**
```json
{
  "password": "newPassword123"
}
```

**Response (204):** Empty response

#### POST /auth/verify-email
Verify user email address using verification token.

**Query Parameters:**
- `token`: Email verification token (string, required)

**Response (204):** Empty response

### Protected Endpoints (Authentication Required)

#### POST /auth/send-verification-email
Send email verification link to authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (204):** Empty response

## Database Models

### User Model
```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            Role     @default(USER)
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
}
```

### Token Model
```prisma
model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        TokenType
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}
```

### Enums
```prisma
enum Role {
  USER
  ADMIN
}

enum TokenType {
  ACCESS
  REFRESH
  RESET_PASSWORD
  VERIFY_EMAIL
}
```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds configured via environment variables
- Passwords are never stored in plain text
- Password validation enforces minimum security requirements

### JWT Tokens
- Access tokens have short expiration times (default: 30 minutes)
- Refresh tokens have longer expiration times (default: 30 days)
- Tokens are stored in the database for validation and revocation
- Each token type serves a specific purpose (access, refresh, reset password, email verification)

### Token Management
- Refresh tokens are invalidated after use
- Reset password tokens are single-use and expire quickly
- Email verification tokens expire after a short period
- Tokens can be blacklisted for security

## Environment Configuration

Required environment variables:

```env
# JWT Configuration
JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# Email Configuration (for password reset and verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourapp.com
```

## Error Handling

The authentication module provides comprehensive error handling:

- **400 Bad Request**: Invalid input data, validation errors
- **401 Unauthorized**: Invalid credentials, expired tokens, authentication required
- **404 Not Found**: User not found, token not found
- **500 Internal Server Error**: Server errors

All errors follow a consistent format:
```json
{
  "code": 400,
  "message": "Invalid input data"
}
```

## Testing

The module includes comprehensive test coverage:

### Integration Tests (`auth.test.ts`)
- Tests all API endpoints
- Validates request/response formats
- Tests authentication and authorization
- Tests error scenarios

### Service Tests (`auth.service.test.ts`, `token.service.test.ts`)
- Tests business logic
- Tests token generation and validation
- Tests password handling
- Tests error conditions

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci
```

## Usage Examples

### Frontend Integration

#### Registration
```javascript
const response = await fetch('/v1/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();
// Store tokens for later use
localStorage.setItem('accessToken', data.tokens.access.token);
localStorage.setItem('refreshToken', data.tokens.refresh.token);
```

#### Login
```javascript
const response = await fetch('/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();
// Store tokens
localStorage.setItem('accessToken', data.tokens.access.token);
localStorage.setItem('refreshToken', data.tokens.refresh.token);
```

#### Making Authenticated Requests
```javascript
const response = await fetch('/v1/protected-endpoint', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  }
});
```

#### Token Refresh
```javascript
const response = await fetch('/v1/auth/refresh-tokens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    refreshToken: localStorage.getItem('refreshToken')
  })
});

const data = await response.json();
// Update stored tokens
localStorage.setItem('accessToken', data.access.token);
localStorage.setItem('refreshToken', data.refresh.token);
```

## Migration and Deployment

The authentication system is ready for production use:

1. **Database Migration**: Prisma schema changes will be automatically applied
2. **Environment Variables**: Configure all required environment variables
3. **Email Service**: Set up SMTP credentials for password reset and email verification
4. **Security**: Use strong JWT secrets and configure appropriate token expiration times

## Extension Points

The authentication module can be extended with:

- Social authentication (Google, Facebook, etc.)
- Two-factor authentication (2FA)
- Account lockout after failed login attempts
- Password strength policies
- Session management
- OAuth2 server functionality

All extensions should follow the existing patterns and maintain backward compatibility.