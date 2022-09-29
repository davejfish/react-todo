import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useTodos } from '../../hooks/useTodos';
import { createTodo, deleteTodo, updateTodo } from '../../services/todo';
import './Todos.css';

export default function Todos() {
  const { user } = useContext(UserContext);
  const { todos, setTodos, loading } = useTodos();

  if (!user) {
    return <Redirect to='/auth/sign-in' />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const desc = formData.get('description');
    
    const newTodo = await createTodo(desc);
    setTodos(prevState => [...newTodo, ...prevState]);

    e.target.reset();
  };

  const handleRemove = async (id) => {
    const deletedTodo = await deleteTodo(id);
    setTodos(prevState => prevState.filter(
      (prevTodo) => (prevTodo.id !== deletedTodo.id)
    ));
  };

  const handleUpdate = async (todo) => {
    let update = await updateTodo(todo);
    setTodos(prevState => prevState.map(
      (prevTodo) => (prevTodo.id === todo.id ? update : prevTodo)
    ));
  };

  return (
    <div className='container'>
      <h2>add a todo</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          description:
          <input name='description'></input>
        </label>
        <button>submit</button>
      </form>
      {loading ? <span className='loading'>loading...</span> : <></>}
      <ul className='todos'>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type='checkbox' checked={todo.complete} onChange={() => handleUpdate(todo)}/>
            <span>{todo.description}</span>
            {todo.complete ? 
              <button className='removeTodo' onClick={() => handleRemove(todo.id)}>
              x
              </button> : 
              <button className='opaque'>x</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
