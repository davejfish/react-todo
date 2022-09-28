import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  
  let name;
  if (user) {
    [name] = user.email.split('@');
  } 

  const handleClick = (e) => {
    signOut();
    setUser(null);
  };

  return (
    <header>
      <span>todo list</span>
      {user && (
        <div>
          <span>Whats good {name}</span>
          <button onClick={(e) => handleClick(e)}>log out</button>
        </div>
      )}
    </header>
  );
}
