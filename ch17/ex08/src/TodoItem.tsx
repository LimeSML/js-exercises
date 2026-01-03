import type { Todo } from './Todo';

type Props = {
  todo: Todo;
  onUpdateStatus: (id: string, status: 'active' | 'completed') => void;
  onDeleteTodo: (id: string) => void;
};

const TodoItem = ({ todo, onUpdateStatus, onDeleteTodo }: Props) => {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={todo.status === 'completed'}
          onChange={() =>
            onUpdateStatus(
              todo.id,
              todo.status === 'active' ? 'completed' : 'active'
            )
          }
        />
        <label
          style={
            todo.status === 'completed'
              ? { textDecoration: 'line-through' }
              : {}
          }
        >
          {todo.text}
        </label>
        <button onClick={() => onDeleteTodo(todo.id)}>❌</button>
      </div>
    </li>
  );
};

export default TodoItem;
