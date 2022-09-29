import { useEffect } from 'react';
import { useState } from 'react';
import { fetchTodos } from '../services/todo';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetchTodos();
        setTodos(response);
      }
      catch (e) {
        setError(e);
      }
    };
    getTodos();
  }, []);
  return { todos, setTodos, error };
}