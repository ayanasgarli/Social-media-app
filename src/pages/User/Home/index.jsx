import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserNavbar from '../../../components/UserNavbar';
import styles from './index.module.css';
import { UserContext } from '../../../services/context';

function Home() { 
  const navigate = useNavigate(); 
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    else{
      navigate('/home');
    }
  }, [user, navigate]); 

  return (
    <>
      {user && (
        <>
          <UserNavbar />
          <div className={styles.centered}>
            <h1>Welcome User Side!</h1>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
