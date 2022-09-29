import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useTodos } from '../../hooks/useTodos';
import { createTodo } from '../../services/todo';
import './Todos.css';

export default function Todos() {
  const { user } = useContext(UserContext);
  const { todos, setTodos } = useTodos();

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

  const handleRemove = () => {
    console.log('remove this todo');
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
      <ul className='todos'>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type='checkbox'></input>
            <span>{todo.description}</span>
            {todo.completed ? 
              <button className='removeTodo' onClick={handleRemove}>
              x
              </button> : <></>}
          </li>
        ))}
      </ul>
    </div>
  );
}
