import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserNavbar from '../../../components/UserNavbar';
import styles from './index.module.css';
import { UserContext } from '../../../services/context';
import { Helmet } from "react-helmet";

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
    <Helmet>
        <meta charSet="utf-8" />
        <title>User Home</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/25/25694.png" />
      </Helmet>
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
