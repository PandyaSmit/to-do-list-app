# To-Do List App

This project is a Next.js application designed to manage tasks with features like task creation, deletion, completion marking, and filtering.

## Live App
- https://to-do-list-app-smit.vercel.app

## Features
- Add new tasks with a title
- Mark tasks as completed or incomplete
- Delete tasks
- Filter tasks by status (All, Completed, Incomplete)
- RESTful API for task management

## Tech Stack
- **Next.js** for frontend framework
- **TypeScript** for type safety
- **Upstash Redis** for database
- **Vercel** for deployment

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PandyaSmit/to-do-list-app.git
   cd to-do-list-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```env
   UPSTASH_REDIS_REST_URL=<upstash_redis_rest_url>
   UPSTASH_REDIS_REST_TOKEN=<upstash_redis_rest_token>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
### **Todos**
- **GET /api/todos** — List all tasks with filters
- **POST /api/todos** — Add a new task
- **PATCH /api/todos** — Mark task as completed/incomplete
- **DELETE /api/todos** — Delete a task
