import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import { UserContext } from '../../../services/context';


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
      <UserNavbar />
      <div >
        Feed Content
      </div>
    </>
  );
}

export default Feed;
