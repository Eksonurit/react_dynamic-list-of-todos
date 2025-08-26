import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

import cn from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  isOpen: boolean;
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isOpen && todo) {
      setLoading(true);
      setUser(null);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      getUser(todo.userId).then(dataUser => {
        setUser(dataUser);
      });

      return () => clearTimeout(timer);
    }
  }, [isOpen, todo.userId]);

  return (
    isOpen && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo {todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => onClose()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': todo.completed === false,
                  })}
                >
                  Planned
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
