# Architecture

## Stack

- **Postgres**
  - I believe the data chosen for this challenge is compatible with a relational model, making it an easier choice. Another reason for choosing it was the requirement to be fully developed in Docker. A DynamoDB setup, even with Localstack, would have been more complex to meet this requirement.
  
- **Node - v20.9.0**
  - **Pnpm**
    - Among package managers, Pnpm offers great performance due to its package reuse mechanism, which is particularly useful for local development and CI/CD pipelines.
  - **Fastify**
    - This is the framework I am most familiar with for building APIs. It is simple, yet powerful and efficient, meeting all the requirements for this challenge.
  - **Prisma**
    - A robust ORM that boosts both performance and productivity during development.
  - **AVL**
    - I chose to use a library that implements a balanced tree structure as it ensures productivity gains, similar to the other libraries used in the system. I believe there is no need to reinvent the wheel unless strictly necessary. The cost-benefit of saving time by using an existing solution outweighs the need to develop one from scratch.

- **Architecture**
  - **Packages**
    - I decided on this structure to allow for shared applications or components among different packages.
  - **Domain/UseCases**
    - The central focus of business rules. This enables us to test them in isolation, ensuring that changes in infrastructure (database, API gateway, etc.) do not impact the core logic. I believe this division helps us grow in an organized, adaptable, and scalable manner.
  - **Infra/Repositories/Controllers**
    - This includes the implementations of the services we use. These components are resources that enable the domain to function. If something changes here, it should not affect the domain, but if the domain changes, components here may be impacted.

---

## Test

These test commands must be executed in each package (e.g., `identity`, `pricing`).

### Steps to Run Tests:

1. **Install dependencies:**
```
pnpm install
```

2. **Generate Prisma files:**
```
pnpm prisma generate
```

3. **Run Unit Tests:**
Navigate into each package and execute the following command:
```
pnpm test
```
4. **Run End-to-End (E2E) Tests:**
Navigate into each package and execute the following command. Ensure the Postgres Docker container is running, as these tests rely on it:
```
pnpm test:e2e
```

5. **Run Coverage Tests:**
```
pnpm test:coverage
```