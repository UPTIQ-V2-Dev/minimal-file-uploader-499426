# API Specification

## Database Models

### Prisma Schema

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}
```

## Authentication Endpoints

---

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Invalid input data or email already exists", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-24T10:00:00Z","updatedAt":"2025-10-24T10:00:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-24T10:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-31T10:00:00Z"}}}

---

EP: POST /auth/login
DESC: Authenticate user with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"401":"Invalid email or password", "400":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-10-24T10:00:00Z","updatedAt":"2025-10-24T10:00:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-24T10:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-31T10:00:00Z"}}}

---

EP: POST /auth/logout
DESC: Logout user by invalidating refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"400":"Invalid refresh token", "404":"Token not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh-tokens
DESC: Refresh access and refresh tokens using refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}
ERR: {"401":"Invalid or expired refresh token", "400":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_200: {"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-24T10:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-31T10:00:00Z"}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"404":"User not found", "400":"Invalid email format", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset user password using reset token.
IN: query:{token:str!} body:{password:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired reset token", "400":"Invalid password format", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=reset_token_here" -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify user email address using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired verification token", "400":"Invalid token format", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verify_token_here"
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification link to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_204: {}

## User Management Endpoints

---

EP: POST /users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!} body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input data or email already exists", "401":"Unauthorized", "403":"Insufficient permissions", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Smith","role":"USER","isEmailVerified":false,"createdAt":"2025-10-24T10:00:00Z","updatedAt":"2025-10-24T10:00:00Z"}

---

EP: GET /users
DESC: Get paginated list of users with optional filtering.
IN: headers:{Authorization:str!} query:{name:str, role:str, sortBy:str, limit:int, page:int}
OUT: 200:{results:arr[obj], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "400":"Invalid query parameters", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-10-24T10:00:00Z","updatedAt":"2025-10-24T10:00:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /users/:userId
DESC: Get specific user by ID.
IN: headers:{Authorization:str!} params:{userId:int!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-10-24T10:00:00Z","updatedAt":"2025-10-24T10:00:00Z"}

---

EP: PATCH /users/:userId
DESC: Update user information.
IN: headers:{Authorization:str!} params:{userId:int!} body:{name:str, email:str, password:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input data or email already exists", "401":"Unauthorized", "403":"Insufficient permissions", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"John Updated"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Updated","role":"USER","isEmailVerified":true,"createdAt":"2025-10-24T10:00:00Z","updatedAt":"2025-10-24T10:05:00Z"}

---

EP: DELETE /users/:userId
DESC: Delete user account.
IN: headers:{Authorization:str!} params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {}

## File Upload Endpoints

---

EP: POST /api/upload/initiate
DESC: Initiate file upload and get signed URL.
IN: headers:{Authorization:str!} body:{fileName:str!, fileType:str!, fileSize:int!}
OUT: 200:{uploadId:str, signedUrl:str, fileUrl:str}
ERR: {"400":"Invalid file parameters", "401":"Unauthorized", "413":"File too large", "415":"Unsupported file type", "500":"Internal server error"}
EX_REQ: curl -X POST /api/upload/initiate -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"fileName":"document.pdf","fileType":"application/pdf","fileSize":1048576}'
EX_RES_200: {"uploadId":"upload-123-abc","signedUrl":"https://storage.com/upload-url","fileUrl":"https://storage.com/files/document.pdf"}

---

EP: POST /api/upload/complete
DESC: Complete file upload process.
IN: headers:{Authorization:str!} body:{uploadId:str!}
OUT: 200:{uploadId:str, fileUrl:str}
ERR: {"400":"Invalid upload ID", "401":"Unauthorized", "404":"Upload not found", "409":"Upload already completed", "500":"Internal server error"}
EX_REQ: curl -X POST /api/upload/complete -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"uploadId":"upload-123-abc"}'
EX_RES_200: {"uploadId":"upload-123-abc","fileUrl":"https://storage.com/files/document.pdf"}

## MCP (Model Context Protocol) Endpoints

---

EP: POST /mcp
DESC: Execute MCP operations with authentication.
IN: headers:{Authorization:str!} body:{operation:str!, data:obj}
OUT: 200:{result:obj, status:str}
ERR: {"400":"Invalid operation or data", "401":"Unauthorized", "403":"Insufficient permissions", "500":"Internal server error"}
EX_REQ: curl -X POST /mcp -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"operation":"process","data":{"input":"test"}}'
EX_RES_200: {"result":{"output":"processed"},"status":"success"}

---

EP: GET /mcp
DESC: Retrieve MCP status or data.
IN: headers:{Authorization:str!} query:{type:str, filter:str}
OUT: 200:{data:arr[obj], status:str}
ERR: {"401":"Unauthorized", "403":"Insufficient permissions", "400":"Invalid query parameters", "500":"Internal server error"}
EX_REQ: curl -X GET "/mcp?type=status" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"data":[{"id":"mcp-1","status":"active"}],"status":"success"}

---

EP: DELETE /mcp
DESC: Delete MCP resources or data.
IN: headers:{Authorization:str!} body:{resourceId:str!, type:str}
OUT: 200:{deleted:bool, resourceId:str}
ERR: {"400":"Invalid resource ID or type", "401":"Unauthorized", "403":"Insufficient permissions", "404":"Resource not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /mcp -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"resourceId":"mcp-1","type":"process"}'
EX_RES_200: {"deleted":true,"resourceId":"mcp-1"}