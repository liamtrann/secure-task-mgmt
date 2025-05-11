# 🛠️ Task Management Platform – Fullstack Monorepo

A fullstack GraphQL-based task management platform with PostgreSQL, role-based access control, and reusable shared libraries. Built using a monorepo design to streamline frontend and backend development.

---

## 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/liamtrann/secure-task-mgmt
   cd secure-task-mgmt

2. Install dependencies:

    npm install

3. Create a .env file at the root level with the following variables to configure database and other environment settings:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=task_management

4. Start the entire project (frontend + backend)

    npm run dev

# # Architecture Overview

root/
├── apps/
│   ├── api/          # Backend – NestJS GraphQL server
│   └── dashboard/    # Frontend – React + TS dashboard
├── libs/
│   ├── auth/         # Role guard, permission management
│   └── data/         # Shared interfaces, DTOs, types
├── package.json      # Root script with dev/start commands
└── README.md

# Data Model

## Entities

### User
- `id: ID!` (Unique identifier)
- `name: String!`
- `email: String!`
- `role: Role!` (ADMIN, OWNER, or VIEWER)
- `organization: Organization!` (Associated organization)
- `password: String!` (Only used for input, not exposed in queries)

### Organization
- `id: ID!`
- `name: String!`

### Task
- `id: ID!`
- `title: String!`
- `description: String!`
- `category: String!`
- `status: TaskStatus!` (TODO, IN_PROGRESS, or DONE)
- `priority: TaskPriority` (HIGH, MEDIUM, or LOW - optional)
- `ownerId: String!` (Reference to User)
- `owner: User!` (Resolved user object)

### AuditEntry
- `userId: String!`
- `action: String!`
- `targetId: String` (Optional)
- `timestamp: String!`
- `metadata: String` (Optional)

## Enums

### Role
- ADMIN
- OWNER
- VIEWER

### TaskStatus
- TODO
- IN_PROGRESS
- DONE

### TaskPriority
- HIGH
- MEDIUM
- LOW

## Input Types

### CreateUserInput
- `name: String!`
- `email: String!`
- `password: String!`
- `role: Role!`
- `organizationId: String!`

### CreateTaskInput
- `title: String!`
- `description: String` (Optional)
- `category: String!`
- `status: String!`
- `priority: String` (Optional)
- `ownerId: String!`

### UpdateTaskInput
- `id: ID!`
- `title: String` (Optional)
- `description: String` (Optional)
- `category: String` (Optional)
- `status: String` (Optional)
- `priority: String` (Optional)
- `ownerId: String` (Optional)

### LoginInput
- `email: String!`
- `password: String!`

## Response Types

### LoginResponse
- `accessToken: String!`
- `user: User!`

