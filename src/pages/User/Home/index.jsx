// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import UserNavbar from '../../../components/UserNavbar';
// import styles from './index.module.css';

// function Home({ user }) { 
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     if (!user) {
//       navigate('/'); // Redirect to login if the user is not logged in
//     } else {
//       navigate('/home'); // Redirect to the home page if the user is logged in
//     }
//   }, [user, navigate]); 

//   return (
//     <>
//       {user && (
//         <>
//           <UserNavbar />
//           <div className={styles.centered}>
//             <h1>Welcome User Side!</h1>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Home;

import React, { useEffect } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import styles from './index.module.css';

function Home({ user }) { 


  return (
    <>
      <UserNavbar />
      <div className={styles.centered}>
        <h1>Welcome User Side!</h1>
      </div>
    </>
  );
}

export default Home;