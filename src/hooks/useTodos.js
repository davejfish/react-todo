import { useEffect } from 'react';
import { useState } from 'react';
import { fetchTodos } from '../services/todo';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);
        const response = await fetchTodos();
        setTodos(response);
        setLoading(false);
      }
      catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    getTodos();
  }, []);
  return { todos, setTodos, loading, error };
}