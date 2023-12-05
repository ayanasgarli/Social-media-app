import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';

function Feed({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
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
