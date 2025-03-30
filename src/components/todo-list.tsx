"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DeleteButton } from "@/components/ui/delete-button";
import { FilterComponent } from "./ui/filter-component";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTask = async () => {
        if (!newTask.trim()) return;

        await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTask, completed: false })
        });

        await fetchTodos();
        setNewTask("");
    };

    const fetchTodos = async (filter: string = "") => {
        try {
            const query = new URLSearchParams({ filter, }).toString();
            const response = await fetch(`/api/todos?${query}`);
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleFilterChange = (filter: string) => {
        fetchTodos(filter);
    };

    const toggleComplete = async (id: number, completed: boolean) => {
        await fetch("/api/todos", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, completed })
        });
        await fetchTodos();
    };

    const deleteTask = async (id: number) => {
        await fetch(`/api/todos`, {
            method: "DELETE",
            body: JSON.stringify({ id })
        });
        await fetchTodos();
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <Button onClick={addTask}>Add Task</Button>
            </div>
            <FilterComponent onFilterChange={handleFilterChange} />
            {todos.map((todo) => (
                <Card key={todo.id} className="flex justify-between items-center p-4">
                    <CardContent>
                        <span className={todo.completed ? "line-through text-gray-500" : ""}>
                            {todo.title}
                        </span>
                    </CardContent>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={todo.completed ? "destructive" : "success"}
                            onClick={() => toggleComplete(todo.id, !todo.completed)}
                        >
                            {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                        </Button>
                        <DeleteButton onDelete={() => deleteTask(todo.id)} />
                    </div>
                </Card>
            ))}
        </div>
    );
}
