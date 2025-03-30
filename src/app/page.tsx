import { TodoList } from "@/components/todo-list";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TodoList />
    </main>
  );
}
