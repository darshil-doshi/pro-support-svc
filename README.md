# ProSupport

**ProSupport** is a support ticketing system built with **NestJS**, **MongoDB**, and **Auth0**. Designed as a SaaS starter project, it helps showcase scalable backend architecture for support-driven applications.

---

## 🚀 Features

- Auth0 Authentication and Role-based Access Control (RBAC)
- Ticket Type Templates (dynamic input fields per org)
- Support Ticket CRUD
- Subscription handled at Organization level
- Clean modular architecture (NestJS)
- Built with TypeScript & Mongoose ODM

---

## 🏗️ Tech Stack

- **Backend**: NestJS (TypeScript)
- **Database**: MongoDB (via Mongoose)
- **Auth**: Auth0 (JWT-based)
- **ORM**: Mongoose
- **Deployment-ready**: Docker & .env config

---

## 🧪 Project Structure

```
pro-support/
├── src/
│   ├── auth/             # Auth0 integration & JWT guards
│   ├── common/           # Shared interfaces, pipes, interceptors
│   ├── organizations/    # Org CRUD, subscription, onboarding
│   ├── tickets/          # Ticket CRUD
│   ├── ticket-types/     # Custom ticket templates per org
│   ├── users/            # User profile and roles within org
│   └── app.module.ts
├── test/                 # Unit & e2e tests
├── .env.example
└── README.md
```

---

## 🔐 Roles

| Role        | Permissions                       |
| ----------- | --------------------------------- |
| System Admin | Global control, analytics, config |
| Org Admin   | Manage org, users, ticket types   |
| Support     | Manage & resolve tickets          |
| Member      | Create/view own tickets           |

---

## 📦 Entities

### 🏢 Organization

- id
- name
- subscriptionPlan
- users[]

### 👤 User

- id
- email
- name
- role (scoped to org)

### 🧾 TicketType

- id
- orgId
- name (e.g. "Device Issue")
- description
- inputs: [ { label: string, type: "text" | "select" | "number", required: boolean, options?: string[] } ]

### 🎫 Ticket

- id
- orgId
- userId
- title
- description
- ticketTypeId
- status: "open" | "in\_progress" | "resolved" | "closed"
- inputs: { key: value }  // dynamic based on TicketType

---

## 🧭 PRD (Product Requirements Document)

### Objective

Build a modular, extensible support system backend that demonstrates clean SaaS architecture.

### Functional Requirements

- Admins can define ticket types with custom fields
- Users can raise tickets based on these types
- Auth0 handles login and user scoping per org
- CRUD operations for Tickets, TicketTypes, and Orgs
- RBAC restricts access to data and actions

### Non-Functional Requirements

- Code must follow SOLID principles
- Project should be modular and testable
- Scalable MongoDB design (indexes, references)
- Ready for deployment with Docker

### API Sample Endpoints

- `POST /ticket-types` → Create new template
- `POST /tickets` → Create ticket from template
- `GET /tickets` → List tickets (filtered by org + role)
- `PATCH /tickets/:id/status` → Update ticket status

---

## 🛠️ Setup

```bash
# Clone the repo
$ git clone https://github.com/your-username/pro-support.git
$ cd pro-support

# Install dependencies
$ npm install

# Set up .env
$ cp .env.example .env
# (Fill in Auth0 keys and MongoDB URI)

# Start the app
$ npm run start:dev
```

---

## 📌 Coming Soon

- WebSocket support for live ticket updates
- Email & Slack notifications
- Stripe Integration (org subscriptions)
- Admin Dashboard (Next.js frontend)

---

## 🤝 Contributions

Pull requests are welcome! Feel free to fork and submit improvements, bugfixes or ideas.

---

## 📄 License

MIT License

---

Let me know when you’d like the ticket-type input parser, RBAC decorators, or sample seeders added!

