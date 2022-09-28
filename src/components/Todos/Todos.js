import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Todos.css';

export default function Todos() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to='/auth/sign-in' />;
  }

  return (
    <div>Todos</div>
  );
}
