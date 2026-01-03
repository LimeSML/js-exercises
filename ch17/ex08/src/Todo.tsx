import { useRef, useState } from 'react';
import TodoItem from './TodoItem';

export interface Todo {
  id: string;
  status: 'active' | 'completed';
  text: string;
}

const Todo = () => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoInputRef.current == null) {
      return;
    }

    const newTodoText = todoInputRef.current.value.trim();
    if (newTodoText === '') {
      return;
    }
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), status: 'active', text: newTodoText },
    ]);
    todoInputRef.current.value = '';
  };

  const handleUpdateStatus = (id: string, status: 'active' | 'completed') => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: status } : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          ref={todoInputRef}
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </>
  );
};

export default Todo;
