import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import { UserContext } from '../../../services/context';
import { Helmet } from "react-helmet";

function Feed() {
  const navigate = useNavigate(); 
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      console.log(user)
      navigate('/');
    }
    else{
      navigate('/feed');
    }
  }, [user, navigate]); 

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Feed</title>
        <link rel="icon" href="https://static.thenounproject.com/png/6342-200.png" />
      </Helmet>
      <UserNavbar />
      <div >
        Feed Content
      </div>
    </>
  );
}

export default Feed;
