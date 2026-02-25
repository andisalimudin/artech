# Artech - Company Technology Portal

Fullstack Web Portal for modern technology companies with project management, bookkeeping, and CMS.

## Tech Stack
- **Frontend**: Next.js 14, TailwindCSS, Recharts, Lucide Icons, Zustand, React Query.
- **Backend**: NestJS, Prisma ORM, JWT Auth, Swagger.
- **Database**: PostgreSQL.
- **Infrastructure**: Docker, Docker Compose.

## Folder Structure
- `/frontend`: Next.js web application.
- `/backend`: NestJS API service.
- `/docker`: Docker configuration (additional).
- `docker-compose.yml`: Root orchestration.

## Features
- **Landing Page**: Public SEO-friendly page.
- **Admin Dashboard**: Real-time overview of business metrics.
- **Project Management**: CRUD, status tracking, budget.
- **Financial Module**: Quotation & Invoice generation (Malaysia SST 6%), Bookkeeping (P&L, Balance Sheet).
- **CMS**: Admin panel to edit landing page sections.

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Quick Start
1. Clone the repository.
2. Run `docker-compose up --build`.
3. Backend will be available at `http://localhost:3000/api`.
4. Frontend will be available at `http://localhost:3001`.
5. Swagger documentation at `http://localhost:3000/api`.

### Initial Setup (Local)
1. Go to `backend`: `npm install && npx prisma migrate dev && npx prisma db seed`.
2. Go to `frontend`: `npm install && npm run dev`.

## Deployment Guide
1. Configure environment variables in `.env` files.
2. Ensure Docker and Docker Compose are installed on the server.
3. Use CI/CD pipeline (e.g., GitHub Actions) to build and push Docker images.
4. Deploy using `docker-compose up -d` on the production server.
5. Use Nginx or Traefik as a reverse proxy for SSL/TLS termination.

## Security
- JWT for authentication.
- Role-Based Access Control (RBAC).
- Password hashing with Bcrypt.
- CORS protection.
- Input validation with class-validator.
