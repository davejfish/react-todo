import { useContext } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const response = await authUser(email, password, type);
    setUser(response);
    e.target.reset();
  };

  if (user) {
    return <Redirect to='/todos' />;
  }

  return (
    <div className='auth'>
      <ul>
        <li>
          <NavLink to='/auth/sign-in'>
            sign-in
          </NavLink>
        </li>
        <li>
          <NavLink to='/auth/sign-up'>
            sign-up
          </NavLink>
        </li>
      </ul>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          email: 
          <input name='email'></input>
        </label>
        <label>
          password: 
          <input type='password' name='password'></input>
        </label>
        <button>submit</button>
      </form>
    </div>
  );
}
