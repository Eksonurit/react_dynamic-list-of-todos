import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { TodoModal } from '../TodoModal';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setIsOpen(false);
  };

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered"> </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': todo.completed === false,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleModalOpen(todo)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          isOpen={isOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
