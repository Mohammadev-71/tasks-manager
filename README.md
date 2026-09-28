# Tasks Manager

A full-stack task management application built with Next.js and TypeScript. Organize tasks into lists, move them using drag and drop, track completion, and keep task-related discussions in one place.

The application supports Arabic and English, RTL and LTR layouts, and light and dark themes.

## Features

- **Authentication:** Email and password registration, sign-in, and sign-out with Better Auth.
- **Task Lists:** Create public or private lists to organize tasks.
- **Task Management:** Create, edit, and delete tasks, add descriptions, and track completion.
- **Drag and Drop:** Move tasks between lists and persist their destination in the database.
- **Comments:** Add comments to tasks and view their authors and timestamps.
- **Task Details:** View task information, creator details, and creation and update timestamps.
- **Internationalization:** Arabic and English interfaces with RTL and LTR support.
- **Theme Switching:** Light, dark, and system-based themes.
- **Responsive Layout:** Layouts that adapt to different screen sizes.
- **Form Validation:** Server-side validation for authentication and task/list creation using Zod.

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Better Auth |
| State Management | Zustand |
| Drag and Drop | DnD Kit |
| Validation | Zod |
| Internationalization | next-intl |
| Themes | next-themes |
| Icons | React Icons |

## Architecture

The application uses Next.js App Router and Server Actions to connect the interface to the database.

- React components handle the board, forms, and task details.
- Zustand manages client-side task and list state.
- Server Actions handle data retrieval and mutations.
- Prisma manages database queries and relationships.
- Better Auth manages authentication and sessions.
- next-intl provides locale-based routing and translations.

## Project Structure

| Directory | Purpose |
| --- | --- |
| `app/[locale]/` | Localized pages and layouts |
| `app/[locale]/components/` | UI components |
| `app/[locale]/Store/` | Zustand stores |
| `app/[locale]/types/` | TypeScript data types |
| `app/actions/` | Server-side actions and data operations |
| `app/api/` | Authentication HTTP handler |
| `lib/` | Authentication and database configuration |
| `lib/utils/` | Validation schemas |
| `i18n/` | Locale routing and configuration |
| `messages/` | Arabic and English translations |
| `prisma/` | Database schema |

## Getting Started

### Prerequisites

- Node.js and npm compatible with the project dependencies.
- A running PostgreSQL instance.
- A dedicated development database.

### 1. Clone the repository

```bash
git clone https://github.com/Mohammadev-71/tasks-manager.git
cd tasks-manager
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tasks_manager"
BETTER_AUTH_SECRET="YOUR_RANDOM_SECRET"
BETTER_AUTH_URL="http://localhost:3000"
```

Replace the database credentials with your own values. Generate a random authentication secret with:

```bash
openssl rand -base64 32
```

Do not commit your `.env` file.

### 4. Set up the development database

The repository uses `prisma7.config.ts` as its Prisma configuration file.

```bash
npx prisma db push --config ./prisma7.config.ts
npx prisma generate --config ./prisma7.config.ts
```

These commands initialize a development database and generate the Prisma client. Use a migration workflow when managing production databases.

### 5. Start the development server

```bash
npm run dev
```

Open:

- English: http://localhost:3000/en
- Arabic: http://localhost:3000/ar

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate Prisma Client and build the application |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## Future Improvements

- Automated tests for task workflows and access permissions.
- Improved error feedback and recovery for failed updates.
- Search and filtering.
- Due dates and task priorities.
- Real-time synchronization between users.

## Author

Developed by [Mohammadev-71](https://github.com/Mohammadev-71).
